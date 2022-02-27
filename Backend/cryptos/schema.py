import graphene
from graphene_django import DjangoConnectionField, DjangoListField, DjangoObjectType
from .models import Token
from users.models import ExtendUser
import yfinance as yf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import collections
import itertools as it
from collections import namedtuple
class TokenType(DjangoObjectType):
    class Meta:
        model= Token
        exclude = ('id',)
class TokenTyp(DjangoObjectType):
    class Meta:
        model= Token
        fields="__all__"
   
    
class CreateToken(graphene.Mutation):
  # Let's define the arguments we can pass the create method 👍 
    class Arguments:
        name = graphene.String()
        user_id = graphene.Int()

  # What it returns 💸
    token = graphene.String()
   

  # Where you really do all the mutation 🦁 🐉
    def mutate(self, info, user_id,name):
        userid = ExtendUser.objects.get(pk=user_id)
        # if Token.objects.get(name=name):
        #     return None
        _token = Token.objects.create(
        name = name,
        user = userid,
        )
        return CreateToken(token=_token)
    
def strategy(df,sma1, sma2):
#     creating copy of pulled data frame because I dont want to manipulate original df
        df=df.copy()
#     using log return because they are time additive (can add returns instead of multiply) and symmetrical makes manipulation a lot easier between changes in prices across different time periods
#     pct_change is the current day price subtracted from the previous day and add 1 to it to make log function work
        df['ret'] = np.log(df.Close.pct_change() + 1)
#     calcultion of short term sma using the parameter inputed by user
        df['SMA1'] = df.Close.rolling(sma1).mean()
#     calcultion of long term sma using the parameter inputed by user
        df['SMA2'] = df.Close.rolling(sma2).mean()
#     dropping all na values from dataframe
        df = df.dropna()
#     find out if we are in a position or not by using conditional check to see if short-term sma is above long-term sma, 1 for yes and 0 for no
        df['position']=np.where(df['SMA1'] > df['SMA2'],1,0)
#     stratret calculated by multiplying the position column with the return column becaus when condition is fulfilled we are holding the asset in a position and getting 1*return of asset
#     ALSO!! we shift the column position by one row to because we can only enter position the day after the sma crossover occurs
        df['stratret']= df['position'].shift(1) * df['ret']
#     we drop na values again
        df= df.dropna()
        return df
    
def performance (df):
#     we sum up our retruns (thanks to time additive principal of lgog returns) using the exponential function because both the returns of asset and our strategy are log, so I use the counteract function to get the "Real Returns"
        return np.exp(df[['ret', 'stratret']].sum())
    
def Tester(user_input,df):
#     creating empty profits list
        profits = []
    #     storing short sma to a, storing long sma to b
        a,b = [],[]
    #     N is the max sma length to compute non repeated combinations of smas
        N= user_input
    #     creating all possible sma combinations given user max length constraint
        SMA_Combo= list(it.combinations(range(1, N), 2))
    #     for every value of sma1 (i) and sma2 (e)
        for sma1,sma2 in (SMA_Combo):
    #         calling our performance function providing our sma strategy,our df, short sma, long sma.
            profit = performance(strategy(df,sma1,sma2))
    #     appending profit to our empty profits list
            profits.append(profit)
    #     appending sma1 to our empty profits list
            a.append(sma1)
    #     appending sma2 to our empty profits list
            b.append(sma2)
    #     beautifying frame by renaming columns to smas
        col= {'level_0':'SMA1', 'level_1':'SMA2'}
    #     creating data frame from profits, sma lengths, and reseting the index.
        frame = pd.DataFrame(profits, [a,b]).reset_index().rename(columns=col)
    #     creating edge column so we know our "alpha"
        frame['edge']=frame.stratret - frame.ret
    #     returning the frame to the user
        return frame.sort_values('edge', ascending=False)

obj = namedtuple("strat", ["sma1", "sma2","ret","stratret", "edge"])

class strat(graphene.ObjectType):
    sma1= graphene.Int()
    sma2=graphene.Int()
    ret = graphene.Float()
    stratret=graphene.Float()
    edge = graphene.Float()

class ObjectField(graphene.Scalar):

    @staticmethod
    def serialize(dt):
        return dt

    @staticmethod
    def parse_literal(node):
        return node.value

    @staticmethod
    def parse_value(value):
        return value
    
class ChartSMA(graphene.Mutation):
    class Arguments:
        ticker = graphene.String()
        date = graphene.String()
        sma1= graphene.Int()
        sma2= graphene.Int()
    
    res = graphene.Field(ObjectField)
    
    def mutate(self, info, ticker,date,sma1, sma2):
        # if ticker=='ICP-USD':
        #     return ticker == "ISP-USD"
        df = yf.download(ticker, start=date)
        data=strategy(df, sma1, sma2)
        a=[]
        for row in data.itertuples(index=True, name='returns'):
             x=dict(date=row[0].strftime('%Y-%m-%d'), close=row[5], volume=row[6], sma1= row[8],
             sma2=row[9], position=row[10],
             ret="{:,.2%}".format(row[7]),
             stratret="{:,.2%}".format(row[11]))
             a.append(x)
        return ChartSMA(res=a)
class SMAC(graphene.Mutation):
  # Let's define the arguments we can pass the create method 👍 
    class Arguments:
        ticker = graphene.String()
        date = graphene.String()
        length= graphene.Int()
  # What it returns 💸
    
    res = graphene.Field(ObjectField)
    
   
  # Where you really do all the mutation 🦁 🐉
    def mutate(self, info, ticker,date,length):
        df = yf.download(ticker, start=date)
        data=Tester(length,df)
        # a=data.to_dict(orient="records")
        a=[]
        for row in data.itertuples(index=True, name='smac'):
             x=dict(sma1= row.SMA1,
             sma2=row.SMA2,
             ret="{:,.2%}".format(row.ret),
             stratret="{:,.2%}".format(row.stratret),
             edge="{:,.2%}".format(row.edge))
             a.append(x)
        return SMAC(res=a)

class DeleteToken(graphene.Mutation):
    ok = graphene.Boolean()
    
    class Arguments:
        id = graphene.Int()
    
    def mutate(self, info, id):
        token = Token.objects.get(pk=id)
        token.delete()
        return DeleteToken(ok=True)
        
class TokenMutations(graphene.ObjectType):
    create_token=  CreateToken.Field()
    sma_optimizer=SMAC.Field()
    delete_token = DeleteToken.Field()
    sma_visual= ChartSMA.Field()
    
    
class Query(graphene.ObjectType):
    all_tokens = graphene.List(TokenTyp)
    
    def resolve_all_tokens(self, info):
        # user = info.context.user
        # if not user.is_authenticated:
        #     raise Exception("Authentication credentials were not provided")
        return Token.objects.all()
    