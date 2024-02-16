from django.contrib import admin
from blog.models import Blog
from django_summernote.admin import SummernoteModelAdmin


# Register your models here.
class PostAdmin(SummernoteModelAdmin):
    summernote_fields = ("content",)


admin.site.register(Blog, PostAdmin)
