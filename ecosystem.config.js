module.exports = {
    apps : [{
      name: 'django-app',
      script: 'manage.py',
      args: 'runserver',
      interpreter: 'python3.12',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      cwd: '/home/ali/app/djportfolio/staticfiles/',
      env: {
        PORT: 8000,
        DJANGO_SETTINGS_MODULE: 'core.settings'
      }
    }]
  };
  