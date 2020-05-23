from drf_writable_nested.mixins import UniqueFieldsMixin
from rest_framework import serializers

from . import models
from .utility import WritableNestedMixins, Base64ImageField2


# region Pages Configuration

class ConfigurationSerializer(serializers.ModelSerializer):
    logo = Base64ImageField2(required=False, allow_null=True)
    default_background_image = Base64ImageField2(required=False, allow_null=True)

    class Meta:
        model = models.Configuration
        exclude = []


# endregion


# region Pages

class PageSerializerMixin(serializers.ModelSerializer):
    background_image = Base64ImageField2(required=False, allow_null=True)


# region HomePage
class HomePageSerializer(PageSerializerMixin):
    class Meta:
        model = models.HomePage
        exclude = []


# endregion

# region OfferPage

class StepSerializer(UniqueFieldsMixin,
                     serializers.ModelSerializer):
    class Meta:
        model = models.Step
        exclude = ['offer']


class SectionSerializer(UniqueFieldsMixin,
                        serializers.ModelSerializer):
    class Meta:
        model = models.Section
        exclude = ['offer']


class OfferSerializer(UniqueFieldsMixin,
                      WritableNestedMixins,
                      serializers.ModelSerializer):
    steps = StepSerializer(many=True, required=False)
    sections = SectionSerializer(many=True, required=False)

    image = Base64ImageField2()

    class Meta:
        model = models.Offer
        exclude = ['offer_page']


class OfferPageSerializer(WritableNestedMixins, PageSerializerMixin):
    offers = OfferSerializer(many=True, required=False)

    class Meta:
        model = models.OfferPage
        exclude = []


# endregion

# region ContactPage
class BasicInfoSerializer(UniqueFieldsMixin, serializers.ModelSerializer):
    class Meta:
        model = models.BasicInfo
        exclude = ['contact_page']


class ContactPageSerializer(WritableNestedMixins, PageSerializerMixin):
    basic_infos = BasicInfoSerializer(many=True, required=False)

    class Meta:
        model = models.ContactPage
        exclude = []


# endregion


# region ContentPage
class ContentPageSerializer(PageSerializerMixin):
    image = Base64ImageField2(required=False, allow_null=True)

    class Meta:
        model = models.ContentPage
        exclude = []
# endregion

# endregion
