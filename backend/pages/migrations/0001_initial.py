# Generated by Django 3.0.5 on 2020-05-27 16:03

import colorfield.fields
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Configuration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('site_name', models.CharField(default='Unknown', max_length=30, verbose_name='nazwa strony')),
                ('favicon', models.ImageField(default='', upload_to='pages/configuration/icon', verbose_name='ikona ulubionych')),
                ('logo', models.ImageField(blank=True, upload_to='pages/configuration/logo', verbose_name='logo')),
                ('wave_border_height', models.IntegerField(default=5, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='Wysokość fali')),
                ('theme', models.CharField(choices=[('light', 'jasny'), ('dark', 'ciemny')], default='light', max_length=10, verbose_name='motyw')),
                ('primary_color', colorfield.fields.ColorField(default='#FF1744', max_length=18, verbose_name='kolor podstawowy')),
                ('secondary_color', colorfield.fields.ColorField(default='#ADD8E6', max_length=18, verbose_name='kolor pochodny')),
                ('default_background_image', models.ImageField(blank=True, upload_to='pages/configuration/default_background_image', verbose_name='domyślne tło')),
                ('default_background_size', models.CharField(choices=[('auto', 'auto'), ('cover', 'pokrywaj'), ('contain', 'zawieraj')], default='cover', max_length=10, verbose_name='rozmiar domyślnego tła')),
            ],
            options={
                'verbose_name': 'Konfiguracja',
                'verbose_name_plural': 'Konfiguracja',
            },
        ),
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True, verbose_name='tytuł')),
                ('slug', models.SlugField(unique=True)),
                ('superscription', models.CharField(blank=True, max_length=50, verbose_name='nadtytuł')),
                ('description', models.CharField(max_length=200, verbose_name='opis')),
                ('image', models.ImageField(upload_to='pages/offer_page/offers', verbose_name='miniaturka')),
            ],
            options={
                'verbose_name': 'Oferta',
                'verbose_name_plural': 'Oferty',
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True, verbose_name='tytuł')),
                ('description', models.CharField(blank=True, max_length=1000, verbose_name='opis')),
                ('background_image', models.ImageField(blank=True, upload_to='pages/page/background_image', verbose_name='tło')),
                ('background_size', models.CharField(choices=[('auto', 'auto'), ('cover', 'pokrywaj'), ('contain', 'zawieraj')], default='cover', max_length=10, verbose_name='rozmiar tła')),
                ('published', models.BooleanField(default=False, verbose_name='opublikowana')),
                ('link', models.CharField(max_length=50, unique=True, validators=[django.core.validators.RegexValidator(regex='^[/]([a-z0-9]?)+(?:-[a-z0-9]+)*$')])),
                ('exact', models.BooleanField(default=True, verbose_name='nie posiada podstron')),
                ('icon', models.CharField(max_length=50, unique=True, verbose_name='ikona')),
            ],
            options={
                'verbose_name': 'Strona',
                'verbose_name_plural': 'Strony',
            },
        ),
        migrations.CreateModel(
            name='ContactPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.Page')),
                ('contact_form_email', models.EmailField(blank=True, max_length=254, verbose_name='Email docelowy w formularzu kontaktowym')),
            ],
            options={
                'verbose_name': 'Strona kontaktu',
                'verbose_name_plural': 'Strony kontaktu',
            },
            bases=('pages.page',),
        ),
        migrations.CreateModel(
            name='ContentPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.Page')),
                ('contents', models.CharField(max_length=2000, unique=True, verbose_name='zawartość')),
                ('image', models.ImageField(blank=True, upload_to='pages/content_page/image', verbose_name='obraz')),
            ],
            options={
                'verbose_name': 'Strona z nieokreśloną zawartością',
                'verbose_name_plural': 'Strony z nieokreśloną zawartością',
            },
            bases=('pages.page',),
        ),
        migrations.CreateModel(
            name='HomePage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.Page')),
                ('heading', models.CharField(max_length=50, verbose_name='nagłówek')),
                ('subheading', models.CharField(max_length=100, verbose_name='podtytuł')),
            ],
            options={
                'verbose_name': 'Strona główna',
                'verbose_name_plural': 'Strony główne',
            },
            bases=('pages.page',),
        ),
        migrations.CreateModel(
            name='OfferPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.Page')),
            ],
            options={
                'verbose_name': 'Strona z ofertami',
                'verbose_name_plural': 'Strony z ofertami',
            },
            bases=('pages.page',),
        ),
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True, verbose_name='tytuł')),
                ('description', models.CharField(max_length=500, unique=True, verbose_name='opis')),
                ('offer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='steps', to='pages.Offer')),
            ],
            options={
                'verbose_name': 'Krok',
                'verbose_name_plural': 'Kroki',
            },
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True, verbose_name='tytuł')),
                ('contents', models.CharField(max_length=2000, unique=True, verbose_name='zawartość')),
                ('offer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='pages.Offer')),
            ],
            options={
                'verbose_name': 'Sekcja',
                'verbose_name_plural': 'Sekcje',
            },
        ),
        migrations.AddField(
            model_name='offer',
            name='offer_page',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='offers', to='pages.OfferPage'),
        ),
        migrations.CreateModel(
            name='BasicInfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, unique=True, verbose_name='tytuł')),
                ('icon', models.CharField(max_length=50, verbose_name='ikona')),
                ('contact_page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='basic_infos', to='pages.ContactPage')),
            ],
            options={
                'verbose_name': 'Informacja',
                'verbose_name_plural': 'Informacje',
            },
        ),
    ]
