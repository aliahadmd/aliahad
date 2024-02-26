from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm


def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect("home")
    else:
        form = AuthenticationForm()
    if request.user.is_authenticated:
        return redirect("home")
    return render(request, "auth/login.html", {"form": form})


def register_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("auth:login")
    else:
        form = UserCreationForm()
    if request.user.is_authenticated:
        return redirect("home")
    return render(request, "auth/register.html", {"form": form})


def logout_view(request):
    logout(request)
    return redirect("home")


@login_required
def profile_view(request):
    return render(request, "auth/profile.html")
