import django
import os
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.settings')
django.setup()

from faker import Faker
from api.models import User, Salary
from validate_docbr import CPF

fake = Faker('pt_BR')
quantity = 50


def create_user(total):

    Faker.seed(10)
    for _ in range(total):
        cpf_instance = CPF()
        cpf = cpf_instance.generate()
        name = fake.name()
        birthday = fake.date(pattern='%Y-%m-%d')
        user = User(cpf=cpf, name=name, birthday=birthday)
        user.save()


def create_salaries(user):
    random_salary = round(random.uniform(1120, 10000), 2)
    discounts = '{}; {}; {};'.format(
        round(random.uniform(0, 500), 2),
        round(random.uniform(0, 500), 2),
        round(random.uniform(0, 500), 2),
    )
    fake_date = fake.date()
    salary = Salary(cpf=user, salary=random_salary, discounts=discounts, date=fake_date)
    salary.save()


def iterate_users():
    users = User.objects.all()
    for user in users.iterator():
        create_salaries(user)


def create_more_salaries():
    users = User.objects.all()[:10]
    for user in users.iterator():
        create_salaries(user)


create_user(quantity)
iterate_users()
create_more_salaries()
