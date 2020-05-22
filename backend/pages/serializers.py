from drf_extra_fields.fields import Base64ImageField
from drf_writable_nested import \
    mixins as writable_nested_mixins, \
    serializers as writable_nested_serializers
from rest_framework import serializers

from . import models
from .utility import SerializerWithImageFieldMixin


# region Pages Configuration

class ConfigurationSerializer(SerializerWithImageFieldMixin, serializers.ModelSerializer):
    logo = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = models.Configuration
        exclude = []


# endregion


# region Pages

class PageSerializerMixin(SerializerWithImageFieldMixin):
    background_image = Base64ImageField(required=False, allow_null=True)


# region HomePage
class HomePageSerializer(PageSerializerMixin, serializers.ModelSerializer):
    class Meta:
        model = models.HomePage
        exclude = []


# endregion

# region OfferPage

class StepSerializer(writable_nested_mixins.UniqueFieldsMixin,
                     serializers.ModelSerializer):
    class Meta:
        model = models.Step
        exclude = ['offer']


class SectionSerializer(writable_nested_mixins.UniqueFieldsMixin,
                        serializers.ModelSerializer):
    class Meta:
        model = models.Section
        exclude = ['offer']


class OfferSerializer(SerializerWithImageFieldMixin, writable_nested_mixins.UniqueFieldsMixin,
                      writable_nested_serializers.WritableNestedModelSerializer):
    steps = StepSerializer(many=True, required=False)
    sections = SectionSerializer(many=True, required=False)

    image = Base64ImageField()

    class Meta:
        model = models.Offer
        exclude = ['offer_page']


class OfferPageSerializer(PageSerializerMixin, writable_nested_serializers.WritableNestedModelSerializer):
    offers = OfferSerializer(many=True, required=False)

    class Meta:
        model = models.OfferPage
        exclude = []


# endregion

# region ContactPage
class BasicInfoSerializer(writable_nested_mixins.UniqueFieldsMixin,
                          writable_nested_serializers.WritableNestedModelSerializer):
    class Meta:
        model = models.BasicInfo
        exclude = ['contact_page']


class ContactPageSerializer(PageSerializerMixin, writable_nested_serializers.WritableNestedModelSerializer):
    basic_infos = BasicInfoSerializer(many=True, required=False)

    class Meta:
        model = models.ContactPage
        exclude = []


# endregion


# region ContentPage
class ContentPageSerializer(PageSerializerMixin, serializers.ModelSerializer):
    image = Base64ImageField(required=False, allow_null=True)

    class Meta:
        model = models.ContentPage
        exclude = []
# endregion

# endregion
