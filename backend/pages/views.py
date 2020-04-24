from rest_framework import viewsets, permissions

from . import models
from . import serializers


class HomePageViewSet(viewsets.ModelViewSet):
    queryset = models.HomePage.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = serializers.HomePageSerializer
