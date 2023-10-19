from rest_framework import serializers
from .models import ProductFamily, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class ProductFamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductFamily
        fields = '__all__'