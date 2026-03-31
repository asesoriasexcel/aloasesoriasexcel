from django.db import models
from cloudinary.models import CloudinaryField
from core.models import AuditModel


class Category(AuditModel):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255, blank=True)
    icono = models.CharField(max_length=100, blank=True, help_text="Nombre del icono react-icons")
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ['orden', 'nombre']

    def __str__(self):
        return self.nombre


class Subcategoria(AuditModel):
    nombre = models.CharField(max_length=100)
    categoria = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategorias')
    orden = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name = "Subcategoría"
        verbose_name_plural = "Subcategorías"
        ordering = ['orden', 'nombre']

    def __str__(self):
        return f"{self.categoria.nombre} → {self.nombre}"


class Product(AuditModel):
    GRADO_CHOICES = [
        ('estandar', 'Estándar'),
        ('avanzado', 'Avanzado'),
        ('premium', 'Premium'),
    ]

    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(help_text="Descripción corta para la tarjeta")
    descripcion_larga = models.TextField(blank=True)
    grado = models.CharField(max_length=50, choices=GRADO_CHOICES, default='estandar')
    categoria = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='productos')
    subcategoria = models.ForeignKey(Subcategoria, on_delete=models.SET_NULL, null=True, blank=True, related_name='productos')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    video_link = models.URLField(blank=True, null=True)
    imagen = CloudinaryField('imagen', blank=True, null=True)
    archivo = models.FileField(upload_to='descargas/', blank=True, null=True)
    disponible = models.BooleanField(default=True)
    liberado = models.BooleanField(default=False)
    destacado = models.BooleanField(default=False)

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ['-creado_en']

    def __str__(self):
        return f"{self.nombre} ({self.grado})"
