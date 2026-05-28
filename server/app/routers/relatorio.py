

"""
Rotas de Relatórios
"""

from typing import List, Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import StreamingResponse
from datetime import datetime


from ..services.relatorio_service import RelatorioService


router = APIRouter()


class Metricas(BaseModel):
    """Metricas de dados para o relatório"""
    model_config = {"populate_by_name": True}

    total_posts: int = Field(alias="totalPosts")
    avg_chars: float = Field(alias="avgChars")
    avg_comments_by_post: float = Field(alias="avgCommentsByPost")
    status: str


class User(BaseModel):
    """Modelo de usuário para o relatório"""
    id: int
    name: str
    username: str
    email: str
    address: Optional[dict]
    phone: Optional[str]
    website: Optional[str]
    company: Optional[dict]


class RelatorioRequest(BaseModel):
    """Requisição para o endpoint de relatório"""
    metricas: Metricas
    user: User


class RelatorioResponse(BaseModel):
    """Resposta do endpoint de relatório"""
    message: str
    filename: str



@router.post("/download/" , response_model=RelatorioResponse)
async def download(
    request: RelatorioRequest
) -> RelatorioResponse:
   
    """Gerar relatório de métricas para um usuário específico"""
    # Lógica para gerar o relatório
    try:
        metricas = request.metricas.dict()
        user = request.user


        buffer = RelatorioService.gerar_relatorio(metricas, user)
        filename = f"relatorio_{user.username}_{datetime.now()}.xlsx"

        return StreamingResponse(
            iter([buffer.getvalue()]),
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": f"attachment; filename={filename}"}
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

