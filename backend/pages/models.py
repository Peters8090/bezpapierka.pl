from colorfield.fields import ColorField
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import models


class Configuration(models.Model):
    site_name = models.CharField(max_length=30, default='Unknown', verbose_name='nazwa strony')
    logo = models.ImageField(upload_to='pages/configuration/logo', verbose_name='logo', blank=True)
    theme = models.CharField(max_length=10, verbose_name='motyw', default='light',
                             choices=[('light', 'jasny'), ('dark', 'ciemny')])
    primary_color = ColorField(default='#FF1744', verbose_name='kolor podstawowy')
    secondary_color = ColorField(default='#ADD8E6', verbose_name='kolor pochodny')
    default_background_image = models.ImageField(upload_to='pages/configuration/default_background_image', verbose_name='domyślne tło', blank=True)

    class Meta:
        verbose_name = 'Konfiguracja'
        verbose_name_plural = 'Konfiguracja'

    def __str__(self):
        return 'Konfiguracja'

    def save(self, *args, **kwargs):
        if not self.pk and Configuration.objects.exists():
            raise ValidationError('There is can be only one Configuration instance')
        return super(Configuration, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise ValidationError('There is can be only one Configuration instance')


class Page(models.Model):
    title = models.CharField(max_length=50, unique=True, verbose_name='tytuł')
    description = models.CharField(max_length=1000, blank=True, verbose_name='opis')
    background_image = models.ImageField(upload_to='pages/page/background_image', verbose_name='tło', blank=True)
    published = models.BooleanField(default=False, verbose_name='opublikowana')
    link = models.CharField(max_length=50, unique=True,
                            validators=[RegexValidator(regex='^[/]([a-z0-9]?)+(?:-[a-z0-9]+)*$')])
    exact = models.BooleanField(default=True, verbose_name='nie posiada podstron')
    icon = models.CharField(max_length=50, verbose_name='ikona', unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Strona'
        verbose_name_plural = 'Strony'


# region HomePage
class HomePage(Page):
    heading = models.CharField(max_length=50, verbose_name='nagłówek')
    subheading = models.CharField(max_length=100, verbose_name='podtytuł')

    class Meta:
        verbose_name = 'Strona główna'
        verbose_name_plural = 'Strony główne'


# endregion


# region OfferPage
class OfferPage(Page):
    class Meta:
        verbose_name = 'Strona z ofertami'
        verbose_name_plural = 'Strony z ofertami'


class Offer(models.Model):
    offer_page = models.ForeignKey(OfferPage, related_name='offers', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, verbose_name='tytuł', unique=True)
    slug = models.SlugField(unique=True)
    superscription = models.CharField(max_length=50, verbose_name='nadtytuł', blank=True)
    description = models.CharField(max_length=200, verbose_name='opis')
    image = models.ImageField(upload_to='pages/offer_page/offers', verbose_name='miniaturka')

    class Meta:
        verbose_name = 'Oferta'
        verbose_name_plural = 'Oferty'


class Step(models.Model):
    offer = models.ForeignKey(Offer, related_name='steps', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, unique=True, verbose_name='tytuł')
    description = models.CharField(max_length=500, unique=True, verbose_name='opis')

    class Meta:
        verbose_name = 'Krok'
        verbose_name_plural = 'Kroki'


class Section(models.Model):
    offer = models.ForeignKey(Offer, related_name='sections', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, unique=True, verbose_name='tytuł')
    contents = models.CharField(max_length=2000, unique=True, verbose_name='zawartość')

    class Meta:
        verbose_name = 'Sekcja'
        verbose_name_plural = 'Sekcje'


# endregion


# region ContactPage
class ContactPage(Page):
    contact_form_email = models.EmailField(blank=True, verbose_name='Email docelowy w formularzu kontaktowym')

    class Meta:
        verbose_name = 'Strona kontaktu'
        verbose_name_plural = 'Strony kontaktu'


class BasicInfo(models.Model):
    contact_page = models.ForeignKey(ContactPage, related_name='basic_infos', on_delete=models.CASCADE)
    title = models.CharField(max_length=50, unique=True, verbose_name='tytuł')
    icon = models.CharField(max_length=50, verbose_name='ikona')

    class Meta:
        verbose_name = 'Informacja'
        verbose_name_plural = 'Informacje'


# endregion


# region ContentsPage
class ContentPage(Page):
    contents = models.CharField(max_length=2000, unique=True, verbose_name='zawartość')
    image = models.ImageField(upload_to='pages/content_page/image', verbose_name='obraz', blank=True)

    class Meta:
        verbose_name = 'Strona z nieokreśloną zawartością'
        verbose_name_plural = 'Strony z nieokreśloną zawartością'
# endregion
