from django.urls import path
from .views import MisProductosView

urlpatterns = [
    path('mis-productos/', MisProductosView.as_view(), name='mis-productos'),
]
