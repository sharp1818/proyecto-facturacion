from rest_framework import viewsets
from rest_framework import generics
from rest_framework.response import Response
from .serializers import InvoicetSerializer, InvoiceItemSerializer
from .models import Invoice, InvoiceItem
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
import django_filters

class InvoicePagination(PageNumberPagination):
    page_size = 10  

class InvoiceFilter(django_filters.FilterSet):
    client_name = django_filters.CharFilter(field_name="client_name", lookup_expr="icontains")
    client_ruc = django_filters.CharFilter(field_name="client_ruc", lookup_expr="icontains")
    class Meta:
        model = Invoice
        fields = ["client_name", "client_ruc"]

class InvoiceItemFilter(django_filters.FilterSet):
    product_name = django_filters.CharFilter(field_name="product_name", lookup_expr="icontains")
    product_code = django_filters.CharFilter(field_name="product_code", lookup_expr="icontains")
    class Meta:
        model = InvoiceItem
        fields = ["product_name", "product_code"]

class InvoiceView(viewsets.ModelViewSet):
    serializer_class = InvoicetSerializer
    queryset = Invoice.objects.all()
    pagination_class = InvoicePagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = InvoiceFilter
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
    pagination_class = InvoicePagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = InvoiceItemFilter
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