from django.db import models
from django.conf import settings


class AuditModel(models.Model):
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    creado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='%(class)s_creados',
        editable=False,
    )
    actualizado_por = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True, blank=True,
        on_delete=models.SET_NULL,
        related_name='%(class)s_actualizados',
        editable=False,
    )
    activo = models.BooleanField(default=True)

    class Meta:
        abstract = True
