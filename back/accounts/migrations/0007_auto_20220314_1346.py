# Generated by Django 3.2.3 on 2022-03-14 04:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0017_rating'),
        ('accounts', '0006_rating'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='category_list',
            field=models.ManyToManyField(null=True, to='movies.Genre'),
        ),
        migrations.DeleteModel(
            name='Rating',
        ),
    ]
