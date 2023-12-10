from django.contrib import admin
from . models import department,role,employe
# Register your models here.
@admin.register(department)
class departmentAdmin(admin.ModelAdmin):
    list_display = ['id','name','location']


@admin.register(role)
class roleAdmin(admin.ModelAdmin):
    list_display = ['id','r_name']

@admin.register(employe)
class employeAdmin(admin.ModelAdmin):
    list_display = ['id','fname','lname','salary','bonus','dept','phone','role','hired_date','role_id']


