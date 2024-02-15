from django import forms
from .models import Image
from cloudinary.forms import CloudinaryFileField


class ImageForm(forms.ModelForm):
    image = CloudinaryFileField()

    class Meta:
        model = Image
        fields = "__all__"

        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self.fields["image"].options = {"tags": "new_image", "format": "png"}
