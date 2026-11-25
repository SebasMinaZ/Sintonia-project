# Sintonía · Frontend (Sprints 1 y 2)

Aplicación web para explorar géneros musicales, artistas, álbumes y canciones. Proyecto universitario desarrollado con **React + Vite + JavaScript**. Los datos y los textos de la interfaz se obtienen de la API REST de Sintonía.

- **Despliegue:** https://sintonia-project.vercel.app/
- **API:** https://yanethm-sintonia-api.fly.dev/api/v1 ([documentación](https://yanethm-sintonia-api.fly.dev/docs))

## Requisitos

- Node.js 20.19 o posterior (rama 20), o Node.js 22.12 o posterior.
- npm.

## Instalación y ejecución

```sh
git clone https://github.com/SebasMinaZ/sintonia-project.git
cd sintonia-project
npm ci
cp .env.example .env.local
npm run dev
```

Abre la dirección que muestre Vite (por defecto http://localhost:5173).

### Variables de entorno

| Variable                | Uso                                                           |
| ----------------------- | ------------------------------------------------------------- |
| `VITE_API_BASE_URL`     | URL base de la API. Debe ser `/api/v1` (pasa por el proxy)    |
| `VITE_SIMULAR_LATENCIA` | Opcional. Milisegundos de espera simulada, por ejemplo `2000` |
| `VITE_SIMULAR_ERROR`    | Opcional. Código de error simulado: `500`, `503` o `504`      |

En Vercel la variable se configura en _Settings → Environment Variables_. Después de cambiarla hay que volver a desplegar (_Redeploy_).

Las dos variables de simulación se envían como las cabeceras `X-Simular-Latencia` y `X-Simular-Error`. No se envían a `/textos` ni a `/idiomas`, porque sin textos la aplicación queda en blanco. Sí afectan a las demás peticiones, incluidas las de sesión.

### Proxy de la API

El navegador pide `/api/…` al mismo dominio del frontend y el servidor reenvía la petición a la API:

- en desarrollo, con `server.proxy` en [vite.config.js](vite.config.js);
- en Vercel, con `rewrites` en [vercel.json](vercel.json).

Es necesario por la cookie `sesion`. La API la pone `HttpOnly` y sin `Domain`; si el frontend llamara directamente a la API, sería una cookie de otro sitio y el navegador podría bloquearla. Con el proxy queda en el mismo dominio y se envía sola, sin que el código la lea.

### Scripts

| Comando                                   | Qué hace                                     |
| ----------------------------------------- | -------------------------------------------- |
| `npm run dev`                             | Servidor de desarrollo                       |
| `npm run build`                           | Compila para producción en `dist/`           |
| `npm run preview`                         | Sirve la compilación localmente              |
| `npm run lint`                            | Revisa el código con ESLint                  |
| `npm run verificar`                       | Lint sin avisos y compilación                |
| `npm run format` / `npm run format:check` | Formatea o comprueba el formato con Prettier |

## Rutas

| Ruta           | Vista                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------- |
| `/`            | Inicio público: géneros y álbumes destacados                                                         |
| `/catalogo`    | Catálogo musical; con `?genero=<id>` muestra artistas, álbumes y canciones más escuchadas del género |
| `/albumes/:id` | Detalle del álbum: encabezado, lista de canciones y «Más de {artista}»                               |
| `/ingresar`    | Ingreso con correo y contraseña (página completa, sin navbar ni footer)                              |
| `/registro`    | Página provisional                                                                                   |
| Cualquier otra | Página «No encontrado»                                                                               |

## Organización del código

```
src/
├── components/   Un componente por carpeta (.jsx + .css); ui/ tiene los componentes base
├── config/       proyecto.js (nombre y variables de entorno)
├── context/      Textos de la API, preferencias (idioma y cookies) y sesión
├── hooks/        useRecurso, useTextos, useSesion, useAlbumesDestacados, useTituloPagina…
├── pages/        Home, Catalogo, DetalleAlbum, Ingresar, NoEncontrado, PaginaProvisional
├── services/     api.js (peticiones a la API) y cookies.js
├── styles/       tokens.css (tokens de Figma) y global.css
└── utils/        formatear.js y colores.js
```

## Endpoints utilizados

- `GET /textos?idioma=es|en`: textos de la interfaz.
- `GET /idiomas`: opciones del selector de idioma.
- `GET /generos`: lista de géneros.
- `GET /generos/:id`: artistas, álbumes y canciones de un género.
- `GET /albumes/:id`: detalle de un álbum.
- `POST /sesion`: ingreso con `correo` y `clave`.
- `GET /sesion`: usuario de la sesión actual.
- `DELETE /sesion`: cierre de sesión.

## Funcionalidades

### Sprint 1

- Navbar y footer compartidos; menú hamburguesa accesible en móvil (`<dialog>`, teclado, Escape, foco).
- Inicio con géneros y álbumes destacados desde la API.
- Catálogo con el filtro de género en la URL (se conserva al recargar o compartir el enlace).
- Portadas dibujadas en SVG con `portada.patron` y los colores `--portada-1` a `--portada-6`.
- Selector ES | EN: textos desde la API, `<html lang>` actualizado y cookie `idioma` solo con consentimiento.
- Aviso de cookies con Aceptar y Rechazar del mismo peso visual; decisión guardada en la cookie `consentimiento`.
- Panel de accesibilidad (botón en el Navbar y fila en el menú móvil): tamaño del texto (90 %–130 %), alto contraste, reducir movimiento, subrayar enlaces y espaciado de lectura. Se guarda en `localStorage` (sin cookies nuevas) y los valores iniciales salen de las preferencias del sistema (`prefers-contrast`, `prefers-reduced-motion`).
- Diseño responsive de 390 a 1440 px con los tokens de Figma.

### Sprint 2

- Estados de carga (esqueletos), vacío y error con «Reintentar» en el Catálogo y en el detalle de álbum.
- Detalle de álbum con título y descripción propios; un álbum inexistente muestra «No encontrado» con el botón para volver al catálogo.
- Ingreso con validación de campos obligatorios, botón «Ingresando…» y mensajes para credenciales incorrectas, demasiados intentos (con cuenta regresiva) y falta de conexión.
- Sesión conservada al recargar, menú de cuenta, cierre de sesión y aviso de sesión vencida (vuelve a `/ingresar`). El token no se guarda en `localStorage` ni en el estado.

## Equivalencias Next.js → React

| En Next.js         | En este proyecto                                                      |
| ------------------ | --------------------------------------------------------------------- |
| `generateMetadata` | Hook `useTituloPagina(titulo, descripcion)`                           |
| `notFound()`       | La página devuelve `<NoEncontrado />`                                 |
| `loading.tsx`      | Componente `EstadoCarga`, según `cargando` de la petición             |
| `error.tsx`        | Componente `EstadoError`, con «Reintentar»                            |
| Server Actions     | El formulario envía `POST /sesion` desde el cliente con `consultar()` |

## Cómo probar los estados y los errores

Después de cambiar `.env.local` hay que reiniciar `npm run dev`.

| Caso                     | Cómo probarlo                                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| Carga                    | `VITE_SIMULAR_LATENCIA=2000` y abrir `/catalogo` o un álbum                                                                  |
| Error                    | `VITE_SIMULAR_ERROR=503` y abrir `/catalogo` o un álbum; probar «Reintentar»                                                 |
| Vacío                    | En Chrome, con _Local Overrides_, devolver `"albumes": []` en `/api/v1/generos/gen_jazz` y abrir `/catalogo?genero=gen_jazz` |
| Álbum inexistente        | Abrir `/albumes/alb_no-existe`                                                                                               |
| Campos obligatorios      | En `/ingresar`, pulsar «Ingresar» con los campos vacíos                                                                      |
| Credenciales incorrectas | Ingresar con una contraseña equivocada                                                                                       |
| Demasiados intentos      | Fallar 5 veces seguidas y volver a intentar                                                                                  |
| Sin conexión             | En DevTools › Network, elegir _Offline_ y enviar el formulario                                                               |
| Sesión vencida           | Ingresar, borrar la cookie `sesion` en DevTools › Application, cambiar de pestaña y volver                                   |

Para ingresar se usa la cuenta de prueba que indica la documentación de la API.

## Ilustración del Inicio

El collage que acompaña al titular (`CollagePortadas`) es una ilustración decorativa tomada de Figma: las portadas de los tres primeros géneros y una nota («Sube la niebla / por la montaña / y el camino canta»). Todo el bloque lleva `aria-hidden="true"`.

La nota forma parte del dibujo, no es texto de la interfaz: no informa de nada ni permite ninguna acción, y los lectores de pantalla no la anuncian. Por eso está escrita en el componente, no sale de la API y no se traduce al cambiar de idioma. Es la excepción a la regla de que los textos vienen de `GET /textos`.

## Decisiones técnicas

- **React + Vite y no Next.js:** los requisitos de Next.js se resuelven con las equivalencias de React de la tabla anterior.
- **Peticiones:** cada `GET` se pide una sola vez por ruta y se reutiliza (excepto `/sesion` y cuando hay simulación activa). `GET /generos` se pide al arrancar y `GET /sesion` no bloquea el pintado.
- **Álbumes destacados:** Figma muestra álbumes que no existen en la API. Se toman los 6 primeros elementos con `tipo: "album"` recorriendo los géneros de `GET /generos` con `GET /generos/:id`, como pide el criterio del Inicio.
- **Destinos sin página:** `/artistas/:id`, `/albumes`, `/buscar`, `/recuperar-clave`, `/terminos`, `/accesibilidad` y las opciones de cuenta muestran «No encontrado».
- **Género o álbum inexistente:** si la API responde 404 `no_encontrado`, se muestra la página «No encontrado».
- **Casilla «Mantener la sesión iniciada»:** es solo visual; la API solo admite `correo` y `clave`.
- **Título del Catálogo:** en escritorio «Catálogo musical» y en móvil «Catálogo», como en Figma; ambos textos vienen de la API.
- **Medidas:** se usan los tokens de Figma; los valores sin token llevan el comentario `/* Figma: …, sin variable */`. Algunas separaciones se midieron sobre capturas (`Figma (estimado)`).
- **Panel de accesibilidad:** en móvil es una hoja inferior y en escritorio se abre debajo de su botón; ambos usan `<dialog>` (foco atrapado y cierre con Escape). El tamaño del texto llega hasta 130 % porque con más la vista de 390 px se desborda. «Declaración de accesibilidad» lleva a `/accesibilidad`, que todavía no tiene página.

## Limitaciones conocidas

- Con el tamaño del texto al 130 %, la cabecera provoca scroll horizontal en algunos anchos. Se midió en `/` y en español: ocurre a 641, 768 y 1024 px, y no a 390, 900, 1100 ni 1440 px. Posible causa, sin comprobar: el `zoom` de `<html>` no cambia los cortes de las _media queries_.

## Uso de IA

El registro del uso de inteligencia artificial está en [IA.md](IA.md).
