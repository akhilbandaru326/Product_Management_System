from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny

from .models import Product,Category
from .serializers import ProductSerializers,RegisterSerializers,CategorySerializers

from .permissions import IsAdminOrReadOnly
# Create your views here.

class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializers
    permission_classes = [IsAuthenticated]

    filterset_fields = ['category','price']
    search_fields = ["name","description","category__name"]
    ordering_fields = ["price","created_at"]
    ordering = ["-created_at"]

    def get_queryset(self):
        return Product.objects.filter(owner = self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializers
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return Product.objects.filter(owner = self.request.user)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializers
    permission_classes = [AllowAny]

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [IsAdminOrReadOnly]
 