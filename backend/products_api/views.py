from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ProductSerializer, ProductFamilySerializer
from .models import Product, ProductFamily
from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 10  

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()
    pagination_class = ProductPagination
    def list(self, request, *args, **kwargs):
        if 'page' in request.query_params:
            return super().list(request, *args, **kwargs)
        else:
            queryset = self.filter_queryset(self.get_queryset())  
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

class ProductFamilyView(viewsets.ModelViewSet):
    serializer_class = ProductFamilySerializer
    queryset = ProductFamily.objects.all()
    pagination_class = ProductPagination
    def list(self, request, *args, **kwargs):
        if 'page' in request.query_params:
            return super().list(request, *args, **kwargs)
        else:
            queryset = self.filter_queryset(self.get_queryset())  
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)