from django.contrib import admin
from nested_inline import admin as nested_inline_admin

from . import models


# region Configuration

@admin.register(models.Configuration)
class ConfigurationAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False


# endregion


# region HomePage
@admin.register(models.HomePage)
class HomePageAdmin(admin.ModelAdmin):
    pass


# endregion


# region OfferPage
class StepInline(nested_inline_admin.NestedTabularInline):
    model = models.Step
    extra = 0


class SectionInline(nested_inline_admin.NestedTabularInline):
    model = models.Section
    extra = 0


class OfferInline(nested_inline_admin.NestedTabularInline):
    model = models.Offer
    inlines = [StepInline, SectionInline]
    extra = 1


@admin.register(models.OfferPage)
class OfferPageAdmin(nested_inline_admin.NestedModelAdmin):
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

@admin.register(models.ContentPage)
class ContentPageAdmin(admin.ModelAdmin):
    pass

# endregion
