import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

IMPORTANT_DATA = open(os.path.join(BASE_DIR, 'bezpapierka_pl/important_data.txt')).read().split('\n')

SECRET_KEY = IMPORTANT_DATA[0]

DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'api-testy-bezpapierka-pl.piotr-bartoszewski.com']


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',
    'rest_framework.authtoken',
    'nested_inline',
    'corsheaders',
    'colorfield',
    'django_cleanup',

    'pages',
    'accounts',
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
        # 'ENGINE': 'django.db.backends.sqlite3',
        # 'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': IMPORTANT_DATA[1],
        'USER': IMPORTANT_DATA[2],
        'PASSWORD': IMPORTANT_DATA[3],
        'HOST': IMPORTANT_DATA[4],
        'PORT': IMPORTANT_DATA[5],
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


LANGUAGE_CODE = 'pl'

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

CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://localhost",
    'http://testy-bezpapierka-pl.piotr-bartoszewski.com',
]

CORS_ALLOW_CREDENTIALS = True

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = IMPORTANT_DATA[6]
EMAIL_USE_TLS = bool(IMPORTANT_DATA[7])
EMAIL_PORT = int(IMPORTANT_DATA[8])
EMAIL_HOST_USER = IMPORTANT_DATA[9]
EMAIL_HOST_PASSWORD = IMPORTANT_DATA[10]

AUTH_USER_MODEL = 'accounts.User'
