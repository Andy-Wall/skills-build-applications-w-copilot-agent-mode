from django.test import TestCase, Client
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
import json
from .models import User, Team, Activity, Leaderboard, Workout

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create(name='Test', email='test@example.com', team='Marvel')
        self.assertEqual(user.name, 'Test')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.team, 'Marvel')
        # Test default language preference
        self.assertEqual(user.language_preference, 'en')

    def test_create_user_with_language_preference(self):
        user = User.objects.create(
            name='Test Spanish', 
            email='test_es@example.com', 
            team='Marvel',
            language_preference='es'
        )
        self.assertEqual(user.language_preference, 'es')

    def test_user_language_preference_choices(self):
        """Test that language preference accepts valid choices"""
        valid_languages = ['en', 'es', 'fr', 'de', 'zh']
        for lang in valid_languages:
            user = User.objects.create(
                name=f'Test {lang}', 
                email=f'test_{lang}@example.com', 
                team='Marvel',
                language_preference=lang
            )
            self.assertEqual(user.language_preference, lang)

class TeamModelTest(TestCase):
    def test_create_team(self):
        team = Team.objects.create(name='Marvel')
        self.assertEqual(team.name, 'Marvel')

class ActivityModelTest(TestCase):
    def test_create_activity(self):
        activity = Activity.objects.create(user='Test', activity_type='Running', duration=30)
        self.assertEqual(activity.activity_type, 'Running')
        self.assertEqual(activity.duration, 30)

class LeaderboardModelTest(TestCase):
    def test_create_leaderboard(self):
        lb = Leaderboard.objects.create(team='Marvel', points=100)
        self.assertEqual(lb.team, 'Marvel')
        self.assertEqual(lb.points, 100)

class WorkoutModelTest(TestCase):
    def test_create_workout(self):
        workout = Workout.objects.create(name='Super Strength', description='Strength training')
        self.assertEqual(workout.name, 'Super Strength')
        self.assertEqual(workout.description, 'Strength training')

class LanguageAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            name='Test User', 
            email='test@example.com', 
            team='Marvel'
        )
        self.client = Client()

    def test_set_global_language_success(self):
        """Test setting language globally via API"""
        url = reverse('set-language')
        data = {'language': 'es'}
        response = self.client.post(
            url, 
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertEqual(response_data['language'], 'es')
        self.assertIn('message', response_data)

    def test_set_global_language_invalid(self):
        """Test setting invalid language globally"""
        url = reverse('set-language')
        data = {'language': 'invalid'}
        response = self.client.post(
            url, 
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response_data = response.json()
        self.assertIn('error', response_data)

    def test_set_global_language_missing_parameter(self):
        """Test setting language without language parameter"""
        url = reverse('set-language')
        data = {}
        response = self.client.post(
            url, 
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        response_data = response.json()
        self.assertIn('error', response_data)

    def test_set_user_language_preference(self):
        """Test setting language preference for specific user"""
        url = f'/api/users/{self.user.pk}/set_language/'
        data = {'language': 'fr'}
        response = self.client.post(
            url, 
            data=json.dumps(data),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Refresh user from database
        self.user.refresh_from_db()
        self.assertEqual(self.user.language_preference, 'fr')

    def test_user_serializer_includes_language_preference(self):
        """Test that UserSerializer includes language_preference field"""
        url = f'/api/users/{self.user.pk}/'
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        response_data = response.json()
        self.assertIn('language_preference', response_data)
        self.assertEqual(response_data['language_preference'], 'en')  # default

class I18nMiddlewareTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_locale_middleware_installed(self):
        """Test that LocaleMiddleware is properly configured"""
        from django.conf import settings
        self.assertIn('django.middleware.locale.LocaleMiddleware', settings.MIDDLEWARE)

    def test_i18n_context_processor_installed(self):
        """Test that i18n context processor is configured"""
        from django.conf import settings
        template_options = settings.TEMPLATES[0]['OPTIONS']
        context_processors = template_options['context_processors']
        self.assertIn('django.template.context_processors.i18n', context_processors)
