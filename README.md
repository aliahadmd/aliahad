# important

when deploy to github then remove or comments psycopg2 and use psycopg2-binary

# css

https://andybrewer.github.io/mvp/


# server

`pm2 start ecosystem.config.js`
`pm2 restart ecosystem.config.js`
`pm2 stop ecosystem.config.js`
`pm2 status`




















[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fimages%2Ftree%2Fmain%2Fpython%2Fdjango&demo-title=Django%20%2B%20Vercel&demo-description=Use%20Django%204%20on%20Vercel%20with%20Serverless%20Functions%20using%20the%20Python%20Runtime.&demo-url=https%3A%2F%2Fdjango-template.vercel.app%2F&demo-image=https://assets.vercel.com/image/upload/v1669994241/random/django.png)

# Django + Vercel

This image shows how to use Django 4 on Vercel with Serverless Functions using the [Python Runtime](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python).

## Demo

https://django-template.vercel.app/

## How it Works

Our Django application, `image` is configured as an installed application in `core/settings.py`:

```python
# core/settings.py
INSTALLED_APPS = [
    # ...
    'image',
]
```

We allow "\*.vercel.app" subdomains in `ALLOWED_HOSTS`, in addition to 127.0.0.1:

```python
# core/settings.py
ALLOWED_HOSTS = ['127.0.0.1', '.vercel.app']
```

The `wsgi` module must use a public variable named `app` to expose the WSGI application:

```python
# core/wsgi.py
app = get_wsgi_application()
```

The corresponding `WSGI_APPLICATION` setting is configured to use the `app` variable from the `core.wsgi` module:

```python
# core/settings.py
WSGI_APPLICATION = 'core.wsgi.app'
```

There is a single view which renders the current time in `image/views.py`:

```python
# image/views.py
from datetime import datetime

from django.http import HttpResponse


def index(request):
    now = datetime.now()
    html = f'''
    <html>
        <body>
            <h1>Hello from Vercel!</h1>
            <p>The current time is { now }.</p>
        </body>
    </html>
    '''
    return HttpResponse(html)
```

This view is exposed a URL through `image/urls.py`:

```python
# image/urls.py
from django.urls import path

from image.views import index


urlpatterns = [
    path('', index),
]
```

Finally, it's made accessible to the Django server inside `core/urls.py`:

```python
# core/urls.py
from django.urls import path, include

urlpatterns = [
    ...
    path('', include('image.urls')),
]
```

This image uses the Web Server Gateway Interface (WSGI) with Django to enable handling requests on Vercel with Serverless Functions.

## Running Locally

```bash
python manage.py runserver
```

Your Django application is now available at `http://localhost:8000`.

## One-Click Deploy

Deploy the image using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-images):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fimages%2Ftree%2Fmain%2Fpython%2Fdjango&demo-title=Django%20%2B%20Vercel&demo-description=Use%20Django%204%20on%20Vercel%20with%20Serverless%20Functions%20using%20the%20Python%20Runtime.&demo-url=https%3A%2F%2Fdjango-template.vercel.app%2F&demo-image=https://assets.vercel.com/image/upload/v1669994241/random/django.png)
