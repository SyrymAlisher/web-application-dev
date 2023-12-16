from django.urls import path
from .views import PostList, PostDetail, CreateUserView

urlpatterns = [
    path('posts/', PostList.as_view()),
    path('posts/<int:pk>/', PostDetail.as_view()),
    path('register/', CreateUserView.as_view()),
]
