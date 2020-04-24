from rest_framework import routers

from . import views

router = routers.DefaultRouter(trailing_slash=False)
router.register('homepage', views.HomePageViewSet, 'homepage')

urlpatterns = router.urls
