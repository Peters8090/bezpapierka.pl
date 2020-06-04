from django.urls import include, path
from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register('configuration', views.ConfigurationViewSet, 'configuration')
router.register('home_page', views.HomePageViewSet, 'home_page')
router.register('offer_page', views.OfferPageViewSet, 'offer_page')
router.register('contact_page', views.ContactPageViewSet, 'contact_page')
router.register('content_page', views.ContentPageViewSet, 'content_page')

urlpatterns = [
    path('', include(router.urls)),
    path('contact_form/', views.contact_form, name='contact_form'),
]