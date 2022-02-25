from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.core.validators import URLValidator



class PublicUserApiTests(TestCase):
    """Test the summerizer API (public)"""
    def setUp(self):
        self.client = APIClient()


    def test_that_article_url_is_valid(self):
        result = False
        validate = URLValidator()
        url = "http://wwww.avalidurl.com/"
        try:
            validate(url)
            result = True
        except ValidationError as excption:
            result = False

        self.assertTrue(result)
