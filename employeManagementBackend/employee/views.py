from django.shortcuts import redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import department, role, employe

import json

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_departments(request):
    print("Is authenticated:", request.user.is_authenticated)

    if request.method == 'GET':
        departments = department.objects.all().values()
        department_list = list(departments)
        return JsonResponse(department_list, safe=False)
    else:
        return JsonResponse({'error': 'GET request required.'}, status=400)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_roles(request):
    if request.method == 'GET':
        roles = role.objects.all().values()
        role_list = list(roles)
        return JsonResponse(role_list, safe=False)
    else:
        return JsonResponse({'error': 'GET request required.'}, status=400)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_employees_by_department(request, dept_id):
    if request.method == 'GET':
        employees = employe.objects.filter(dept_id=dept_id).values()
        employee_list = list(employees)
        return JsonResponse(employee_list, safe=False)
    else:
        return JsonResponse({'error': 'GET request required.'}, status=400)


@csrf_exempt  # Disable CSRF for simplicity; handle appropriately for production
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
            if User.objects.filter(username=username).exists():
                return JsonResponse({'error': 'Username already exists'}, status=400)
            user = User.objects.create_user(username=username, email=email, password=password)
            return JsonResponse({'message': 'User created successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful'}, status=200)
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=401)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

@csrf_exempt  # Disable CSRF for simplicity; handle appropriately for production
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out successfully'}, status=200)
    # else:
    #     return JsonResponse({'error': 'POST request required'}, status=405)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@csrf_exempt  # Consider using CSRF protection for production
def adddepartment(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            name = data.get('name')
            location = data.get('location')
            if name and location:  # Basic validation
                department.objects.create(name=name, location=location)
                return JsonResponse({'message': 'Department added successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Invalid data'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addemploye(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print("Received data:", data)  # Debugging line

            # Extracting data
            fname = data.get('fname')
            lname = data.get('lname')
            salary = data.get('salary')
            bonus = data.get('bonus')
            dept_id = data.get('dept')
            phone = data.get('phone')
            role_id = data.get('role')
            hired_date = data.get('hired_date')

            # Validating data
            if all([fname, lname, salary, bonus, dept_id, phone, role_id, hired_date]):
                print("Fetching department and role")  # Debugging line
                dept = department.objects.get(dept_id=dept_id)
                role_obj = role.objects.get(role_id=role_id)

                employe.objects.create(
                    fname=fname, lname=lname, salary=salary, bonus=bonus,
                    dept=dept, phone=phone, role=role_obj, hired_date=hired_date
                )
                return JsonResponse({'message': 'Employee added successfully'}, status=201)
            else:
                print("Invalid data")  # Debugging line
                return JsonResponse({'error': 'Invalid data'}, status=400)

        except (json.JSONDecodeError, department.DoesNotExist, role.DoesNotExist):
            print("Exception caught")  # Debugging line
            return JsonResponse({'error': 'Invalid data or references'}, status=400)
    else:
        return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

@csrf_exempt  # Disable CSRF temporarily, consider using CSRF tokens for security
def addrole(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            role_name = data.get('r_name')
            if role_name:
                new_role = role(r_name=role_name)
                new_role.save()
                return JsonResponse({'message': 'Role added successfully'}, status=201)
            else:
                return JsonResponse({'error': 'Missing role name'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ddetails(request):
    departments = department.objects.all()
    data = list(departments.values())  # Convert queryset to list of dictionaries
    return JsonResponse({'data': data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rdetails(request):
    roles = role.objects.all()
    data = list(roles.values())  # Convert queryset to list of dictionaries
    return JsonResponse({'data': data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def edetails(request):
    employees = employe.objects.all()
    data = list(employees.values())  # Convert queryset to list of dictionaries
    return JsonResponse({'data': data})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def ddelete(request, did):
    if request.method == 'DELETE':
        try:
            department.objects.get(id=did).delete()
            return JsonResponse({'message': 'Department deleted successfully'}, status=200)
        except department.DoesNotExist:
            return JsonResponse({'error': 'Department not found'}, status=404)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)


@csrf_exempt  # Disable CSRF temporarily, consider using CSRF tokens for security
def dedit(request, did):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            department_obj = department.objects.get(id=did)
            department_obj.name = data.get('name', department_obj.name)
            department_obj.location = data.get('location', department_obj.location)
            department_obj.save()
            return JsonResponse({'message': 'Department updated successfully'}, status=200)
        except department.DoesNotExist:
            return JsonResponse({'error': 'Department not found'}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
    