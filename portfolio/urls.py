from django.urls import path
from .views import portfolio_list

app_name = "portfolio"

urlpatterns = [
    path("", portfolio_list, name="portfolio_list"),
]
