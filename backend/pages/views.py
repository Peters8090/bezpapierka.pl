import json
import re

from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.parsers import JSONParser
from django.utils.translation import gettext

from . import models
from . import serializers


class ConfigurationViewSet(viewsets.ModelViewSet):
    queryset = models.Configuration.objects.all()
    serializer_class = serializers.ConfigurationSerializer


class PageViewSetMixin:
    def get_queryset(self):
        if self.request.user.is_superuser:
            return super().get_queryset()
        else:
            return super().get_queryset().filter(published=True)


class HomePageViewSet(PageViewSetMixin, viewsets.ModelViewSet):
    queryset = models.HomePage.objects.all()
    serializer_class = serializers.HomePageSerializer


class OfferPageViewSet(PageViewSetMixin, viewsets.ModelViewSet):
    queryset = models.OfferPage.objects.all()
    serializer_class = serializers.OfferPageSerializer


class ContactPageViewSet(PageViewSetMixin, viewsets.ModelViewSet):
    queryset = models.ContactPage.objects.all()
    serializer_class = serializers.ContactPageSerializer


class ContentPageViewSet(PageViewSetMixin, viewsets.ModelViewSet):
    queryset = models.ContentPage.objects.all()
    serializer_class = serializers.ContentPageSerializer


@csrf_exempt
def contact_form(request):
    try:
        data = JSONParser().parse(request)

        contact_page = models.ContactPage.objects.get(pk=int(data['contactPage']))

        errorBody = {}
        for element in data:
            if element == 'email':
                email_regex = '[^@]+@[^\.]+\..+'
                if not re.match(email_regex, data[element]):
                    errorBody[element] = [gettext('Enter a valid email address.')]
            if data[element] == '':
                errorBody[element] = [gettext('This field is required.')]
        if len(errorBody.keys()) > 0:
            raise ValueError(errorBody)

        subject = data['title']
        message = data['message']
        from_mail = data['email']

        send_mail(f'[{from_mail}] {subject}', message, from_mail, [contact_page.contact_form_email])
        return HttpResponse('Success')
    except KeyError:
        return HttpResponseBadRequest()
    except ValueError as error:
        if len(error.args) > 0 and isinstance(error.args[0], dict):
            return HttpResponseBadRequest(json.dumps(error.args[0]), content_type='application/json')