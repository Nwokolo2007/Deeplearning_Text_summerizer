# Generated by Django 3.2.12 on 2022-02-10 21:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_file'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='file',
            name='remark',
        ),
        migrations.RemoveField(
            model_name='file',
            name='timestamp',
        ),
        migrations.AddField(
            model_name='file',
            name='filename',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='file',
            name='length',
            field=models.IntegerField(default=0),
        ),
    ]