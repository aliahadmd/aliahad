from django.urls import path
from . import views

app_name = "image_gallery"
urlpatterns = [
    path("", views.index, name="index"),  # Add the name parameter here
    path("upload/", views.upload_image, name="upload_image"),
    path("view/", views.view_images, name="view_images"),
]
