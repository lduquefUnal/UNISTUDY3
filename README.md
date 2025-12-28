# 🎓 Unistudy - Plataforma de Herramientas Premium para Estudiantes

Plataforma web que permite a estudiantes acceder a herramientas premium (Canva, ChatGPT, Notion, etc.) a precios accesibles mediante cuentas compartidas.

## 🏗️ Arquitectura

```
Frontend: React + Vite + TypeScript + TailwindCSS
Backend: AWS Amplify Gen 2 (GraphQL + DynamoDB)
Hosting: AWS Amplify
Auth: Cognito (futuro)
```

## 📦 Estructura del Proyecto

```
UNISTUDY3/
├── apps/web/              # Frontend React
│   ├── src/
│   │   ├── pages/         # Páginas públicas y admin
│   │   ├── components/    # Componentes reutilizables
│   │   ├── services/      # Servicios API
│   │   ├── store/         # Zustand stores
│   │   └── utils/         # Utilidades
│   ├── amplify/           # Backend Amplify Gen 2
│   │   ├── auth/          # Configuración de autenticación
│   │   ├── data/          # Esquema GraphQL TypeScript
│   │   └── backend.ts     # Configuración backend
│   └── public/            # Assets estáticos
└── schema.graphql         # Schema de referencia (Gen 1)
```

## 🚀 Setup Local

### Prerrequisitos
- Node.js 18+ 
- npm 9+
- AWS CLI configurado
- Cuenta AWS

### Instalación

```bash
# 1. Clonar repositorio
git clone <repo-url>
cd UNISTUDY3/apps/web

# 2. Instalar dependencias (IMPORTANTE: usar --legacy-peer-deps)
npm install --legacy-peer-deps

# 3. Configurar variables de entorno
cp .env.example .env.local

# 4. Iniciar servidor de desarrollo
npm run dev
```

## ⚙️ AWS Amplify Setup

### Paso 1: Instalar Dependencias Amplify
```bash
cd apps/web
npm install '@aws-amplify/backend' '@aws-amplify/backend-cli' \
  'aws-cdk-lib@2.216.0' 'constructs@^10.0.0' \
  'typescript@^5.0.0' tsx esbuild -D --legacy-peer-deps
```

### Paso 2: Crear Proyecto Amplify Gen 2
```bash
npm create amplify@latest
# Responde: . (punto) cuando pregunte dónde crear
# Responde: No a Git init
# Responde: Yes a Install dependencies
```

### Paso 3: Configurar Esquema de Datos
Edita `amplify/data/resource.ts` con los modelos:
- Client
- Order
- Plan
- BlogPost
- Reminder

### Paso 4: Deploy Backend
```bash
npx ampx sandbox
```

## 🗄️ Modelos de Datos

### Client
- phone (ID único)
- name, email
- orders (relación hasMany)

### Order
- clientID → Client
- planID → Plan
- reference, status, expiresAt

### Plan
- name, description
- monthlyPrice, annualPrice
- features[], category
- isActive, priority

### BlogPost
- title, slug, content
- author, coverImage
- published, publishedAt

### Reminder
- clientID → Client
- message, scheduledFor
- sent, sentAt

## 🔧 Scripts Disponibles

```bash
npm run dev          # Servidor desarrollo
npm run build        # Build producción
npm run preview      # Preview build
npm run lint         # ESLint
```

## 🐛 Problemas Comunes

### Error: ERESOLVE peer dependencies
**Solución**: Siempre usar `--legacy-peer-deps`
```bash
npm install --legacy-peer-deps
```

### Error: Amplify CLI not found
**Solución**: Usar npx
```bash
npx @aws-amplify/cli <comando>
```

### Error: React 19 incompatible
**Causa**: `react-helmet-async` no soporta React 19
**Solución**: Ya incluido en package.json con flag

## 📚 Tech Stack

- **React 19**: UI Framework
- **Vite**: Build tool
- **TypeScript**: Type safety
- **TailwindCSS**: Styling
- **Zustand**: State management (transitorio)
- **Lucide React**: Icons
- **React Helmet Async**: SEO meta tags
- **Recharts**: Dashboard charts
- **AWS Amplify**: Backend completo

## 🌐 Deployment

### Amplify Hosting
```bash
# 1. Conectar repositorio GitHub
npx ampx sandbox delete
npx ampx pipeline-deploy --branch main

# 2. URL final: https://main.xxxxx.amplifyapp.com
```

### Dominio Custom (Opcional)
1. Comprar dominio (ej: unistudy.co)
2. En Amplify Console → Domain Management
3. Agregar dominio custom

## 📝 Notas de Desarrollo

- **Fase Actual**: Amplify Gen 2 Backend Setup
- **Persistencia**: Migrando de LocalStorage → DynamoDB
- **Admin**: 100% responsive (mobile-first)
- **CRM**: Captura automática de clientes en checkout

## 🔐 Seguridad

- Auth: Cognito (próximamente)
- API: Public durante desarrollo
- Producción: IAM + Cognito User Pools

## 📞 Contacto

WhatsApp: +57 333 226 0032
Email: soporte@unistudy.co

---

**Última actualización**: Diciembre 2025
**Versión**: 0.9.0 (Pre-launch)
