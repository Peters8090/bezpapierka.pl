from django.db import migrations


def configuration_setup(apps, _):
    Configuration = apps.get_model('pages', 'Configuration')

    configuration = Configuration(company_name='Unknown', theme='light', primary_color='#ADD8E6',
                                  secondary_color='#FF1744')
    configuration.save()


class Migration(migrations.Migration):
    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(configuration_setup),
    ]
