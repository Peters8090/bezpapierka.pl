from rest_framework import viewsets

from . import models
from . import serializers


class HomePageViewSet(viewsets.ModelViewSet):
    queryset = models.HomePage.objects.all()
    serializer_class = serializers.HomePageSerializer
