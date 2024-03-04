from django.urls import path
from . import views


app_name = "auth"
urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("register/", views.register_view, name="register"),
    path("logout/", views.logout_view, name="logout"),
    path("profile/", views.profile_view, name="profile"),
    path(
        "email-verification-sent/",
        views.email_verification_sent_view,
        name="email_verification_sent",
    ),
    path(
        "email-verification/<uidb64>/<token>/",
        views.email_verification_view,
        name="email_verification",
    ),
]
