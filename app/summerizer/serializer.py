from rest_framework import serializers
from core.models import Summary
from core.models import File
from summerizer.service import SummarizerModel

class SummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Summary
        fields = ('articleUrl', 'length')

    """ Serializer for summary"""
    articleUrl = serializers.CharField(allow_blank=True)
    def article_summary(self, articleUrl, length):
        """Call the machine model for summariztion"""
        articleUrl = articleUrl
        modelSummarizer = SummarizerModel()
        result = modelSummarizer.summarizeArticle(articleUrl,length)
        return result


class FileSerializer(serializers.ModelSerializer):
     class Meta():
          model = File
          fields = ('file', 'filename', 'length')
     """ Serializer for summary"""
     filename = serializers.CharField(allow_blank=True)

     def summary_Document(self,filename,length):
          """Call the machine model for summariztion"""
          filename = filename
          modelSummarizer = SummarizerModel()
          result = modelSummarizer.summarizeDocument(filename, length)
          return result
