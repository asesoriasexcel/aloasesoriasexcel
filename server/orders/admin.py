from django.contrib import admin
from .models import Purchase


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    list_display = ('usuario', 'producto', 'precio_pagado', 'estado', 'creado_en')
    list_filter = ('estado',)
    search_fields = ('usuario__email', 'producto__nombre')
    ordering = ('-creado_en',)
