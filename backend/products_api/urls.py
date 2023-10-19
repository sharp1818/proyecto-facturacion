from django.urls import include, path
from rest_framework import routers
from products_api import views

router_product = routers.DefaultRouter()
router_product.register(r"product", views.ProductView, "product")

router_family_product = routers.DefaultRouter()
router_family_product.register(r"product_family", views.ProductFamilyView, "product_family")

urlpatterns = [
    path("product/v1/", include(router_product.urls)),
    path("product_family/v1/", include(router_family_product.urls)),
]