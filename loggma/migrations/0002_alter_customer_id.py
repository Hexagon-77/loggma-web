# Generated by Django 4.0.5 on 2022-06-29 09:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('loggma', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='id',
            field=models.IntegerField(default=0, primary_key=True, serialize=False, unique=True),
        ),
    ]
