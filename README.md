# Desafio — Análise de Usuários

Aplicação fullstack de análise de usuários que consome a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/). A interface reage dinamicamente aos eventos de interação, seleção de usuário, aplicação de filtros e geração de relatório Excel.

---

##  Sumário

- [Tecnologias](#-tecnologias)
- [Arquitetura do Sistema](#-arquitetura-do-sistema)
- [Fluxo de Eventos no Frontend](#-fluxo-de-eventos-no-frontend)
- [Como Rodar](#-como-rodar)

---

## Tecnologias

### Frontend

| Biblioteca / Ferramenta        | Finalidade                                           |
|--------------------------------|------------------------------------------------------|
| **React**                             | Biblioteca principal de UI                           |
| **Vite**                               | Bundler e servidor de desenvolvimento                |
| **TailwindCSS**                        | Estilização via utilitários CSS                      |
| **shadcn/ui + Radix UI**                | Componentes de interface acessíveis e estilizáveis   |
| **TanStack Query (React Query)**      | Cache e gerenciamento de estado assíncrono           |
| **Axios**                             | Cliente HTTP para consumo das APIs                   |
| **ExcelJS**                           | Geração de relatórios `.xlsx` no navegador           |
| **Sonner**                             | Notificações toast                                   |
| **Lucide React**                    | Ícones SVG                                           |
| **Geist (via Fontsource)**             | Tipografia                                           |
| **clsx + tailwind-merge**             | Utilitários de composição de classes CSS             |

### Backend

| Biblioteca / Ferramenta | Finalidade                                            |
|----------------------------|-------------------------------------------------------|
| **FastAPI**               | Framework web assíncrono (Python)                     |
| **Uvicorn**                 | Servidor ASGI para execução do FastAPI                |
| **Pydantic**               | Validação de dados e tipagem dos schemas              |
| **openpyxl**              | Leitura/escrita de arquivos Excel pelo backend        |

---

### Camadas do Frontend

| Camada       | Localização             | Responsabilidade                                         |
|-------------|------------------------|----------------------------------------------------------|
| **Pages**    | `src/pages/`           | Composição de layouts de página                          |
| **Components** | `src/components/`   | Componentes visuais (SelectUser, FilterResult, Metricas, Resultados) |
| **Hooks**    | `src/hooks/queries/`   | Busca de dados com TanStack Query (`useUserQuery`, `usePostQuery`, `useCommentsQuery`) |
| **Services** | `src/services/`        | Clientes HTTP — `api-service.js` (JSONPlaceholder) e `relatorioService.js` (backend) |
| **UI**       | `src/components/ui/`   | Componentes base do shadcn/ui (Button, Loading, etc.)    |

---



##  Como Rodar

### Pré-requisitos

- **Node.js** >= 18
- **Python** >= 3.10

### Frontend

```bash
# Na raiz do projeto
npm install
npm run dev
```

> O frontend estará disponível em `http://localhost:5173`

### Backend

O projeto inclui um script que automatiza a criação do ambiente virtual e instalação das dependências:

```bash
# Na raiz do projeto
chmod +x run_backend.sh
./run_backend.sh
```

Ou manualmente:

```bash
cd server
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 main.py
```

> A API estará disponível em `http://localhost:8000`  
> Documentação interativa (Swagger): `http://localhost:8000/docs`

### Rodando Ambos Simultaneamente

Abra dois terminais:

```bash
# Terminal 1 — Frontend
npm run dev

# Terminal 2 — Backend
./run_backend.sh
```
