from django.contrib import admin
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from api.views import Signup, UserInfo, DestinationInfo, DestinationImage

urlpatterns = [
    path("admin/", admin.site.urls),
    path("login/", obtain_auth_token),
    path("signup/", Signup.as_view()),
    path("userinfo/", UserInfo.as_view()),
    path("destination/<destination>", DestinationInfo.as_view()),
    path("destination/", DestinationInfo.as_view()),
    path("destination/<destination>/image", DestinationImage.as_view()),
]
