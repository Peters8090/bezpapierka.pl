from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.parsers import JSONParser

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


@csrf_exempt
def contact_form(request):
    try:
        data = JSONParser().parse(request)
        send_mail(data['title'], data['message'], data['email'], [''])
        return HttpResponse('Success')
    except BadHeaderError:
        return HttpResponse('Invalid header found.')
    except KeyError:
        return HttpResponseBadRequest()
    except:
        return HttpResponseServerError()
