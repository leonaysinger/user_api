from api.views import UsersViewSet, SalariesViewSet, discount_mean_list, salary_mean_list, highest_salary, lowest_salary
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view


router = routers.DefaultRouter()
router.register('users', UsersViewSet, basename='Users')
router.register('salaries', SalariesViewSet, basename='Salaries')
schema_view = get_swagger_view(title='Doc API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('user/<str:cpf>/salaries/', salary_mean_list),
    path('user/<str:cpf>/maxsalary', highest_salary),
    path('user/<str:cpf>/minsalary', lowest_salary),
    path('user/<str:cpf>/discount', discount_mean_list),
    path('docs/', schema_view)
]
