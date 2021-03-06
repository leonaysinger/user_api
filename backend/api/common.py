from rest_framework import status
from rest_framework.response import Response


def save_and_create_location_header(request, serializer_class):
    """Create Location for a good pratice of REST API (level 3)"""
    serializer = serializer_class(data=request.data)
    if serializer.is_valid():
        serializer.save()
        response = Response(serializer.data, status=status.HTTP_201_CREATED)
        id_source = str(serializer.data['id'])
        response['Location'] = request.build_absolute_uri() + id_source
        return response
    print('$$$$$$$')
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
