from django.db import models
from django.urls import reverse
from django.utils.text import slugify


class Blog(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    content = models.TextField()

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("blog_detail", args=[str(self.slug)])

    def save(self, *args, **kwargs):
        # Generate slug from title if slug is not provided
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
