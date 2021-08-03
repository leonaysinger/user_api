import statistics

from api.models import User, Salary
from api.common import save_and_create_location_header
from rest_framework import viewsets, filters
from django.http import HttpResponse, JsonResponse
from api.serializers import UserSerializer, SalarySerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Avg, Max, Min


class UsersViewSet(viewsets.ModelViewSet):
    """ Display all users """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = ['name']
    search_fields = ['name', 'cpf']

    def create(self, request):
        return save_and_create_location_header(request=request, serializer_class=self.serializer_class)


class SalariesViewSet(viewsets.ModelViewSet):
    """ Display all salaries """
    queryset = Salary.objects.all()
    serializer_class = SalarySerializer

    def create(self, request):
        return save_and_create_location_header(request=request, serializer_class=self.serializer_class)


def salary_mean_list(request, cpf):
    """ Display salary mean by user"""
    if request.method == 'GET':
        data = Salary.objects.filter(cpf=cpf).aggregate(Avg('salary'))
        return JsonResponse(data)
    else:
        HttpResponse(status=404)


def highest_salary(request, cpf):
    """ Display user highest salary"""
    if request.method == 'GET':
        data = Salary.objects.filter(cpf=cpf).aggregate(Max('salary'))
        return JsonResponse(data)
    else:
        HttpResponse(status=404)


def lowest_salary(request, cpf):
    """ Display user lowest salary"""
    if request.method == 'GET':
        data = Salary.objects.filter(cpf=cpf).aggregate(Min('salary'))
        return JsonResponse(data)
    else:
        HttpResponse(status=404)


def discount_mean_list(request, cpf):
    """ Display discounts mean"""
    if request.method == 'GET':
        all_discounts = []
        salaries = Salary.objects.filter(cpf=cpf)
        for salary in salaries:
            discounts = salary.discounts.split(';')
            clean_discounts = list(filter(None, discounts))
            [all_discounts.append(float(salary)) for salary in clean_discounts]
        mean = round(statistics.mean(all_discounts), 2)
        return JsonResponse(mean, status=200, safe=False)
    else:
        HttpResponse(status=404)
