from api.models import User, Salary
from api.serializers import UserSerializer
from api.test.common import create_valid_discounts
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class UserSalariesTestCase(APITestCase):
    def setUp(self):
        self.list_url = reverse('Salaries-list')
        self.user_1 = User.objects.create(cpf='02189306078',
                                          name='Leo',
                                          birthday='1990-10-18')
        self.serializer = UserSerializer(instance=self.user_1)
        self.salary_1 = Salary.objects.create(cpf=self.user_1,
                                          salary=4500,
                                          date='2021-05-05',
                                          discounts=create_valid_discounts())

    def test_list_salaries_should_returned_200(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data.get('count'), 1)

    def test_post_salary_should_return_201(self):
        data = {
            'cpf': '02189306078',
            'salary': 1550,
            'date': '2020-10-18',
            'discounts': create_valid_discounts()
        }
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_post_with_wrong_discounts_should_return_422(self):
        data = {
            'cpf': '02189306078',
            'salary': 1550,
            'date': '2020-10-18',
            'discounts': 'ABC'
        }
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_delete_salary_should_return_204(self):
        response = self.client.delete('/salaries/1/')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
