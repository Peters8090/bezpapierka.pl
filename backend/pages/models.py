from colorfield.fields import ColorField
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _, gettext


class Configuration(models.Model):
    site_name = models.CharField(max_length=30, default='Unknown', verbose_name=_('Site name'))
    language = models.CharField(max_length=30, default='en-us',
                                verbose_name=_('Language'),
                                choices=[('pl', _('Polish')), ('en-us', _('English'))], )
    favicon = models.ImageField(upload_to='pages/configuration/icon', verbose_name=_('Favicon'), default='')
    logo = models.ImageField(upload_to='pages/configuration/logo', verbose_name=_('Logo'), blank=True)
    wave_border_height = models.IntegerField(verbose_name=_('Wave border height'),
                                             validators=[MinValueValidator(0), MaxValueValidator(100)], default=5)
    theme = models.CharField(max_length=20, verbose_name=_('Theme'), default='light',
                             choices=[('light', _('Light')), ('dark', _('Dark'))])
    primary_color = ColorField(default='#FF1744', verbose_name=_('Primary color'))
    secondary_color = ColorField(default='#ADD8E6', verbose_name=_('Secondary color'))
    default_background_image = models.ImageField(upload_to='pages/configuration/default_background_image',
                                                 verbose_name=_('Default background image'), blank=True)
    default_background_size = models.CharField(max_length=20, verbose_name=_('Default background size'),
                                               help_text=_('1vh = 1% viewport height.'),
                                               default='cover',
                                               choices=[
                                                   ('auto', _('Auto')), ('cover', _('Cover')), ('contain', _('Contain'))
                                               ])

    class Meta:
        verbose_name = _('Configuration')
        verbose_name_plural = _('Configuration')

    def __str__(self):
        return gettext('Configuration')

    def save(self, *args, **kwargs):
        if not self.pk and Configuration.objects.exists():
            raise ValidationError(_('There can be only one Configuration instance.'))
        return super(Configuration, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError(_('There can be only one Configuration instance.'))


class Page(models.Model):
    title = models.CharField(max_length=30, unique=True, verbose_name=_('Title'))
    description = models.CharField(max_length=1000, blank=True, verbose_name=_('Description'),
                                   help_text=_('Valid only for SEO.'))
    background_image = models.ImageField(upload_to='pages/page/background_image', verbose_name=_('Background image'),
                                         blank=True)
    background_size = models.CharField(max_length=20, verbose_name=_('Background size'), default='cover', choices=[
        ('auto', _('Auto')), ('cover', _('Cover')), ('contain', _('Contain'))
    ])
    published = models.BooleanField(default=False, verbose_name=_('Published'))
    link = models.CharField(max_length=50, unique=True,
                            verbose_name=_('Link'),
                            help_text=_(
                                "Leave '/' for the homepage, for the other pages start it with '/', for "
                                "example '/contact'."),
                            validators=[RegexValidator(regex='^[/]([a-z0-9]?)+(?:-[a-z0-9]+)*$')])
    exact = models.BooleanField(default=True, verbose_name=_('Exact'))
    icon = models.CharField(max_length=50, verbose_name=_('Icon'), unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = _('Page')
        verbose_name_plural = _('Pages')


# region HomePage
class HomePage(Page):
    heading = models.CharField(max_length=50, verbose_name=_('Heading'))
    subheading = models.CharField(max_length=100, verbose_name=_('Subheading'))

    class Meta:
        verbose_name = _('Home page')
        verbose_name_plural = _('Home pages')


# endregion


# region OfferPage
class OfferPage(Page):
    class Meta:
        verbose_name = _('Offer page')
        verbose_name_plural = _('Offer pages')


class Offer(models.Model):
    offer_page = models.ForeignKey(OfferPage, related_name='offers', on_delete=models.CASCADE)
    title = models.CharField(max_length=30, verbose_name=_('Title'), unique=True)
    slug = models.SlugField(unique=True, verbose_name=_('Slug'))
    superscription = models.CharField(max_length=50, verbose_name=_('Superscription'), blank=True)
    description = models.CharField(max_length=200, verbose_name=_('Description'))
    image = models.ImageField(upload_to='pages/offer_page/offers', verbose_name=_('Image'))

    class Meta:
        verbose_name = _('Offer')
        verbose_name_plural = _('Offers')


class Step(models.Model):
    offer = models.ForeignKey(Offer, related_name='steps', on_delete=models.CASCADE)
    title = models.CharField(max_length=30, unique=True, verbose_name=_('Title'))
    description = models.CharField(max_length=500, unique=True, verbose_name=_('Description'))

    class Meta:
        verbose_name = _('Step')
        verbose_name_plural = _('Steps')


class Section(models.Model):
    offer = models.ForeignKey(Offer, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField(max_length=30, unique=True, verbose_name=_('Title'))
    contents = models.CharField(max_length=2000, unique=True, verbose_name=_('Contents'))

    class Meta:
        verbose_name = _('Section')
        verbose_name_plural = _('Sections')


# endregion


# region ContactPage
class ContactPage(Page):
    contact_form_email = models.EmailField(blank=True, verbose_name=_('Contact form email'),
                                           help_text=_("If you don't want the contact form, leave it blank."))

    class Meta:
        verbose_name = _('Contact page')
        verbose_name_plural = _('Contact pages')


class BasicInfo(models.Model):
    contact_page = models.ForeignKey(ContactPage, related_name='basic_infos', on_delete=models.CASCADE)
    title = models.CharField(max_length=60, unique=True, verbose_name=_('Title'))
    icon = models.CharField(max_length=50, verbose_name=_('Icon'))

    class Meta:
        verbose_name = _('Basic information')
        verbose_name_plural = _('Basic informations')


# endregion


# region ContentsPage
class ContentPage(Page):
    contents = models.CharField(max_length=2000, unique=True, verbose_name=_('Contents'))
    image = models.ImageField(upload_to='pages/content_page/image', verbose_name=_('Image'), blank=True)

    class Meta:
        verbose_name = _('Content page')
        verbose_name_plural = _('Content pages')
# endregion
