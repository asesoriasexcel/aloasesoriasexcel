from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Purchase
from .serializers import PurchaseSerializer


class MisProductosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        compras = Purchase.objects.filter(
            usuario=request.user,
            estado='completado',
            activo=True,
        ).select_related('producto')
        serializer = PurchaseSerializer(compras, many=True)
        return Response(serializer.data)
