from django.urls import path
from .views import ProductListCreateView,RegisterView,ProductDetailView,CategoryListCreateView

urlpatterns = [
    path("products/",ProductListCreateView.as_view(),name = "product-list-create"),
    path("products/<int:pk>/",ProductDetailView.as_view()),
    path("register/",RegisterView.as_view()),
    path("category/",CategoryListCreateView.as_view()),
]