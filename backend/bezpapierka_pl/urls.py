from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.i18n import JSONCatalog

urlpatterns = [
    # django built in
    path('admin/', admin.site.urls),

    # project specific
    path('pages/', include('pages.urls')),
    path('accounts/', include('accounts.urls')),

    # localization
    path('i18n/django/', JSONCatalog.as_view(domain='django')),
    path('i18n/djangojs/', JSONCatalog.as_view(domain='djangojs')),

    # rest framework specific
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
