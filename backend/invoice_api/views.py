from rest_framework import viewsets
from .serializers import InvoicetSerializer, InvoiceItemSerializer
from .models import Invoice, InvoiceItem

class InvoiceView(viewsets.ModelViewSet):
    serializer_class = InvoicetSerializer
    queryset = Invoice.objects.all()

class InvoiceItemView(viewsets.ModelViewSet):
    serializer_class = InvoiceItemSerializer
    queryset = InvoiceItem.objects.all()