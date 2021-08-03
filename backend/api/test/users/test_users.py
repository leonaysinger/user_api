from api.models import User
from api.serializers import UserSerializer
from django.core.exceptions import ValidationError
from django.urls import reverse
from rest_framework.test import APITestCase
from testfixtures import should_raise


class UsersTestCase(APITestCase):
    def setUp(self):
        self.list_url = reverse('Users-list')
        self.user_1 = User.objects.create(cpf='02189306078',
                                          name='Leo',
                                          birthday='1990-10-18')
        self.serializer = UserSerializer(instance=self.user_1)

    def test_attributes_of_users_should_work(self):
        self.assertEqual(self.user_1.cpf, '02189306078')
        self.assertEqual(self.user_1.name, 'Leo')
        self.assertEqual(self.user_1.birthday, '1990-10-18')

    def test_serializer_should_be_ok(self):
        data = self.serializer.data
        attribute_in_serializer = ['id', 'cpf', 'name', 'birthday']
        self.assertEqual(set(data.keys()), set(attribute_in_serializer))

    def test_serializer_with_wrong_cpf_should_return_false(self):
        user_test = User.objects.create(cpf='11111111111',
                                        name='alberto',
                                        birthday='1990-10-18')
        serializer = UserSerializer(data=user_test)
        self.assertEqual(serializer.is_valid(), False)

    def test_serializer_with_wrong_name_should_return_false(self):
        user_test = User.objects.create(cpf='95707822003',
                                        name='alberto111',
                                        birthday='1990-10-18')
        serializer = UserSerializer(data=user_test)
        self.assertEqual(serializer.is_valid(), False)

    @should_raise(ValidationError)
    def test_birthday_with_wrong_date_format_should_raise_exception(self):
        user_test = User.objects.create(cpf='95707822003',
                                        name='alberto',
                                        birthday='10-18-1990')
        UserSerializer(data=user_test)

    @should_raise(ValidationError)
    def test_birthday_with_wrong_date_should_raise_exception(self):
        user_test = User.objects.create(cpf='95707822003',
                                        name='alberto',
                                        birthday='1990-25-25')
        UserSerializer(data=user_test)
