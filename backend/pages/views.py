from rest_framework import viewsets

from . import models
from . import serializers


class HomePageViewSet(viewsets.ModelViewSet):
    queryset = models.HomePage.objects.all()
    serializer_class = serializers.HomePageSerializer


class OfferPageViewSet(viewsets.ModelViewSet):
    queryset = models.OfferPage.objects.all()
    serializer_class = serializers.OfferPageSerializer


class ContactPageViewSet(viewsets.ModelViewSet):
    queryset = models.ContactPage.objects.all()
    serializer_class = serializers.ContactPageSerializer


class ContentPageViewSet(viewsets.ModelViewSet):
    queryset = models.ContentPage.objects.all()
    serializer_class = serializers.ContentPageSerializer
