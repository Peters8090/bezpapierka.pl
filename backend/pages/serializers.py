from rest_framework import serializers
from . import models


class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HomePage
        fields = '__all__'
