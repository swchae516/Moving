# Generated by Django 3.2.3 on 2022-03-14 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0017_rating'),
        ('accounts', '0007_auto_20220314_1346'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='category_list',
            field=models.ManyToManyField(blank=True, null=True, to='movies.Genre'),
        ),
    ]