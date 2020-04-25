from drf_writable_nested import \
    mixins as writable_nested_mixins, \
    serializers as writable_nested_serializers
from rest_framework import serializers

from . import models
from .utility import SerializerWithImageFieldMixin


# region HomePage
class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HomePage
        exclude = []


# endregion

# region OfferPage

class StepSerializer(writable_nested_mixins.UniqueFieldsMixin,
                     serializers.ModelSerializer):
    class Meta:
        model = models.Step
        exclude = []


class SectionSerializer(writable_nested_mixins.UniqueFieldsMixin,
                        serializers.ModelSerializer):
    class Meta:
        model = models.Section
        exclude = []


class OfferSerializer(SerializerWithImageFieldMixin, writable_nested_mixins.UniqueFieldsMixin,
                      writable_nested_serializers.WritableNestedModelSerializer):
    steps = StepSerializer(many=True)
    sections = SectionSerializer(many=True)

    class Meta:
        model = models.Offer
        exclude = []


class OfferPageSerializer(writable_nested_serializers.WritableNestedModelSerializer):
    offers = OfferSerializer(many=True)

    class Meta:
        model = models.OfferPage
        exclude = []


# endregion

# region ContactPage
class BasicInfoSerializer(writable_nested_mixins.UniqueFieldsMixin,
                          serializers.ModelSerializer):
    class Meta:
        model = models.BasicInfo
        exclude = []


class ContactPageSerializer(writable_nested_serializers.WritableNestedModelSerializer):
    basic_infos = BasicInfoSerializer(many=True)

    class Meta:
        model = models.ContactPage
        exclude = []


# endregion


# region ContentPage
class ContentPageSerializer(SerializerWithImageFieldMixin, serializers.ModelSerializer):
    class Meta:
        model = models.ContentPage
        exclude = []
# endregion
