from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class Lesson(models.Model):
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    video = models.FileField(upload_to="lesson_videos/", blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Lesson, self).save(*args, **kwargs)

    def get_video_url(self):
        if self.video:
            return self.video.url
        return None
