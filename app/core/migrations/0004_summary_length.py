# Generated by Django 3.2.10 on 2021-12-09 01:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_auto_20211205_0108'),
    ]

    operations = [
        migrations.AddField(
            model_name='summary',
            name='length',
            field=models.IntegerField(default=0),
        ),
    ]