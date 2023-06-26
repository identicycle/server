from django.urls import path
from . import views

urlpatterns = [
    path("<int:id>", views.index, name="index"),
    path("", views.getData),
    path("create/", views.create, name="create"),
    
]
