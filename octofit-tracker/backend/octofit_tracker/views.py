from rest_framework import viewsets
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.utils import translation
from django.utils.translation import gettext as _
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @action(detail=True, methods=['patch'])
    def set_language(self, request, pk=None):
        user = self.get_object()
        language = request.data.get('language')
        
        if language in ['en', 'de']:
            user.language_preference = language
            user.save()
            # Activate the language for this request
            translation.activate(language)
            return Response({
                'message': _('Language preference updated successfully'),
                'language': language
            })
        return Response({'error': _('Invalid language code')}, status=400)

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class ActivityViewSet(viewsets.ModelViewSet):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer

class LeaderboardViewSet(viewsets.ModelViewSet):
    queryset = Leaderboard.objects.all()
    serializer_class = LeaderboardSerializer

class WorkoutViewSet(viewsets.ModelViewSet):
    queryset = Workout.objects.all()
    serializer_class = WorkoutSerializer

@api_view(['POST'])
def set_language(request):
    """Global language switching endpoint"""
    language = request.data.get('language')
    if language in ['en', 'de']:
        translation.activate(language)
        request.session[translation.LANGUAGE_SESSION_KEY] = language
        return Response({
            'message': _('Language switched successfully'),
            'language': language
        })
    return Response({'error': _('Invalid language code')}, status=400)
