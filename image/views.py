from django.shortcuts import redirect, render
from .forms import imageForm
from .models import Image


def index(request):
    return render(request, "index.html")


def upload_image(request):
    if request.method == "POST":
        form = imageForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect("image_gallery:view_images")
    else:
        form = imageForm()
    return render(request, "upload_image.html", {"form": form})


def view_images(request):
    images = Image.objects.all()
    return render(request, "view_images.html", {"images": images})
