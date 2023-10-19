from rest_framework import viewsets
from .serializers import ProductSerializer, ProductFamilySerializer
from .models import Product, ProductFamily

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ProductFamilyView(viewsets.ModelViewSet):
    serializer_class = ProductFamilySerializer
    queryset = ProductFamily.objects.all()


