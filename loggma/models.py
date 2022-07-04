from operator import mod
from django.db import models
from django.core.exceptions import ValidationError

def validate_tr_id(value):
    if value > 999999 or value < 100000:
        raise ValidationError(
            'Value must have 6 digits',
            params={'value': value},
        )

class Customer(models.Model):
    id = models.IntegerField(default=0, primary_key=True, unique=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    tr_id = models.IntegerField(default=0, validators=[validate_tr_id])
    phone = models.IntegerField(default=0)
    city = models.CharField(max_length=200)
    district = models.IntegerField(default=0)

    def __str__(self):
        return (self.first_name + " " + self.last_name)

    def create(self, validated_data):
        return Customer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = validated_data.get('id', instance.id)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.id = validated_data.get('id', instance.id)
        instance.tr_id = validated_data.get('tr_id', instance.tr_id)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.city = validated_data.get('city', instance.city)
        instance.district = validated_data.get('district', instance.district)
        instance.save()
        return instance