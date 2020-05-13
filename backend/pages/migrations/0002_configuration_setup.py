from django.db import migrations


def configuration_setup(apps, _):
    Configuration = apps.get_model('pages', 'Configuration')

    Configuration().save()


class Migration(migrations.Migration):
    dependencies = [
        ('pages', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(configuration_setup),
    ]
