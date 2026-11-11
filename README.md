# Alerta Temprana — Frontend

Interfaz web de **Soluciones VSJ — Alerta Temprana**. Los estudiantes se registran, responden una encuesta corta y ven su nivel de riesgo académico-emocional junto con los servicios de Bienestar recomendados. Bienestar Universitario (admin) gestiona servicios y categorías y ve estadísticas anónimas.

Proyecto de Aula — Desarrollo Web Full-Stack, semestre 2026-2.

## Despliegue

| Qué | URL |
| --- | --- |
| Sitio (Vercel) | https://vsj-aula-backend-production.up.railway.app|
| API (Railway) |https://vsj-aula-frontend.vercel.app |
| Repositorio backend | https://github.com/suribe27/vsj-aula-backend |

## Tecnologías

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4

## Instalación y ejecución

```bash
npm install
cp .env.example .env.local    # define NEXT_PUBLIC_API_HOST
npm run dev                   # http://localhost:3000
```

Otros scripts: `npm run build`, `npm start`, `npm run lint`.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_API_HOST` | URL de la API, sin `/` al final |

## Credenciales de prueba

| Rol | Correo | Contraseña |
| --- | --- | --- |
| admin (Bienestar) | `admin@vsj.edu.co` | `Admin2026*` |
| user (estudiante) | `estudiante@vsj.edu.co` | `Estudiante2026*` |

## Rutas

| Ruta | Acceso |
| --- | --- |
| `/` | Landing pública |
| `/login`, `/register` | Solo sin sesión (con sesión redirigen) |
| `/servicios`, `/servicios/[id]` | Pública: catálogo con filtros y paginación, detalle |
| `/evaluacion`, `/evaluacion/nueva`, `/evaluacion/[id]`, `/evaluacion/[id]/editar` | Estudiante |
| `/admin`, `/admin/servicios`, `/admin/servicios/nuevo`, `/admin/servicios/[id]/editar`, `/admin/categorias` | Admin |

Las rutas privadas redirigen a `/login` sin sesión y al inicio si el rol no corresponde, aunque se escriba la URL a mano. Si la API responde 401, la sesión se cierra y se vuelve al login.

## Arquitectura

```
app/                      → rutas (page.tsx y layout.tsx): solo componen
src/features/
├── common/               → config, cliente HTTP, sesión, hooks y componentes compartidos
├── auth/                 → login, registro, sesión y protección de rutas
├── categories/           → administración de categorías
├── support-services/     → catálogo, detalle y CRUD de servicios con imagen
├── evaluations/          → encuesta, resultado, historial y panel anónimo
├── layout/               → barra de navegación, pie de página y modo oscuro
└── landing/              → página de inicio
```

Cada feature separa `domain/` (tipos), `services/` (llamadas a la API), `hooks/` (estado y lógica) y `components/` (interfaz).

## Reparto del trabajo

| Integrante | Qué construyó |
| --- | --- |
| Valery Monsalve | Configuración del proyecto y cliente HTTP, autenticación y sesión, protección de rutas, encuesta y panel de evaluaciones, landing y página 404, despliegue en Vercel |
| Samuel Uribe | Catálogo y detalle de servicios, administración de servicios con subida de imagen, administración de categorías |
