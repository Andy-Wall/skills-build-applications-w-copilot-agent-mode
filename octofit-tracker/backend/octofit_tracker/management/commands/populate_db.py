from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Delete existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        # Create teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Create users
        users = [
            User(name='Spider-Man', email='spiderman@marvel.com', team='Marvel'),
            User(name='Iron Man', email='ironman@marvel.com', team='Marvel'),
            User(name='Wonder Woman', email='wonderwoman@dc.com', team='DC'),
            User(name='Batman', email='batman@dc.com', team='DC'),
        ]
        for user in users:
            user.save()

        # Create activities
        activities = [
            Activity(user='Spider-Man', activity_type='Running', duration=30),
            Activity(user='Iron Man', activity_type='Cycling', duration=45),
            Activity(user='Wonder Woman', activity_type='Swimming', duration=60),
            Activity(user='Batman', activity_type='Yoga', duration=20),
        ]
        for activity in activities:
            activity.save()

        # Create leaderboard
        Leaderboard.objects.create(team='Marvel', points=75)
        Leaderboard.objects.create(team='DC', points=80)

        # Create workouts
        workouts = [
            Workout(name='Super Strength', description='Strength training for superheroes'),
            Workout(name='Agility Boost', description='Agility and flexibility exercises'),
        ]
        for workout in workouts:
            workout.save()

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data'))
