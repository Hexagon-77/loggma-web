from django.urls import path

from . import views

urlpatterns = [
    path('customers/', views.customer_list),
    path('customers/<int:pk>/', views.customer_detail),
    path('', views.CustomerView.as_view({'get': 'list', 'put': 'update', 'delete': 'destroy'}), name='customers'),
]