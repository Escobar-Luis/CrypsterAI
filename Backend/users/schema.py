import graphene
from graphene_django import DjangoObjectType
import graphql_jwt
from graphql_auth import mutations
from graphql_auth.schema import UserQuery, MeQuery
from cryptos.schema import Query as token_query
from cryptos.schema import TokenMutations
from graphql_auth.models import models
class AuthMutation(graphene.ObjectType):
   register = mutations.Register.Field()
#    verify_account = mutations.VerifyAccount.Field()
   token_auth = mutations.ObtainJSONWebToken.Field()
#    refresh_token = graphql_jwt.Refresh.Field()
#    update_account = mutations.UpdateAccount.Field()
#    resend_activation_email = mutations.ResendActivationEmail.Field()
#    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
#    password_reset = mutations.PasswordReset.Field()
#    password_change = mutations.PasswordChange.Field()


class Query(token_query, UserQuery, MeQuery, graphene.ObjectType):
    pass

class Mutation(TokenMutations, AuthMutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)