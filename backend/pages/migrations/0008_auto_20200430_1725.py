# Generated by Django 3.0.5 on 2020-04-30 15:25

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0007_auto_20200429_1644'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='basicinfo',
            options={'verbose_name': 'Informacja', 'verbose_name_plural': 'Informacje'},
        ),
        migrations.AlterModelOptions(
            name='contactpage',
            options={'verbose_name': 'Strona kontaktu', 'verbose_name_plural': 'Strony kontaktu'},
        ),
        migrations.AlterModelOptions(
            name='contentpage',
            options={'verbose_name': 'Strona z nieokreśloną zawartością', 'verbose_name_plural': 'Strony z nieokreśloną zawartością'},
        ),
        migrations.AlterModelOptions(
            name='homepage',
            options={'verbose_name': 'Strona główna', 'verbose_name_plural': 'Strony główne'},
        ),
        migrations.AlterModelOptions(
            name='offer',
            options={'verbose_name': 'Oferta', 'verbose_name_plural': 'Oferty'},
        ),
        migrations.AlterModelOptions(
            name='offerpage',
            options={'verbose_name': 'Strona z ofertami', 'verbose_name_plural': 'Strony z ofertami'},
        ),
        migrations.AlterModelOptions(
            name='page',
            options={'verbose_name': 'Strona', 'verbose_name_plural': 'Strony'},
        ),
        migrations.AlterModelOptions(
            name='section',
            options={'verbose_name': 'Sekcja', 'verbose_name_plural': 'Sekcje'},
        ),
        migrations.AlterModelOptions(
            name='step',
            options={'verbose_name': 'Krok', 'verbose_name_plural': 'Kroki'},
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='icon',
            field=models.CharField(max_length=50, unique=True, verbose_name='ikona'),
        ),
        migrations.AlterField(
            model_name='basicinfo',
            name='title',
            field=models.CharField(max_length=50, unique=True, verbose_name='tytuł'),
        ),
        migrations.AlterField(
            model_name='contactpage',
            name='contact_form_email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='Email docelowy w formularzu kontaktowym'),
        ),
        migrations.AlterField(
            model_name='contentpage',
            name='contents',
            field=models.CharField(max_length=2000, unique=True, verbose_name='zawartość'),
        ),
        migrations.AlterField(
            model_name='contentpage',
            name='image',
            field=models.ImageField(upload_to='pages/content_page/image', verbose_name='obraz'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='background_image',
            field=models.ImageField(blank=True, upload_to='pages/home_page/background_image', verbose_name='tło'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='heading',
            field=models.CharField(max_length=50, verbose_name='nagłówek'),
        ),
        migrations.AlterField(
            model_name='homepage',
            name='subheading',
            field=models.CharField(max_length=100, verbose_name='podtytuł'),
        ),
        migrations.AlterField(
            model_name='offer',
            name='description',
            field=models.CharField(max_length=200, verbose_name='opis'),
        ),
        migrations.AlterField(
            model_name='offer',
            name='image',
            field=models.ImageField(upload_to='pages/offer_page/offers', verbose_name='miniaturka'),
        ),
        migrations.AlterField(
            model_name='offer',
            name='superscription',
            field=models.CharField(max_length=50, verbose_name='nadtytuł'),
        ),
        migrations.AlterField(
            model_name='offer',
            name='title',
            field=models.CharField(max_length=50, unique=True, verbose_name='tytuł'),
        ),
        migrations.AlterField(
            model_name='page',
            name='description',
            field=models.CharField(blank=True, max_length=1000, verbose_name='opis'),
        ),
        migrations.AlterField(
            model_name='page',
            name='icon',
            field=models.CharField(max_length=50, unique=True, verbose_name='ikona'),
        ),
        migrations.AlterField(
            model_name='page',
            name='link',
            field=models.CharField(max_length=50, unique=True, validators=[django.core.validators.RegexValidator(regex='^[/][a-z0-9]+(?:-[a-z0-9]+)*$')]),
        ),
        migrations.AlterField(
            model_name='page',
            name='title',
            field=models.CharField(max_length=50, unique=True, verbose_name='tytuł'),
        ),
        migrations.AlterField(
            model_name='section',
            name='contents',
            field=models.CharField(max_length=2000, unique=True, verbose_name='zawartość'),
        ),
        migrations.AlterField(
            model_name='section',
            name='title',
            field=models.CharField(max_length=50, unique=True, verbose_name='tytuł'),
        ),
        migrations.AlterField(
            model_name='step',
            name='description',
            field=models.CharField(max_length=500, unique=True, verbose_name='opis'),
        ),
        migrations.AlterField(
            model_name='step',
            name='title',
            field=models.CharField(max_length=50, unique=True, verbose_name='tytuł'),
        ),
    ]