from django.shortcuts import render, get_object_or_404


from .models import Lesson


def course_intro(request):
    lesson_list = Lesson.objects.all()
    return render(request, "course/course_intro.html", {"lesson_list": lesson_list})


def lesson_view(request):
    lesson_list = Lesson.objects.all()

    return render(request, "course/base_lesson.html", {"lesson_list": lesson_list})


def lesson_detail(request, slug):
    lesson = get_object_or_404(Lesson, slug=slug)
    lesson_list = Lesson.objects.all()  # Retrieve the lesson list
    video_url = lesson.get_video_url()  # Get the video URL
    return render(
        request,
        "course/lesson_detail.html",
        {"lesson": lesson, "lesson_list": lesson_list, "video_url": video_url},
    )
