#!/bin/bash

# Script para configurar e rodar o backend
# Cria um .venv (virtual environment) e instala as dependências

set -e

echo "🔧 Configurando ambiente para o backend..."

# Diretório do servidor
SERVER_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/server" && pwd)"
cd "$SERVER_DIR"

# Criar .venv se não existir
if [ ! -d ".venv" ]; then
    echo "Criando ambiente virtual (.venv)..."
    python3 -m venv .venv
else
    echo " Ambiente virtual já existe"
fi

# Ativar .venv
echo "Ativando ambiente virtual..."
source .venv/bin/activate

# Instalar/atualizar dependências
echo " Instalando dependências..."
pip install --upgrade pip
pip install -r requirements.txt

# Rodar a aplicação
echo "Iniciando aplicação FastAPI..."
python3 main.py
