from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from loggma import views

router = routers.DefaultRouter()
router.register(r'customers', views.CustomerView, 'customer')

urlpatterns = [
    path('loggma/', include('loggma.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', admin.site.urls),
]