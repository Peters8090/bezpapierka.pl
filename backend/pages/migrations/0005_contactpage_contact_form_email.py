# Generated by Django 3.0.5 on 2020-04-27 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0004_auto_20200426_2145'),
    ]

    operations = [
        migrations.AddField(
            model_name='contactpage',
            name='contact_form_email',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]