from django.db import models


class Home(models.Model):
    title = models.CharField(max_length=200, blank=True)
    content = models.TextField(blank=True)

    def __str__(self):
        return self.title
