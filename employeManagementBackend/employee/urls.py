from django.urls import path
from .import views
from django.urls import path

urlpatterns = [
    path('departments/', views.get_all_departments, name='get_all_departments'),
    path('roles/', views.get_all_roles, name='get_all_roles'),
    path('employees/department/<int:dept_id>/', views.get_employees_by_department, name='get_employees_by_department'),

    path('signup/',views.signup, name='signup'),
    path('login/',views.login_view, name='login'),
    path('logout/',views.logout_view, name='logout'),
    path('adddepartment/',views.adddepartment,name='adddepartment'),
    path('addrole/',views.addrole,name='addrole'),
    path('addemploye/',views.addemploye,name='addemploye'),
    path('ddelete/<int:did>/',views.ddelete,name='ddelete'),
    path('dedit/<int:did>/',views.dedit,name='dedit'),
]
