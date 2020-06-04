from django.utils import translation
from django.utils.deprecation import MiddlewareMixin
from pages.models import Configuration


class LocaleMiddleware(MiddlewareMixin):
    def process_request(self, request):
        language = Configuration.objects.first().language
        translation.activate(language)
        request.LANGUAGE_CODE = translation.get_language()

    def process_response(self, _, response):
        translation.deactivate()
        return response
