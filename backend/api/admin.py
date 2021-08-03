from django.contrib import admin
from api.models import User, Salary


class Users(admin.ModelAdmin):
    list_display = ('id', 'cpf', 'name', 'birthday')
    list_display_links = ('id', 'cpf', 'name')
    search_fields = ('cpf', 'name')
    list_per_page = 200
    ordering = ('name', )


admin.site.register(User, Users)


class Salaries(admin.ModelAdmin):
    list_display = ('id', 'date', 'cpf', 'salary', 'discounts')
    search_fields = ('cpf', 'date')
    list_per_page = 200


admin.site.register(Salary, Salaries)
