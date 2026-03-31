from rest_framework import serializers
from .models import Category, Subcategoria, Product


class SubcategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subcategoria
        fields = ['id', 'nombre', 'orden']


class CategorySerializer(serializers.ModelSerializer):
    subcategorias = SubcategoriaSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'nombre', 'descripcion', 'icono', 'orden', 'subcategorias']


class ProductSerializer(serializers.ModelSerializer):
    categoria_nombre = serializers.ReadOnlyField(source='categoria.nombre')
    subcategoria_nombre = serializers.ReadOnlyField(source='subcategoria.nombre')
    imagen_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'nombre', 'descripcion', 'descripcion_larga',
            'grado', 'categoria', 'categoria_nombre',
            'subcategoria', 'subcategoria_nombre',
            'precio', 'video_link', 'imagen_url',
            'disponible', 'liberado', 'destacado',
        ]

    def get_imagen_url(self, obj):
        if obj.imagen:
            return obj.imagen.url
        return None
