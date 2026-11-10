# Sintonía · Frontend (Sprint 1)

Aplicación web para explorar géneros musicales, artistas, álbumes y canciones. Proyecto universitario desarrollado con **React + Vite + JavaScript**. Los datos y todos los textos de la interfaz se obtienen de la API REST de Sintonía.

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

| Variable            | Uso                                                                           |
| ------------------- | ----------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | URL base de la API, por ejemplo `https://yanethm-sintonia-api.fly.dev/api/v1` |

En Vercel la variable se configura en _Settings → Environment Variables_.

### Scripts

| Comando                                   | Qué hace                                     |
| ----------------------------------------- | -------------------------------------------- |
| `npm run dev`                             | Servidor de desarrollo                       |
| `npm run build`                           | Compila para producción en `dist/`           |
| `npm run preview`                         | Sirve la compilación localmente              |
| `npm run lint`                            | Revisa el código con ESLint                  |
| `npm run format` / `npm run format:check` | Formatea o comprueba el formato con Prettier |

## Rutas

| Ruta                     | Vista                                                                                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `/`                      | Inicio público: géneros y álbumes destacados                                                         |
| `/catalogo`              | Catálogo musical; con `?genero=<id>` muestra artistas, álbumes y canciones más escuchadas del género |
| `/ingresar`, `/registro` | Páginas provisionales (se construyen en el sprint 2)                                                 |
| Cualquier otra           | Página «No encontrado»                                                                               |

## Organización del código

```
src/
├── components/   Un componente por carpeta (.jsx + .css); ui/ tiene los componentes base
├── context/      TextosContext (textos de la API) y PreferenciasContext (idioma y cookies)
├── hooks/        useRecurso, useTextos, useAlbumesDestacados, useAjustesAccesibilidad, useTituloPagina…
├── pages/        Home, Catalogo, NoEncontrado, PaginaProvisional
├── services/     api.js (peticiones GET) y cookies.js
├── styles/       tokens.css (tokens de Figma) y global.css
└── utils/        formatear.js y colores.js
```

## Endpoints utilizados

- `GET /textos?idioma=es|en`: todos los textos de la interfaz.
- `GET /idiomas`: opciones del selector de idioma.
- `GET /generos`: lista de géneros.
- `GET /generos/:id`: artistas, álbumes y canciones de un género.

## Funcionalidades del Sprint 1

- Navbar y footer compartidos; menú hamburguesa accesible en móvil (`<dialog>`, teclado, Escape, foco).
- Inicio con géneros y álbumes destacados desde la API.
- Catálogo con el filtro de género en la URL (se conserva al recargar o compartir el enlace).
- Portadas dibujadas en SVG con `portada.patron` y los colores `--portada-1` a `--portada-6`.
- Selector ES | EN: textos desde la API, `<html lang>` actualizado y cookie `idioma` solo con consentimiento.
- Aviso de cookies con Aceptar y Rechazar del mismo peso visual; decisión guardada en la cookie `consentimiento`.
- Panel de accesibilidad (botón en el Navbar y fila en el menú móvil): tamaño del texto (90 %–130 %), alto contraste, reducir movimiento, subrayar enlaces y espaciado de lectura. Se guarda en `localStorage` (sin cookies nuevas) y los valores iniciales salen de las preferencias del sistema (`prefers-contrast`, `prefers-reduced-motion`).
- Diseño responsive de 390 a 1440 px con los tokens de Figma.

## Decisiones técnicas

- **React + Vite y no Next.js:** la profesora confirmó que el Sprint 1 se hace con React y Vite; Next.js llega en el sprint 2.
- **Álbumes destacados:** Figma muestra álbumes que no existen en la API. Se toman los 6 primeros elementos con `tipo: "album"` recorriendo los géneros de `GET /generos` con `GET /generos/:id`, como pide el criterio del Inicio.
- **Enlaces a detalle:** en el Catálogo, álbumes y canciones enlazan a `/albumes/:id` y los artistas a `/artistas/:id`. Son las vistas de detalle del sprint 2; por ahora muestran «No encontrado».
- **Género inexistente:** si `GET /generos/:id` responde 404 `no_encontrado`, se muestra la página «No encontrado».
- **Título del Catálogo:** en escritorio «Catálogo musical» y en móvil «Catálogo», como en Figma; ambos textos vienen de la API.
- **Medidas:** se usan los tokens de Figma; los valores sin token llevan el comentario `/* Figma: …, sin variable */`. Algunas separaciones del Catálogo se midieron sobre capturas (`Figma (estimado)`).
- **Panel de accesibilidad:** en móvil es una hoja inferior y en escritorio se abre debajo de su botón; ambos usan `<dialog>` (foco atrapado y cierre con Escape). El tamaño del texto llega hasta 130 % porque con más la vista de 390 px se desborda. «Declaración de accesibilidad» lleva a `/accesibilidad`, que se construye más adelante.
- **Estados de carga y error:** no forman parte de los criterios del Sprint 1; quedan para cuando se pidan.

## Uso de IA

El registro del uso de inteligencia artificial está en [IA.md](IA.md).
