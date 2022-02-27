#!/usr/bin/env python
# coding: utf-8

# In[32]:


import yfinance as yf
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import collections
import itertools as it


# In[86]:


def ticker (ticker, date):
    df = yf.download(ticker, start=date)
    return df
ticker('BTC-USD', '2021-01-01')


# takes the df which is our yf download, short term moving avg and long term moving avg

# In[96]:


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
    


# In[97]:


# compares the performance of the asset itself to our strategy
def performance (df):
#     we sum up our retruns (thanks to time additive principal of lgog returns) using the exponential function because both the returns of asset and our strategy are log, so I use the counteract function to get the "Real Returns"
    return np.exp(df[['ret', 'stratret']].sum())


# In[98]:


stratdf = strategy(df, 12,21)


# In[102]:


fig, ax = plt.subplots(figsize=(30,10))
ax2=ax.twinx()
ax.plot(stratdf[['Close', 'SMA1', 'SMA2']])
ax2.plot(stratdf['position'], color='k')


# In[ ]:





# In[105]:


def Tester(user_input):
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


# In[107]:


Tester(10)


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




