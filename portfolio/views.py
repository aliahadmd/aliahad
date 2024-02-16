from django.shortcuts import render
from django.views.decorators.cache import cache_page
from .models import Portfolio

# Create your views here.


# Cache the blog_detail view for 2 minutes (7200 seconds)
@cache_page(7200)
def portfolio_list(request):
    portfolios = Portfolio.objects.all()
    return render(request, "portfolio/portfolio_list.html", {"portfolios": portfolios})
