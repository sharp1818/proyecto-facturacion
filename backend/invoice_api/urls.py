from django.urls import include, path
from rest_framework import routers
from invoice_api import views

router_invoice = routers.DefaultRouter()
router_invoice.register(r"invoice", views.InvoiceView, "invoice")

router_invoice_item = routers.DefaultRouter()
router_invoice_item.register(r"invoice_item", views.InvoiceItemView, "invoice_item")

urlpatterns = [
    path("invoice/v1/", include(router_invoice.urls)),
    path("invoice_item/v1/", include(router_invoice_item.urls)),
]