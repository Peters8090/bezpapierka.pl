from colorfield.fields import ColorField
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _, gettext


# Fixes the ordering in PostgreSQL
class OrderedMeta:
    ordering = ('pk',)


class Configuration(models.Model):
    site_name = models.CharField(max_length=30, default='Unknown', verbose_name=_('site name'))
    language = models.CharField(max_length=30, default='en-us',
                                verbose_name=_('language'),
                                choices=[('pl', 'polski'), ('en-us', 'english')], )
    favicon = models.ImageField(upload_to='pages/configuration/icon', verbose_name=_('favicon'), default='')
    logo = models.ImageField(upload_to='pages/configuration/logo', verbose_name=_('logo'), blank=True)
    wave_border_height = models.IntegerField(verbose_name=_('wave border height'),
                                             validators=[MinValueValidator(0), MaxValueValidator(100)], default=5)
    theme = models.CharField(max_length=20, verbose_name=_('theme'), default='light',
                             choices=[('light', _('light')), ('dark', _('dark'))])
    primary_color = ColorField(default='#FF1744', verbose_name=_('primary color'))
    secondary_color = ColorField(default='#ADD8E6', verbose_name=_('secondary color'))
    default_background_image = models.ImageField(upload_to='pages/configuration/default_background_image',
                                                 verbose_name=_('default background image'), blank=True)
    default_background_size = models.CharField(max_length=20, verbose_name=_('default background size'),
                                               help_text=_('1vh = 1% viewport height.'),
                                               default='cover',
                                               choices=[
                                                   ('auto', _('auto')), ('cover', _('cover')), ('contain', _('contain'))
                                               ])

    class Meta(OrderedMeta):
        verbose_name = _('configuration')
        verbose_name_plural = _('configuration')

    def __str__(self):
        return gettext('configuration')

    def save(self, *args, **kwargs):
        if not self.pk and Configuration.objects.exists():
            raise ValidationError(_('There can be only one Configuration instance.'))
        return super(Configuration, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError(_('There can be only one Configuration instance.'))


class Page(models.Model):
    title = models.CharField(max_length=30, unique=True, verbose_name=_('title'))
    description = models.CharField(max_length=1000, blank=True, verbose_name=_('description'))
    background_image = models.ImageField(upload_to='pages/page/background_image', verbose_name=_('background image'),
                                         blank=True)
    background_size = models.CharField(max_length=20, verbose_name=_('background size'), default='cover', choices=[
        ('auto', _('auto')), ('cover', _('cover')), ('contain', _('contain'))
    ])
    published = models.BooleanField(default=False, verbose_name=_('published'))
    link = models.CharField(max_length=50, unique=True,
                            verbose_name=_('link'),
                            help_text=_(
                                "Leave '/' for the homepage, for the other pages start it with '/', for "
                                "example '/contact'."),
                            validators=[RegexValidator(regex='^[/]([a-z0-9]?)+(?:-[a-z0-9]+)*$')])
    exact = models.BooleanField(default=True, verbose_name=_('exact'))
    icon = models.CharField(max_length=50, verbose_name=_('icon'), unique=True)

    def __str__(self):
        return self.title

    class Meta(OrderedMeta):
        verbose_name = _('page')
        verbose_name_plural = _('pages')


# region HomePage
class HomePage(Page):
    heading = models.CharField(max_length=50, verbose_name=_('heading'))
    subheading = models.CharField(max_length=100, verbose_name=_('subheading'))

    class Meta(OrderedMeta):
        verbose_name = _('home page')
        verbose_name_plural = _('home pages')


# endregion


# region OfferPage
class OfferPage(Page):
    class Meta(OrderedMeta):
        verbose_name = _('offer page')
        verbose_name_plural = _('offer pages')


class Offer(models.Model):
    offer_page = models.ForeignKey(OfferPage, related_name='offers', on_delete=models.CASCADE)
    title = models.CharField(max_length=30, verbose_name=_('title'), unique=True)
    slug = models.SlugField(unique=True, verbose_name=_('slug'))
    superscription = models.CharField(max_length=50, verbose_name=_('superscription'), blank=True)
    description = models.CharField(max_length=200, verbose_name=_('description'))
    image = models.ImageField(upload_to='pages/offer_page/offers', verbose_name=_('image'))

    class Meta(OrderedMeta):
        verbose_name = _('offer')
        verbose_name_plural = _('offers')


class Step(models.Model):
    offer = models.ForeignKey(Offer, related_name='steps', on_delete=models.CASCADE)
    title = models.CharField(max_length=30, unique=True, verbose_name=_('title'))
    description = models.CharField(max_length=500, unique=True, verbose_name=_('description'))

    class Meta(OrderedMeta):
        verbose_name = _('step')
        verbose_name_plural = _('steps')


class Section(models.Model):
    offer = models.ForeignKey(Offer, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField(max_length=30, unique=True, verbose_name=_('title'))
    contents = models.CharField(max_length=2000, unique=True, verbose_name=_('contents'))

    class Meta(OrderedMeta):
        verbose_name = _('section')
        verbose_name_plural = _('sections')


# endregion


# region ContactPage
class ContactPage(Page):
    contact_form_email = models.EmailField(blank=True, verbose_name=_('contact form email'),
                                           help_text=_("If you don't want the contact form, leave it blank."))

    class Meta(OrderedMeta):
        verbose_name = _('contact page')
        verbose_name_plural = _('contact pages')


class BasicInfo(models.Model):
    contact_page = models.ForeignKey(ContactPage, related_name='basic_infos', on_delete=models.CASCADE)
    title = models.CharField(max_length=60, unique=True, verbose_name=_('title'))
    icon = models.CharField(max_length=50, verbose_name=_('icon'))

    class Meta(OrderedMeta):
        verbose_name = _('basic information')
        verbose_name_plural = _('basic informations')


# endregion


# region ContentsPage
class ContentPage(Page):
    contents = models.CharField(max_length=2000, unique=True, verbose_name=_('contents'))
    image = models.ImageField(upload_to='pages/content_page/image', verbose_name=_('image'), blank=True)

    class Meta(OrderedMeta):
        verbose_name = _('content page')
        verbose_name_plural = _('content pages')
# endregion
