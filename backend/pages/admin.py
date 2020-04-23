from django.contrib import admin
from nested_inline import admin as nested_inline

from . import models


# region HomePage
@admin.register(models.HomePage)
class HomePageAdmin(nested_inline.NestedModelAdmin):
    pass


# endregion


# region OfferPage
class StepInline(nested_inline.NestedTabularInline):
    model = models.Step
    extra = 0


class SectionInline(nested_inline.NestedTabularInline):
    model = models.Section
    extra = 0


class OfferInline(nested_inline.NestedTabularInline):
    model = models.Offer
    inlines = [StepInline, SectionInline]
    extra = 1


@admin.register(models.OfferPage)
class OfferPageAdmin(nested_inline.NestedModelAdmin):
    inlines = [OfferInline]


# endregion


# region ContactPage
class BasicInfoInline(admin.TabularInline):
    model = models.BasicInfo
    extra = 0


@admin.register(models.ContactPage)
class ContactPageAdmin(admin.ModelAdmin):
    inlines = [BasicInfoInline]


# endregion


# region ContentsPage

@admin.register(models.ContentsPage)
class ContentsPageAdmin(admin.ModelAdmin):
    pass

# endregion
