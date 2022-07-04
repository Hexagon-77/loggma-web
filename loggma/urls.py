from django.urls import path

from . import views

urlpatterns = [
    path('', views.CustomerView.as_view({'get': 'list'}), name='customers'),
    path('customers/', views.customer_list),
    path('customers/<int:pk>/', views.customer_detail),
]