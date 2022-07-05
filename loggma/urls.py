from django.urls import path

from . import views

urlpatterns = [
    path('customers/<int:pk>/', views.customer_detail),
    path('customers/', views.customer_list),
]