from django.db import models
from django.contrib.auth.models import User
from core.models import AuditModel


class UserProfile(AuditModel):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar_url = models.URLField(blank=True, null=True, help_text="URL del avatar de Google")
    google_id = models.CharField(max_length=255, blank=True, null=True, unique=True)

    class Meta:
        verbose_name = "Perfil de usuario"
        verbose_name_plural = "Perfiles de usuario"

    def __str__(self):
        return f"Perfil de {self.user.email}"
