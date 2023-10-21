from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ProductSerializer, ProductFamilySerializer
from .models import Product, ProductFamily
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

class ProductPagination(PageNumberPagination):
    page_size = 10  

class ProductFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name="name", lookup_expr="icontains")
    class Meta:
        model = Product
        fields = ["name", "is_active"]

class ProductFamilyFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name="name", lookup_expr="icontains")
    class Meta:
        model = ProductFamily
        fields = ["name", "is_active"]

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    def list(self, request, *args, **kwargs):
        if 'page' in request.query_params:
            return super().list(request, *args, **kwargs)
        else:
            queryset = self.filter_queryset(self.get_queryset().filter(is_active=True))  
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

class ProductFamilyView(viewsets.ModelViewSet):
    serializer_class = ProductFamilySerializer
    queryset = ProductFamily.objects.all()
    pagination_class = ProductPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFamilyFilter
    def list(self, request, *args, **kwargs):
        if 'page' in request.query_params:
            return super().list(request, *args, **kwargs)
        else:
            queryset = self.filter_queryset(self.get_queryset().filter(is_active=True))  
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)