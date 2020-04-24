from rest_framework import serializers

from . import models


# region HomePage
class HomePageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.HomePage
        fields = '__all__'


# endregion

# region OfferPage

class StepSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Step
        fields = '__all__'


class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Section
        fields = '__all__'


class OfferSerializer(serializers.ModelSerializer):
    steps = StepSerializer(many=True, read_only=True)
    sections = SectionSerializer(many=True, read_only=True)

    class Meta:
        model = models.Offer
        fields = '__all__'


class OfferPageSerializer(serializers.ModelSerializer):
    offers = OfferSerializer(many=True, read_only=True)

    class Meta:
        model = models.OfferPage
        fields = '__all__'


# endregion

# region ContactPage
class BasicInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.BasicInfo
        fields = '__all__'


class ContactPageSerializer(serializers.ModelSerializer):
    basic_infos = BasicInfoSerializer(many=True, read_only=True)

    class Meta:
        model = models.ContactPage
        fields = '__all__'


# endregion

# region ContentPage
class ContentPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ContentPage
        fields = '__all__'
# endregion
