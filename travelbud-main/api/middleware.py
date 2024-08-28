from django import http
from django.conf import settings


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request: http.HttpRequest):
        response = self.get_response(request)
        if (
            request.method == "OPTIONS"
            and "HTTP_ACCESS_CONTROL_REQUEST_METHOD" in request.META
        ):
            response = http.HttpResponse()
            response["Content-Length"] = "0"
            response["Access-Control-Max-Age"] = 86400

        response["Access-Control-Allow-Origin"] = settings.API_CORS_URL
        response["Access-Control-Allow-Credentials"] = "true"
        response["Access-Control-Allow-Methods"] = (
            "DELETE, GET, OPTIONS, PATCH, POST, PUT"
        )
        response["Access-Control-Allow-Headers"] = (
            "accept, accept-encoding, authorization, content-type, dnt, origin, user-agent, x-csrftoken, x-requested-with"
        )
        return response
