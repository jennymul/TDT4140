from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from api.models import Destination
import os


class Signup(APIView):
    permission_classes = [AllowAny]

    def post(self, request: Request):
        try:
            username = request.data["username"]
            email = request.data["email"]
            password = request.data["password"]
            first_name = request.data["first_name"]
            last_name = request.data["last_name"]

            User.objects.create_user(
                username, email, password, first_name=first_name, last_name=last_name
            ).save()
        except:
            return Response({"error": "Could not make user"}, status=400)
        return Response(status=201)


class UserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        user: User = request.user
        return Response(
            {
                "email": user.email,
                "username": user.username,
                "is_superuser": user.is_superuser,
                "first_name": user.first_name,
                "last_name": user.last_name,
            }
        )


class DestinationInfo(APIView):

    def get(self, request: Request, destination=None):
        if destination is None:
            return self.get_all_destinations()
        else:
            return self.get_destination(destination)

    def post(self, request: Request):
        try:
            name = request.data["name"]
            info = request.data["info"]
            country = request.data["country"]
            destination = Destination(name=name, info=info, country=country)
            destination.save()
            return Response(
                {
                    "id": destination.destination_id,
                    "name": destination.name,
                    "info": destination.info,
                    "country": destination.country,
                }
            )
        except Exception as e:
            return Response({"error": "Could not create destination"}, status=400)

    def get_all_destinations(self):
        destinations = Destination.objects.all()
        return Response(
            [
                {
                    "id": destination.destination_id,
                    "name": destination.name,
                    "info": destination.info,
                    "country": destination.country,
                }
                for destination in destinations
            ]
        )

    def get_destination(self, destination):
        try: 
            destination = Destination.objects.get(destination_id=destination)
        except Destination.DoesNotExist:
            return Response({"error": f"destiation with id {destination} does not exist"}, status=404)
        return Response(
            {
                "id": destination.destination_id,
                "name": destination.name,
                "info": destination.info,
                "country": destination.country,
            },
            status=200
        )

class DestinationImage(APIView):
    def post(self, request: Request, destination):
        if not os.path.exists("frontend/components/Assets/destination"):
            os.mkdir("frontend/components/Assets/destination")

        # quite hacky but its an easy way to get this working fast.
        with open(f"frontend/components/Assets/destination/{destination}.jpg", "wb") as f:
            f.write(request.FILES["image"].file.read())
        return Response({"upload": "yes"}, status=201) 