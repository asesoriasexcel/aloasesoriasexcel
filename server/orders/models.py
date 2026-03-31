from django.db import models
from django.contrib.auth.models import User
from products.models import Product
from core.models import AuditModel


class Purchase(AuditModel):
    ESTADO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('completado', 'Completado'),
        ('cancelado', 'Cancelado'),
        ('reembolsado', 'Reembolsado'),
    ]

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='compras')
    producto = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='compras')
    precio_pagado = models.DecimalField(max_digits=10, decimal_places=2)
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES, default='pendiente')
    referencia_pago = models.CharField(max_length=255, blank=True, null=True, help_text="ID de transacción del proveedor de pago")
    notas = models.TextField(blank=True, null=True)

    class Meta:
        verbose_name = "Compra"
        verbose_name_plural = "Compras"
        ordering = ['-creado_en']
        unique_together = [['usuario', 'producto']]

    def __str__(self):
        return f"{self.usuario.email} → {self.producto.nombre}"
