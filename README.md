## 🐺 Fang-js: Zero-Dependency Micro-Framework

Fang-js es un framework minimalista, ultraligero y con tipado fuerte diseñado para Node.js. Su filosofía se basa en eliminar las dependencias externas, ofreciendo una arquitectura moderna inspirada en los mejores patrones de NestJS y Koa.

**🚀 Capacidades Principales**

**1. APIs REST de Alto Rendimiento**

- Fang-js permite definir rutas de manera declarativa con soporte total para el ciclo de vida HTTP.
- list itemEnrutamiento Dinámico: Captura de parámetros (ej. /users/:id) inyectados directamente en el contexto.
- Agrupación de Rutas: Prefijos y middlewares específicos por módulos para una organización profesional.

**2. Validación Nativa con Type-Safety**

- Integración profunda con Zod para garantizar que los datos que entran a tu servidor sean correctos.
- Autocompletado inmediato del esquema validado en el ctx.body().
- Rechazo automático de peticiones malformadas.

**3. Servidor de Archivos Estáticos (SPA Ready)**

- Incluye un middleware optimizado para servir aplicaciones de frontend (React, Vue, Svelte) o assets.
- Seguridad: Protección contra Directory Traversal integrada.
  Eficiencia: Uso de Streams de Node.js para un consumo de memoria mínimo incluso con archivos grandes.
- Caché: Manejo automático de cabeceras Last-Modified y Cache-Control.

**4. Excepciones Semánticas (NestJS Style)**

- Sistema de errores basado en clases para una legibilidad superior. Ejemplos: NotFoundException, UnauthorizedException, BadRequestException, etc.
- Manejador Global: Un único punto (app.onError) para capturar y formatear todas las respuestas de error del servidor.

**5. Arquitectura de Middleware en "Cebolla"**

- Flujo de ejecución bidireccional que permite procesar la petición antes de llegar a la ruta y la respuesta después de que esta termine.
- Ideal para Logging, Autenticación, Compresión y métricas.

**6. Seguridad y CORS Flexible**

- Configuración completa de Cross-Origin Resource Sharing sin librerías externas.
- Soporte para múltiples orígenes, métodos permitidos y validación dinámica mediante funciones.

**7. Consola de Desarrollo Profesional**

- Logger incorporado con códigos de colores ANSI para una depuración rápida y visual en el terminal.

**Ejemplo**

```
import { Fang } from 'fang-js';

const app = new Fang();

app.get("/", (ctx) => {
  ctx.json({message: "Hello World Fang!"});
});

//Default port 3000
app.listen();
```
