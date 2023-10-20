from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import InvoicetSerializer, InvoiceItemSerializer
from .models import Invoice, InvoiceItem
from rest_framework.pagination import PageNumberPagination

class ProductPagination(PageNumberPagination):
    page_size = 10  

class InvoiceView(viewsets.ModelViewSet):
    serializer_class = InvoicetSerializer
    queryset = Invoice.objects.all()
    pagination_class = ProductPagination
    def list(self, request, *args, **kwargs):
        if 'page' in request.query_params:
            return super().list(request, *args, **kwargs)
        else:
            queryset = self.filter_queryset(self.get_queryset())  
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)

class InvoiceItemView(viewsets.ModelViewSet):
    serializer_class = InvoiceItemSerializer
    queryset = InvoiceItem.objects.all()
    pagination_class = ProductPagination
    def list(self, request, *args, **kwargs):
        if 'page' in request.query_params:
            return super().list(request, *args, **kwargs)
        else:
            queryset = self.filter_queryset(self.get_queryset())  
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)