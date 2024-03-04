from django.shortcuts import render, get_object_or_404

from .models import Home
from django.views.decorators.cache import cache_page

# Create your views here.


@cache_page(7200)
def home(request):
    home = get_object_or_404(Home)
    return render(request, "home.html", {"home": home})
