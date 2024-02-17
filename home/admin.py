from django.contrib import admin
from .models import Home
from django_summernote.admin import SummernoteModelAdmin

# Register your models here.


# Register your models here.
class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ("content",)


admin.site.register(Home, PostAdmin)
