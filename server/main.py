
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.relatorio import router as relatorio_router
from app.config import settings
import uvicorn





app = FastAPI(
        title="Desafio Automação de Processos", 
        version="1.0",
        description="API para o desafio de automação de processos",
        )

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(relatorio_router, prefix="/relatorio")




if __name__ == "__main__":
    uvicorn.run(
        "main:app", 
        host="0.0.0.0",
        port=settings.PORT,
        reload=settings.DEBUG
    )

    