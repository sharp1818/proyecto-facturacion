from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from .serializers import InvoicetSerializer, InvoiceItemSerializer
from .models import Invoice, InvoiceItem
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView

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
        
class InvoiceItemsByInvoice(generics.ListAPIView):
    serializer_class = InvoiceItemSerializer
    def get_queryset(self):
        # Obtén el ID de la factura de los parámetros de la solicitud
        invoice_id = self.kwargs.get('invoice_id')
        # Filtra los elementos InvoiceItem relacionados con la factura
        queryset = InvoiceItem.objects.filter(invoice__id=invoice_id)
        return queryset