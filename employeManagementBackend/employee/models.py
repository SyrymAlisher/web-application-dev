from django.db import models

class department(models.Model):
    name = models.CharField(max_length=100)
    location = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class role(models.Model):
    r_name = models.CharField(max_length=100)

    def __str__(self):
        return self.r_name


class employe(models.Model):
    fname = models.CharField(max_length=100)
    lname = models.CharField(max_length=100)
    salary = models.PositiveIntegerField()
    bonus = models.PositiveIntegerField()
    dept = models.ForeignKey(department, on_delete=models.CASCADE)
    phone = models.IntegerField()
    role = models.ForeignKey(role, on_delete=models.CASCADE)
    hired_date = models.DateField()
