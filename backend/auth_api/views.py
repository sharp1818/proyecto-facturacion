from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from .models import FailedLoginAttempt
from django.db.models import F

class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)
      
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        email = data.get('email')
        password = data.get('password')

        if not validate_email(data) or not validate_password(data):
            return Response({"detail": "Email or password is invalid."}, status=status.HTTP_400_BAD_REQUEST)

        user = get_user_model().objects.filter(email=email).first()

        if user:
            failed_attempts, created = FailedLoginAttempt.objects.get_or_create(user=user)

            if failed_attempts.attempts >= 3:
                return Response({"detail": "Account locked due to multiple failed attempts."}, status=status.HTTP_400_BAD_REQUEST)

            if user.check_password(password):
                login(request, user)
                # Si el inicio de sesión es exitoso, restablece los intentos fallidos
                failed_attempts.attempts = 0
                failed_attempts.save()
                return Response({"detail": "Login successful.", "email": user.email}, status=status.HTTP_200_OK)
            else:
                # Contraseña incorrecta, aumentar el contador de intentos fallidos
                failed_attempts.attempts = F('attempts') + 1
                failed_attempts.save()

                if failed_attempts.attempts >= 3:
                    # Bloquear al usuario si se superan los 3 intentos fallidos
                    user.is_active = False
                    user.save()
                    return Response({"detail": "Account locked due to multiple failed attempts."}, status=status.HTTP_400_BAD_REQUEST)

                return Response({"detail": "Incorrect password."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)

class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = ()
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	##
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)

