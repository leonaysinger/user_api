from django.db import models


class User(models.Model):
    class Meta:
        ordering = ['id']

    cpf = models.CharField(max_length=11, unique=True)
    name = models.CharField(max_length=100)
    birthday = models.DateField()


class Salary(models.Model):
    class Meta:
        ordering = ['id']

    cpf = models.ForeignKey(User, to_field='cpf', db_column='cpf', on_delete=models.CASCADE)
    salary = models.FloatField()
    discounts = models.TextField()
    date = models.DateField()

