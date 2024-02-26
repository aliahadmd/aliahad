from django.contrib import admin
from .models import Lesson, Category
from django_summernote.admin import SummernoteModelAdmin


# Define SummernoteModelAdmin for Lesson and Category separately
class LessonAdmin(SummernoteModelAdmin):
    summernote_fields = ("description",)
    list_display = ("title", "author", "created_at")
    search_fields = ("title", "description")
    list_filter = ("author", "created_at")
    prepopulated_fields = {"slug": ("title",)}


class CategoryAdmin(SummernoteModelAdmin):
    summernote_fields = ("description",)
    list_display = ("name", "slug", "updated_at")
    prepopulated_fields = {"slug": ("name",)}
    


# Register Lesson and Category models with their respective admins
admin.site.register(Lesson, LessonAdmin)
admin.site.register(Category, CategoryAdmin)
