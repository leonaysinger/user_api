from rest_framework import serializers

from api.models import User, Salary
from api.validators import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        ordering = ['-id']

    def validate(self, data):
        if not cpf_valid(data['cpf']):
            raise serializers.ValidationError({"Invalid CPF"})
        if not name_valid(data['name']):
            raise serializers.ValidationError({"Name must contain only letters"})
        if not date_valid(data['birthday'], correct_date_format="%Y-%m-d"):
            raise serializers.ValidationError(
                {"Date must be a string with the following format: YYYY-mm-dd"}
            )
        return data


class SalarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Salary
        fields = '__all__'

    def validate(self, data):
        if not discount_valid(data['discounts']):
            raise serializers.ValidationError({'discounts': "Discounts must be numbers separated by ;"})
        if not date_valid(data['date'], correct_date_format="%Y-%m-d"):
            raise serializers.ValidationError(
                {"Date must be a string with the following format: YYYY-mm-dd"}
            )
        return data
