from rest_framework import viewsets, status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.utils import translation
from .models import User, Team, Activity, Leaderboard, Workout
from .serializers import UserSerializer, TeamSerializer, ActivitySerializer, LeaderboardSerializer, WorkoutSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=['post'])
    def set_language(self, request, pk=None):
        """Set language preference for a specific user"""
        try:
            user = self.get_object()
            language = request.data.get('language')
            
            if not language:
                return Response(
                    {'error': 'Language parameter is required'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Validate language choice
            valid_languages = ['en', 'es', 'fr', 'de', 'zh']
            if language not in valid_languages:
                return Response(
                    {'error': f'Invalid language. Valid choices are: {valid_languages}'}, 
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            user.language_preference = language
            user.save()
            
            # Activate the language for this session
            translation.activate(language)
            
            return Response({
                'message': 'Language preference updated successfully',
                'user_id': str(user.id) if hasattr(user, 'id') else user.pk,
                'language': language
            })
            
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@api_view(['POST'])
def set_language(request):
    """Global language switching endpoint"""
    language = request.data.get('language')
    
    if not language:
        return Response(
            {'error': 'Language parameter is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Validate language choice
    valid_languages = ['en', 'es', 'fr', 'de', 'zh']
    if language not in valid_languages:
        return Response(
            {'error': f'Invalid language. Valid choices are: {valid_languages}'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Activate the language for this session
    translation.activate(language)
    
    # Store in session
    request.session['django_language'] = language
    
    return Response({
        'message': 'Language set successfully',
        'language': language
    })

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
