# Generated by Django 3.0.7 on 2020-07-25 16:18

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
                ('site_name', models.CharField(default='Unknown', max_length=30, verbose_name='site name')),
                ('language', models.CharField(choices=[('pl', 'polski'), ('en-us', 'english')], default='en-us', max_length=30, verbose_name='language')),
                ('favicon', models.ImageField(default='', upload_to='pages/configuration/icon', verbose_name='favicon')),
                ('logo', models.ImageField(blank=True, upload_to='pages/configuration/logo', verbose_name='logo')),
                ('wave_border_height', models.IntegerField(default=5, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(100)], verbose_name='wave border height')),
                ('theme', models.CharField(choices=[('light', 'light'), ('dark', 'dark')], default='light', max_length=20, verbose_name='theme')),
                ('primary_color', colorfield.fields.ColorField(default='#FF1744', max_length=18, verbose_name='primary color')),
                ('secondary_color', colorfield.fields.ColorField(default='#ADD8E6', max_length=18, verbose_name='secondary color')),
                ('default_background_image', models.ImageField(blank=True, upload_to='pages/configuration/default_background_image', verbose_name='default background image')),
                ('default_background_size', models.CharField(choices=[('auto', 'auto'), ('cover', 'cover'), ('contain', 'contain')], default='cover', help_text='1vh = 1% viewport height.', max_length=20, verbose_name='default background size')),
            ],
            options={
                'verbose_name': 'configuration',
                'verbose_name_plural': 'configuration',
                'ordering': ('pk',),
            },
        ),
        migrations.CreateModel(
            name='Offer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30, unique=True, verbose_name='title')),
                ('slug', models.SlugField(unique=True, verbose_name='slug')),
                ('superscription', models.CharField(blank=True, max_length=50, verbose_name='superscription')),
                ('description', models.CharField(max_length=200, verbose_name='description')),
                ('image', models.ImageField(upload_to='pages/offer_page/offers', verbose_name='image')),
            ],
            options={
                'verbose_name': 'offer',
                'verbose_name_plural': 'offers',
                'ordering': ('pk',),
            },
        ),
        migrations.CreateModel(
            name='Page',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30, unique=True, verbose_name='title')),
                ('description', models.CharField(blank=True, max_length=1000, verbose_name='description')),
                ('background_image', models.ImageField(blank=True, upload_to='pages/page/background_image', verbose_name='background image')),
                ('background_size', models.CharField(choices=[('auto', 'auto'), ('cover', 'cover'), ('contain', 'contain')], default='cover', max_length=20, verbose_name='background size')),
                ('published', models.BooleanField(default=False, verbose_name='published')),
                ('link', models.CharField(help_text="Leave '/' for the homepage, for the other pages start it with '/', for example '/contact'.", max_length=50, unique=True, validators=[django.core.validators.RegexValidator(regex='^[/]([a-z0-9]?)+(?:-[a-z0-9]+)*$')], verbose_name='link')),
                ('exact', models.BooleanField(default=True, verbose_name='exact')),
                ('icon', models.CharField(max_length=50, unique=True, verbose_name='icon')),
            ],
            options={
                'verbose_name': 'page',
                'verbose_name_plural': 'pages',
                'ordering': ('pk',),
            },
        ),
        migrations.CreateModel(
            name='ContactPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.Page')),
                ('contact_form_email', models.EmailField(blank=True, help_text="If you don't want the contact form, leave it blank.", max_length=254, verbose_name='contact form email')),
            ],
            options={
                'verbose_name': 'contact page',
                'verbose_name_plural': 'contact pages',
                'ordering': ('pk',),
            },
            bases=('pages.page',),
        ),
        migrations.CreateModel(
            name='ContentPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.Page')),
                ('contents', models.CharField(max_length=2000, unique=True, verbose_name='contents')),
                ('image', models.ImageField(blank=True, upload_to='pages/content_page/image', verbose_name='image')),
            ],
            options={
                'verbose_name': 'content page',
                'verbose_name_plural': 'content pages',
                'ordering': ('pk',),
            },
            bases=('pages.page',),
        ),
        migrations.CreateModel(
            name='HomePage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.Page')),
                ('heading', models.CharField(max_length=50, verbose_name='heading')),
                ('subheading', models.CharField(max_length=100, verbose_name='subheading')),
            ],
            options={
                'verbose_name': 'home page',
                'verbose_name_plural': 'home pages',
                'ordering': ('pk',),
            },
            bases=('pages.page',),
        ),
        migrations.CreateModel(
            name='OfferPage',
            fields=[
                ('page_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='pages.Page')),
            ],
            options={
                'verbose_name': 'offer page',
                'verbose_name_plural': 'offer pages',
                'ordering': ('pk',),
            },
            bases=('pages.page',),
        ),
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30, unique=True, verbose_name='title')),
                ('description', models.CharField(max_length=500, unique=True, verbose_name='description')),
                ('offer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='steps', to='pages.Offer')),
            ],
            options={
                'verbose_name': 'step',
                'verbose_name_plural': 'steps',
                'ordering': ('pk',),
            },
        ),
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30, unique=True, verbose_name='title')),
                ('contents', models.CharField(max_length=2000, unique=True, verbose_name='contents')),
                ('offer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sections', to='pages.Offer')),
            ],
            options={
                'verbose_name': 'section',
                'verbose_name_plural': 'sections',
                'ordering': ('pk',),
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
                ('title', models.CharField(max_length=60, unique=True, verbose_name='title')),
                ('icon', models.CharField(max_length=50, verbose_name='icon')),
                ('contact_page', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='basic_infos', to='pages.ContactPage')),
            ],
            options={
                'verbose_name': 'basic information',
                'verbose_name_plural': 'basic informations',
                'ordering': ('pk',),
            },
        ),
    ]
