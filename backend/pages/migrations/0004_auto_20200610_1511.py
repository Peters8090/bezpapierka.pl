# Generated by Django 3.0.7 on 2020-06-10 13:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0003_auto_20200610_1445'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='basicinfo',
            options={'ordering': ('pk',), 'verbose_name': 'Basic information', 'verbose_name_plural': 'Basic informations'},
        ),
        migrations.AlterModelOptions(
            name='configuration',
            options={'ordering': ('pk',), 'verbose_name': 'Configuration', 'verbose_name_plural': 'Configuration'},
        ),
        migrations.AlterModelOptions(
            name='contactpage',
            options={'ordering': ('pk',), 'verbose_name': 'Contact page', 'verbose_name_plural': 'Contact pages'},
        ),
        migrations.AlterModelOptions(
            name='contentpage',
            options={'ordering': ('pk',), 'verbose_name': 'Content page', 'verbose_name_plural': 'Content pages'},
        ),
        migrations.AlterModelOptions(
            name='homepage',
            options={'ordering': ('pk',), 'verbose_name': 'Home page', 'verbose_name_plural': 'Home pages'},
        ),
        migrations.AlterModelOptions(
            name='offer',
            options={'ordering': ('pk',), 'verbose_name': 'Offer', 'verbose_name_plural': 'Offers'},
        ),
        migrations.AlterModelOptions(
            name='offerpage',
            options={'ordering': ('pk',), 'verbose_name': 'Offer page', 'verbose_name_plural': 'Offer pages'},
        ),
        migrations.AlterModelOptions(
            name='page',
            options={'ordering': ('pk',), 'verbose_name': 'Page', 'verbose_name_plural': 'Pages'},
        ),
        migrations.AlterModelOptions(
            name='section',
            options={'ordering': ('pk',), 'verbose_name': 'Section', 'verbose_name_plural': 'Sections'},
        ),
    ]
