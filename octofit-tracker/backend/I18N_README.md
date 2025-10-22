# OctoFit Tracker Backend i18n Implementation

This document describes the internationalization (i18n) implementation for the OctoFit Tracker backend API.

## Features

### Supported Languages
- English (en) - Default
- Spanish (es)
- French (fr) 
- German (de)
- Chinese (zh)

### Language Preference Storage
User language preferences are stored in the `language_preference` field in the User model, which is persisted in MongoDB.

## API Endpoints

### Global Language Switching
**POST** `/api/set-language/`

Sets the language for the current session.

**Request Body:**
```json
{
  "language": "es"
}
```

**Response:**
```json
{
  "message": "Language set successfully",
  "language": "es"
}
```

### User-Specific Language Preference
**POST** `/api/users/{user_id}/set_language/`

Sets and saves the language preference for a specific user.

**Request Body:**
```json
{
  "language": "fr"
}
```

**Response:**
```json
{
  "message": "Language preference updated successfully",
  "user_id": "507f1f77bcf86cd799439011",
  "language": "fr"
}
```

## Database Configuration

### MongoDB Integration
The application uses djongo to connect Django ORM with MongoDB. Language preferences are stored in the `users` collection.

**Environment Variables:**
- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017)
- `MONGODB_USERNAME` - MongoDB username
- `MONGODB_PASSWORD` - MongoDB password
- `MONGODB_AUTH_SOURCE` - Authentication database (default: admin)

### Fallback to SQLite
If MongoDB is not available, the application automatically falls back to SQLite for development purposes.

## Django Configuration

### Middleware
The application includes `LocaleMiddleware` for automatic language detection and switching:

```python
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',  # i18n middleware
    # ... other middleware
]
```

### Internationalization Settings
```python
USE_I18N = True
USE_L10N = True

LANGUAGES = [
    ('en', 'English'),
    ('es', 'Español'),
    ('fr', 'Français'),
    ('de', 'Deutsch'),
    ('zh', '中文'),
]

LOCALE_PATHS = [
    BASE_DIR / 'locale',
]
```

## Translation Files

Translation files are located in the `locale/` directory:
- `locale/es/LC_MESSAGES/django.po` - Spanish translations
- `locale/fr/LC_MESSAGES/django.po` - French translations
- `locale/de/LC_MESSAGES/django.po` - German translations (to be created)
- `locale/zh/LC_MESSAGES/django.po` - Chinese translations (to be created)

### Compiling Translations
To compile translation files (when Django is available):
```bash
python manage.py compilemessages
```

### Creating New Translations
To create translation files for new languages:
```bash
python manage.py makemessages -l de
python manage.py makemessages -l zh
```

## Management Commands

### Set Default Language for Existing Users
```bash
python manage.py set_default_language --language en
```

This command sets a default language preference for users who don't have one set.

## Error Handling

The API provides proper error responses for invalid requests:

- **400 Bad Request** - Missing or invalid language parameter
- **404 Not Found** - User not found (for user-specific endpoints)
- **500 Internal Server Error** - General server errors (logged but not exposed)

## Security

- Stack trace information is not exposed to external users
- Error details are logged server-side for debugging
- Input validation ensures only supported languages are accepted

## Testing

Comprehensive test coverage includes:
- Model tests for language preference field
- API endpoint tests for both global and user-specific language switching
- Validation tests for error handling
- Middleware configuration tests

Run tests with:
```bash
python manage.py test
```

## Usage Examples

### Setting Global Language
```bash
curl -X POST http://localhost:8000/api/set-language/ \
  -H "Content-Type: application/json" \
  -d '{"language": "es"}'
```

### Setting User Language Preference
```bash
curl -X POST http://localhost:8000/api/users/1/set_language/ \
  -H "Content-Type: application/json" \
  -d '{"language": "fr"}'
```

### Getting User with Language Preference
```bash
curl http://localhost:8000/api/users/1/
```

Response includes:
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "team": "Marvel",
  "language_preference": "fr"
}
```