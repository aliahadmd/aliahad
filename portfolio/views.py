from django.shortcuts import render

from .models import Portfolio


# Create your views here.


# Cache the blog_detail view for 2 minutes (7200 seconds)


def portfolio_list(request):
    portfolios = Portfolio.objects.all()
    return render(request, "portfolio/portfolio_list.html", {"portfolios": portfolios})
