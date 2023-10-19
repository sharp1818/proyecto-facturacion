from django.db import models

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