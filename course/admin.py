# admin.py

from django.contrib import admin
from .models import Lesson



@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'created_at')
    search_fields = ('title', 'description')
    list_filter = ('author', 'created_at')
    prepopulated_fields = {'slug': ('title',)}
