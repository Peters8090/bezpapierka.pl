import os

from . import important_data

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

SECRET_KEY = important_data.SECRET_KEY

DEBUG = False

ALLOWED_HOSTS = important_data.ALLOWED_HOSTS


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework.apps.RestFrameworkConfig',
    'rest_framework.authtoken',
    'nested_inline',
    'corsheaders',
    'colorfield',
    'django_cleanup.apps.CleanupConfig',

    'pages.apps.PagesConfig',
    'accounts.apps.AccountsConfig',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',

    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'bezpapierka_pl.middleware.LocaleMiddleware',
]

ROOT_URLCONF = 'bezpapierka_pl.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'bezpapierka_pl.wsgi.application'


DATABASES = {
    'default': {
        'ENGINE': important_data.DATABASE_ENGINE,
        'NAME': important_data.DATABASE_NAME,
        'USER': important_data.DATABASE_USER,
        'PASSWORD': important_data.DATABASE_PASSWORD,
        'HOST': important_data.DATABASE_HOST,
        'PORT': important_data.DATABASE_PORT,
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

TIME_ZONE = 'Europe/Warsaw'

USE_I18N = True

USE_L10N = True

USE_TZ = True


STATIC_URL = '/static/'

STATIC_ROOT = os.path.join(BASE_DIR, "public/static/")

MEDIA_URL = '/media/'

MEDIA_ROOT = os.path.join(BASE_DIR, "public/media/")

REST_FRAMEWORK = {
    # Use Django's standard `django.contrib.auth` permissions,
    # or allow read-only access for unauthenticated users.
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly'
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
}

CORS_ORIGIN_WHITELIST = important_data.CORS_ORIGIN_WHITELIST

CORS_ALLOW_CREDENTIALS = True

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = important_data.EMAIL_HOST
EMAIL_USE_TLS = important_data.EMAIL_USE_TLS
EMAIL_PORT = important_data.EMAIL_PORT
EMAIL_HOST_USER = important_data.EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = important_data.EMAIL_HOST_PASSWORD

AUTH_USER_MODEL = 'accounts.User'