from django.urls import path
from . import views

app_name = "course"
urlpatterns = [
    path("", views.course_intro, name="course_intro"),
    path(
        "lesson/<slug:slug>/", views.lesson_detail, name="lesson_detail"
    ),  # Add this line
]
