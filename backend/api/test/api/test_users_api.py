from api.models import User
from api.serializers import UserSerializer
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase


class UsersTestCase(APITestCase):
    def setUp(self):
        self.list_url = reverse('Users-list')
        self.user_1 = User.objects.create(cpf='02189306078',
                                          name='Leo',
                                          birthday='1990-10-18')
        self.serializer = UserSerializer(instance=self.user_1)

    def test_list_users_should_returned_200(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_user_should_return_201(self):
        data = {
            'cpf': '05824744009',
            'name': 'Juarez',
            'birthday': '2020-10-18',
        }
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

    def test_post_user_with_wrong_birthday_should_return_422(self):
        data = {
            'cpf': '05824744009',
            'name': 'Juarez',
            'birthday': '2020-18-10',
        }
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_post_user_with_existed_cpf_should_return_422(self):
        data = {
            'cpf': '05824744009',
            'name': 'Juarez',
            'birthday': '2020-10-18',
        }
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_201_CREATED)

        data = {
            'cpf': '05824744009',
            'name': 'Silva',
            'birthday': '2020-10-18',
        }
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_post_user_with_wrong_name_should_return_422(self):
        data = {
            'cpf': '05824744009',
            'name': 'Juca2',
            'birthday': '2020-10-18',
        }
        response = self.client.post(self.list_url, data=data)
        self.assertEquals(response.status_code, status.HTTP_422_UNPROCESSABLE_ENTITY)

    def test_delete_user_should_return_204(self):
        response = self.client.delete('/users/1/')
        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
