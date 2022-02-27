from django.db import models
from core.settings import AUTH_USER_MODEL
# Create your models here.

class Token(models.Model):
    name = models.CharField(max_length=100)
    # If user selects token, if they delete themselves, they will delete any tokens they selected
    user = models.ForeignKey(
        AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    

    
    objects = models.Manager() #default manager
    
    class Meta:
        ordering = ('-name',)
        
    def __str__(self):
        return (self.name)