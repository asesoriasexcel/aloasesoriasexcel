from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Category, Subcategoria, Product
from .serializers import CategorySerializer, SubcategoriaSerializer, ProductSerializer


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.filter(activo=True)
    serializer_class = CategorySerializer


class SubcategoriaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Subcategoria.objects.filter(activo=True)
    serializer_class = SubcategoriaSerializer

    def get_queryset(self):
        queryset = Subcategoria.objects.filter(activo=True)
        categoria_id = self.request.query_params.get('categoria')
        if categoria_id:
            queryset = queryset.filter(categoria_id=categoria_id)
        return queryset


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(disponible=True, activo=True)
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(disponible=True, activo=True)
        categoria_id = self.request.query_params.get('categoria')
        subcategoria_id = self.request.query_params.get('subcategoria')
        destacado = self.request.query_params.get('destacado')
        if categoria_id:
            queryset = queryset.filter(categoria_id=categoria_id)
        if subcategoria_id:
            queryset = queryset.filter(subcategoria_id=subcategoria_id)
        if destacado:
            queryset = queryset.filter(destacado=True)
        return queryset
