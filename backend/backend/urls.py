from rest_framework.documentation import include_docs_urls
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('auth_api.urls')),
    path('api/', include('products_api.urls')),
    path('api/', include('invoice_api.urls')),
    path('docs/', include_docs_urls(title='CITIKOLD API')),
]
