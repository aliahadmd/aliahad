from django.shortcuts import render
from django.views.decorators.cache import cache_page

# Create your views here.


# Cache the blog_detail view for 2 minutes (7200 seconds)
@cache_page(7200)
def home(request):
    return render(request, "home.html")
