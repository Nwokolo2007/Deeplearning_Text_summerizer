# Generated by Django 3.2.9 on 2021-12-05 00:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Summary',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True)),
                ('articleUrl', models.TextField(blank=True, null=True)),
                ('docContent', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
