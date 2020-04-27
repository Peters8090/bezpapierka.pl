from django.core.mail import send_mail, BadHeaderError
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseServerError
from django.views.decorators.csrf import ensure_csrf_cookie
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


@ensure_csrf_cookie
def contact_form(request):
    try:
        data = JSONParser().parse(request)
        contact_page = models.ContactPage.objects.get(pk=int(data['contactPage']))
        subject = data['title']
        message = data['message']
        from_mail = data['email']
        send_mail(f'[{from_mail}] {subject}', message, from_mail, [contact_page.contact_form_email])
        return HttpResponse('Success')
    except BadHeaderError:
        return HttpResponse('Invalid header found.')
    except KeyError:
        return HttpResponseBadRequest()
    except:
        return HttpResponseServerError()
