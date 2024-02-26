from django.urls import path
from . import views

app_name = "course"
urlpatterns = [
    path("", views.category_list, name="category_list"),
    path("<slug:category_slug>/", views.category_detail, name="category_detail"),
    path(
        "<slug:category_slug>/<slug:lesson_slug>/",
        views.lesson_detail,
        name="lesson_detail",
    ),
]
