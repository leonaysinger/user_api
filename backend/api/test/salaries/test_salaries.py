from api.models import User, Salary
from api.serializers import SalarySerializer
from api.test.common import *
from django.urls import reverse
from rest_framework.test import APITestCase


class SalariesTestCase(APITestCase):
    def setUp(self):
        self.list_url = reverse('Users-list')
        self.user_1 = User.objects.create(cpf='02189306078',
                                          name='Leo',
                                          birthday='1990-10-18')
        self.salary_1 = Salary.objects.create(cpf=self.user_1,
                                              salary=4500,
                                              date='2021-05-05',
                                              discounts='1050;2000')
        self.serializer = SalarySerializer(instance=self.salary_1)

    def test_attributes_of_salary(self):
        self.assertEqual(self.salary_1.cpf.cpf, '02189306078')
        self.assertEqual(self.salary_1.salary, 4500)
        self.assertEqual(self.salary_1.date, '2021-05-05')
        self.assertEqual(self.salary_1.discounts, '1050;2000')

    def test_valid_data_should_return_true(self):
        data = valid_data()
        serializer = SalarySerializer(data=data)
        serializer.is_valid()
        self.assertEqual(serializer.is_valid(), True)

    def test_discounts_with_letter_should_return_false(self):
        data = invalid_data_with_letter()
        serializer = SalarySerializer(data=data)
        self.assertEqual(serializer.is_valid(), False)

    def test_discounts_with_special_character_should_return_false(self):
        data = invalid_data_with_special_character()
        serializer = SalarySerializer(data=data)
        self.assertEqual(serializer.is_valid(), False)
