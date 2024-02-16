from django.shortcuts import render
from django.views.decorators.cache import cache_page


# Create your views here.


@cache_page(7200)
def home(request):
    return render(request, "home.html")
