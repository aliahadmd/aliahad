from django.shortcuts import render, get_object_or_404

from .models import Home

# Create your views here.



def home(request):
    home = get_object_or_404(Home)
    return render(request, "home.html", {"home": home})
