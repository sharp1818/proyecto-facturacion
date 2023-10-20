from rest_framework import viewsets
from .serializers import ProductSerializer, ProductFamilySerializer
from .models import Product, ProductFamily
from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 10  

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = ProductPagination

class ProductFamilyView(viewsets.ModelViewSet):
    serializer_class = ProductFamilySerializer
    queryset = ProductFamily.objects.all()
    pagination_class = ProductPagination
