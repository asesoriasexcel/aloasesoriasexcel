from rest_framework import serializers
from .models import Purchase
from products.serializers import ProductSerializer


class PurchaseSerializer(serializers.ModelSerializer):
    producto_detalle = ProductSerializer(source='producto', read_only=True)

    class Meta:
        model = Purchase
        fields = ['id', 'producto', 'producto_detalle', 'precio_pagado', 'estado', 'creado_en']
        read_only_fields = ['precio_pagado', 'estado', 'creado_en']
