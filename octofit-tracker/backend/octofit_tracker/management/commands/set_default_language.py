from django.core.management.base import BaseCommand
from django.db import models
from octofit_tracker.models import User

class Command(BaseCommand):
    help = 'Set default language preference for existing users who do not have one set'

    def add_arguments(self, parser):
        parser.add_argument(
            '--language', 
            type=str, 
            default='en',
            help='Default language to set for users without a language preference'
        )

    def handle(self, *args, **options):
        default_language = options['language']
        
        # Validate language choice
        valid_languages = ['en', 'es', 'fr', 'de', 'zh']
        if default_language not in valid_languages:
            self.stdout.write(
                self.style.ERROR(f'Invalid language. Valid choices are: {valid_languages}')
            )
            return
        
        # Find users without language preference or with empty language preference
        users_to_update = User.objects.filter(
            models.Q(language_preference__isnull=True) | 
            models.Q(language_preference='')
        )
        
        if not users_to_update.exists():
            self.stdout.write(
                self.style.SUCCESS('All users already have language preferences set.')
            )
            return
        
        # Update users
        updated_count = users_to_update.update(language_preference=default_language)
        
        self.stdout.write(
            self.style.SUCCESS(
                f'Successfully set language preference to "{default_language}" '
                f'for {updated_count} user(s).'
            )
        )