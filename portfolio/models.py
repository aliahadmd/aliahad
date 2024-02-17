from django.db import models

# Create your models here.


class Portfolio(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    link = models.URLField(max_length=200, blank=True)
    github = models.URLField(max_length=200, blank=True)

    def __str__(self):
        return self.name
