from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

class ProductFamily(models.Model):
    family_id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    creation_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    code = models.CharField(max_length=15, unique=True)
    name = models.CharField(max_length=255)
    family = models.ForeignKey(ProductFamily, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField()
    is_active = models.BooleanField(default=True)
    creation_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
@receiver(post_save, sender=ProductFamily)
def update_related_products(sender, instance, **kwargs):
    if not instance.is_active:
        Product.objects.filter(family=instance).update(is_active=False)
    else:
        Product.objects.filter(family=instance).update(is_active=True)