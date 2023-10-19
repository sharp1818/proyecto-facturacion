from django.db import models

class Invoice(models.Model):
    id = models.AutoField(primary_key=True)
    invoice_number = models.CharField(max_length=20, unique=True)
    client_ruc = models.CharField(max_length=15)
    client_name = models.CharField(max_length=100)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)
    igv_percentage = models.DecimalField(max_digits=5, decimal_places=2)
    igv = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2, blank=True)

class InvoiceItem(models.Model):
    id = models.AutoField(primary_key=True)
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='items')
    product_code = models.CharField(max_length=20, unique=True)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.DecimalField(max_digits=5, decimal_places=2, default=1)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True)
