# Uso de inteligencia artificial

Durante el Sprint 1 se usó Claude (Anthropic) como tutor y apoyo de desarrollo. Cada respuesta se revisó contra las fuentes del proyecto (PDF de requisitos, contrato de la API, respuestas reales de la API y Figma) antes de incorporarla al código.

## Entrada 1. Ubicación de los textos de estados y accesibilidad (respuesta incorrecta corregida)

- **Qué se pidió:** cómo leer los textos de la página «No encontrado» y del panel de accesibilidad desde `GET /textos`.
- **Qué respondió la IA:** que esos textos estaban dentro de `textos.componentes.estados` y `textos.componentes.accesibilidad`.
- **Cómo se detectó el error:** al revisar el JSON real de `GET /textos?idioma=es`, `estados` y `accesibilidad` son claves de primer nivel, no hijas de `componentes`.
- **Corrección:** se usaron `textos.estados` y `textos.accesibilidad`, y desde entonces se pidió revisar siempre la respuesta real antes de escribir una ruta de textos.

## Entrada 2. Tamaño del logotipo en el menú móvil (respuesta incorrecta corregida)

- **Qué se pidió:** el tamaño de letra del logotipo «sintonía» para que midiera 128 × 32 px como en Figma.
- **Qué respondió la IA:** 22 px. La medida se había calculado con la fuente de sustitución del navegador, no con Syne.
- **Cómo se detectó el error:** en Dev Mode de Figma el texto mide 128,391 px de ancho; con Syne cargada, 22 px quedaba más ancho que el diseño.
- **Corrección:** 20 px con Syne real (128,4 px de ancho). Lección: medir siempre con las fuentes reales cargadas.

## Entrada 3. Estados de carga y error presentados como requisito (respuesta incorrecta corregida)

- **Qué se pidió:** qué faltaba para cumplir los requisitos del Sprint 1.
- **Qué respondió la IA:** incluyó los estados de carga y error como requisito del PDF.
- **Cómo se detectó el error:** al releer los criterios de aceptación del PDF, no se piden; solo los menciona el contrato de la API.
- **Corrección:** se descartaron para este sprint y se documentó la decisión en el README.

## Entrada 4. Álbumes destacados que no existen en la API

- **Qué se pidió:** mostrar en el Inicio los mismos 6 álbumes de Figma.
- **Qué se hizo con la IA:** se revisaron las 12 respuestas de `GET /generos/:id`. «Bajo el guadual» y «Cartas sin enviar» no existen, y «Kilómetro 41» es una canción, no un álbum.
- **Decisión:** no inventar datos. Se tomaron los 6 primeros elementos con `tipo: "album"` de los géneros, usando solo los endpoints que pide el PDF.

## Entrada 5. Catálogo con filtro en la URL

- **Qué se pidió:** construir `/catalogo` con el género elegido en la URL (`?genero=gen_andina`).
- **Qué aportó la IA:** el uso de `useSearchParams` de React Router para leer el filtro, y pasar `null` a `useRecurso` para no hacer la petición cuando no hay género.
- **Verificación:** se probaron los 12 géneros en español e inglés a 390, 768 y 1440 px, recargando la página, con el botón «Atrás» y con un id inexistente (muestra «No encontrado»).

## Entrada 6. Posición del panel de accesibilidad en escritorio (respuesta incorrecta corregida)

- **Qué se pidió:** que el panel de accesibilidad se abriera en escritorio debajo de su botón, como en Figma.
- **Qué respondió la IA:** colocar el `<dialog>` con márgenes fijos (`margin: 80px 40px auto auto`).
- **Cómo se detectó el error:** al probarlo en el navegador, el panel aparecía en el centro de la pantalla. Un `<dialog>` abierto con `showModal()` se centra por defecto, y la posición fija tampoco dependía de dónde estuviera el botón.
- **Corrección:** al abrirse, el panel mide la posición real del botón con `getBoundingClientRect()` y se coloca con `top` y `right` (variables CSS `--panel-arriba` y `--panel-derecha`). Se comprobó a 900, 1440 y 1920 px.

## Entrada 7. Conflicto de Git después de un «Squash and merge»

- **Qué pasó:** tras mergear el PR del panel con «Squash and merge», se siguió trabajando en la misma rama y el PR siguiente mostraba conflictos _add/add_ en los mismos archivos.
- **Explicación obtenida con la IA:** el squash crea en `main` un commit nuevo con el mismo contenido, pero Git no lo reconoce como el mismo cambio.
- **Solución:** crear una rama nueva desde `main` actualizado (`fix/panel-accesibilidad`), traer solo los archivos del arreglo con `git checkout <rama> -- <archivos>` y abrir un PR limpio (#16). Lección: después de un squash, empezar una rama nueva.
