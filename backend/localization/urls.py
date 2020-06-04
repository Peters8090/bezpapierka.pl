from django.urls import path

from . import views

urlpatterns = [
    path('', views.JSONCatalogWithDomainListSupport.as_view(domain=['django', 'djangojs'])),
]
