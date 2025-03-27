# Documentació ProfeNet

## Objectius

- Crear una interfície intuïtiva per a la gestió de cursos dels professors
- Facilitar la visualització i administració dels cursos assignats
- Integrar el sistema amb la plataforma Moodle existent
- Implementar un sistema de desplegament automàtic

## Arquitectura bàsica

### Tecnologies utilitzades

- **Frontend:**

  - Next.js 15 amb TypeScript
  - Tailwind CSS per l'estilització
  - Shadcn/ui per components
  - React Query per gestió d'estat i caching

- **Backend:**
  - Node.js amb Express
  - Integració amb API Moodle

### Interrelació entre components

- Frontend comunica amb el backend mitjançant una API REST
- Backend actua com a middleware entre el frontend i Moodle
- Sistema de CI/CD amb GitHub Actions per automatitzar el desplegament

## Entorn de desenvolupament

### Requisits previs

- Node.js 20 o superior
- Git
- Compte de GitHub
- Variables d'entorn configurades

### Passos d'instal·lació

1. Clonar el repositori:

```bash
git clone https://github.com/inspedralbes/tr3-profenet-24-25-a23BrianJaen.git
```

2. Configurar el frontend:

```bash
cd frontNext
npm install
mkdir .env.local
```

3. Configurar el backend:

```bash
cd back/apiNode
npm install
mkdir .env
```

4. Aixecar l'entorn de desenvolupament:

```bash
docker compose up -d
```

## Desplegament a producció

El desplegament es realitza automàticament mitjançant GitHub Actions quan es fa push a la branca principal:

1. Es construeix i prova el codi
2. Es despleguen primer els serveis de backend
3. Es despleguen els serveis de frontend
4. Es verifica el desplegament

## API Endpoints

### Rutes de professors

- GET /api/moodle/getTeachers - Obtenir tots els professors
- GET /api/moodle/teacher/:teacherId/courses - Obtenir cursos d'un professor
- GET /api/moodle/getUsers - Obtenir tots els usuaris
- POST /api/moodle/cloneCourses - Assignar cursos a un professor
- POST /api/moodle/manageCourses - Gestionar assignacions de cursos
