from summerizer.serializer import SummarySerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from core.models import File
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from summerizer.serializer import FileSerializer
from django.core.cache import cache
import hashlib


class ArticleSummaryView(APIView):
    """Summarize article document"""
    def post(self, request):
        """Call the machine model for summariztion"""
        modelSummarizer = SummarySerializer(data=request.data)
        articleUrl = request.data['articleUrl']
        length = request.data['length']
        if modelSummarizer.is_valid():
            result = modelSummarizer.article_summary(articleUrl,length)
            return Response({'summary': result})
        return Response({'message': modelSummarizer.errors})


class FileView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, *args, **kwargs):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            filename = request.data['filename']
            length = request.data['length']
            hash_object = hashlib.sha256(str(filename).encode('utf-8'))
            hashedFileName =hash_object.hexdigest()
            cache_data = cache.get(hashedFileName)
            if not cache_data :
                file_serializer.save()
                text = file_serializer.summary_Document(filename, length)
                return Response({'summary': text})
            else:
                return Response({'summary':cache_data})

        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
