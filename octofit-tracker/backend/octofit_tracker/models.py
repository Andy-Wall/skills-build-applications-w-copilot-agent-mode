from djongo import models

class User(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('de', 'German'),
    ]
    
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    team = models.CharField(max_length=50)
    language_preference = models.CharField(
        max_length=2,
        choices=LANGUAGE_CHOICES,
        default='en'
    )
    class Meta:
        db_table = 'users'

class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        db_table = 'teams'

class Activity(models.Model):
    user = models.CharField(max_length=100)
    activity_type = models.CharField(max_length=50)
    duration = models.IntegerField()
    class Meta:
        db_table = 'activities'

class Leaderboard(models.Model):
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        db_table = 'leaderboard'

class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    class Meta:
        db_table = 'workouts'
