from urllib import request
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.parsers import JSONParser
from rest_framework import viewsets
from .serializers import CustomerSerializer
from .models import Customer

# Create your views here.

class CustomerView(viewsets.ModelViewSet):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.all()

@require_http_methods(["GET", "POST"])
@csrf_exempt
def customer_list(request):
    """
        List all customers, or create a new customer.
    """
    
    if request.method == 'GET':
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many = True)
        return JsonResponse(serializer.data, safe = False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status = 201)
        return JsonResponse(serializer.errors, status = 400)

@require_http_methods(["GET", "PUT", "DELETE"])
@csrf_exempt
def customer_detail(request, pk):
    """
        Retrieve, update or delete a customer.
    """

    try:
        customer = Customer.objects.get(pk = pk)
    except Customer.DoesNotExist:
        return HttpResponse(status = 404)
    
    if request.method == 'GET':
        serializer = CustomerSerializer(customer)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = CustomerSerializer(customer, data = data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status = 400)

    elif request.method == 'DELETE':
        print('Customer Delete')
        customer.delete()
        return HttpResponse(status = 204)
