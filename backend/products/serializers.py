from rest_framework import serializers
from .models import Category,Product
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.models import User

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class ProductSerializers(serializers.ModelSerializer):
    category_name = serializers.CharField(
        source="category.name",
        read_only=True
    )
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["owner"]

class RegisterSerializers(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        validators=[validate_password]
    )
    class Meta:
        model = User
        fields = ['id','username','email','password']
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
