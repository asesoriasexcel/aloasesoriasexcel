from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Subcategoria, Product


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'orden', 'activo')
    search_fields = ('nombre',)
    list_filter = ('activo',)


@admin.register(Subcategoria)
class SubcategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'orden', 'activo')
    search_fields = ('nombre',)
    list_filter = ('categoria', 'activo')


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'subcategoria', 'grado', 'precio', 'disponible', 'liberado', 'destacado', 'ver_imagen')
    list_filter = ('categoria', 'subcategoria', 'grado', 'disponible', 'liberado', 'destacado')
    search_fields = ('nombre', 'descripcion')
    ordering = ('-creado_en',)

    def ver_imagen(self, obj):
        if obj.imagen:
            return format_html('<img src="{}" style="width:45px;height:45px;border-radius:4px;" />', obj.imagen.url)
        return "Sin imagen"
    ver_imagen.short_description = 'Imagen'

    actions = ['dar_de_baja', 'dar_de_alta']

    @admin.action(description="Dar de baja")
    def dar_de_baja(self, request, queryset):
        queryset.update(disponible=False)

    @admin.action(description="Dar de alta")
    def dar_de_alta(self, request, queryset):
        queryset.update(disponible=True)
