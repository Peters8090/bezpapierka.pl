# Generated by Django 3.0.5 on 2020-05-22 13:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0015_auto_20200522_1516'),
    ]

    operations = [
        migrations.AlterField(
            model_name='page',
            name='background_size',
            field=models.CharField(choices=[('auto', 'auto'), ('cover', 'pokrywaj'), ('contain', 'zawieraj')], default='cover', max_length=10, verbose_name='rozmiar tła'),
        ),
    ]
