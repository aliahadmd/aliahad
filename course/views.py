from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required


from .models import Lesson, Category


def category_list(request):
    categories = Category.objects.all()
    return render(request, "course/category_list.html", {"categories": categories})


@login_required
def lesson_view(request):
    lesson_list = Lesson.objects.all()

    return render(request, "course/base_lesson.html", {"lesson_list": lesson_list})


@login_required
def lesson_detail(request, lesson_slug, category_slug):
    lesson = get_object_or_404(Lesson, slug=lesson_slug)
    category = Category.objects.get(slug=category_slug)
    lesson_list = Lesson.objects.all()  # Retrieve the lesson list
    video_url = lesson.get_video_url()  # Get the video URL
    return render(
        request,
        "course/lesson_detail.html",
        {
            "lesson": lesson,
            "category": category,
            "lesson_list": lesson_list,
            "video_url": video_url,
        },
    )


@login_required
def category_detail(request, category_slug):
    category = Category.objects.get(slug=category_slug)
    lessons = Lesson.objects.filter(categories=category)
    return render(
        request,
        "course/category_detail.html",
        {"category": category, "lessons": lessons},
    )
