from django.db import models
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from products_api.models import Product

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
    product_code = models.CharField(max_length=20)
    product_name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.DecimalField(max_digits=5, decimal_places=2, default=1)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True)

    def __str__(self):
        return self.product_name
    
@receiver(post_save, sender=InvoiceItem)
@receiver(post_delete, sender=InvoiceItem)
def update_invoice_totals(sender, instance, **kwargs):
    # Obtén la factura a la que pertenece el elemento
    invoice = instance.invoice

    # Calcula los totales para esa factura
    subtotal = sum(item.subtotal for item in invoice.items.all())
    igv = subtotal * (invoice.igv_percentage / 100)
    total = subtotal + igv

    # Actualiza los campos de la factura
    invoice.subtotal = subtotal
    invoice.igv = igv
    invoice.total = total
    invoice.save()
    
@receiver(post_save, sender=InvoiceItem)
def decrease_product_stock(sender, instance, created, **kwargs):
    if created:
        product = Product.objects.get(code=instance.product_code)
        product.stock -= instance.quantity
        product.save()

@receiver(post_delete, sender=InvoiceItem)
def increase_product_stock(sender, instance, **kwargs):
    product = Product.objects.get(code=instance.product_code)
    product.stock += instance.quantity
    product.save()