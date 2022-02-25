# Generated by Django 3.2.10 on 2021-12-23 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_summary_length'),
    ]

    operations = [
        migrations.AlterField(
            model_name='summary',
            name='articleUrl',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='summary',
            name='docContent',
            field=models.TextField(blank=True, default='1'),
            preserve_default=False,
        ),
    ]
