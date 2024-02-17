from django.shortcuts import render, get_object_or_404
from django.views.decorators.cache import cache_page
from .models import Home

# Create your views here.


# Cache the blog_detail view for 2 minutes (7200 seconds)
@cache_page(7200)
def home(request):
    home = get_object_or_404(Home)
    return render(request, "home.html", {"home": home})
