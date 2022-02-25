from django.urls import path
from summerizer import views

app_name = 'summerizer'

urlpatterns = [
    path('article/', views.ArticleSummaryView.as_view(), name='article'),
    path('upload/', views.FileView.as_view() ,  name='file-upload')
]
