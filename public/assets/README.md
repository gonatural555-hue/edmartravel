# Edmar Travel — Asset Library

Biblioteca de assets para la experiencia de **storytelling cinematográfico por capas** de Edmar Travel
(Next.js App Router · TypeScript · Tailwind CSS).

Todo lo que viva aquí se sirve de forma estática desde `/assets/...`
(p. ej. `public/assets/scenes/wine-tours/backgrounds/wine-background-01.webp`
se referencia en el código como `/assets/scenes/wine-tours/backgrounds/wine-background-01.webp`).

> `public/assets/images/` ya existe y contiene las imágenes del sitio actual (productos, blog, hero
> tradicional, etc.). **No** se toca. Lo nuevo de la home cinematográfica vive bajo `scenes/`,
> `branding/`, `shared/` y `videos/`.

---

## Estructura de directorios

```txt
public/assets/
├── scenes/                       # Assets agrupados por escena cinematográfica (capítulo)
│   ├── wine-tours/               # Escena 01 — Wine Tours & Bodegas
│   ├── adventure-mendoza/        # Escena 02 — Adventure Mendoza (placeholder por ahora)
│   └── discover-mendoza/         # Escena 03 — Discover Mendoza (placeholder por ahora)
│       ├── backgrounds/          # Fondo a pantalla completa (cielo, montañas, horizonte)
│       ├── foreground/           # Plano base que sostiene la escena (mesa, sendero, suelo)
│       ├── props/                # Objetos protagonistas y atrezzo (botella, copa, quesos…)
│       ├── effects/              # Luz, sombras de contacto y partículas atmosféricas
│       └── ui/                   # Elementos de interfaz de la escena (cards del navigator, glow del CTA)
│
├── branding/                     # Identidad de marca reutilizable en todo el sitio
│   ├── logo/                     # Logotipos (claro/oscuro, horizontal/isotipo) en SVG/PNG
│   ├── icons/                    # Iconografía de marca y UI
│   └── favicons/                 # Favicons y app icons (favicon.ico, apple-touch-icon, etc.)
│
├── shared/                       # Recursos transversales compartidos entre escenas
│   ├── textures/                 # Texturas (papel, grano, ruido, madera)
│   ├── overlays/                 # Superposiciones (viñetas, oscurecidos, degradados de lectura)
│   ├── particles/                # Sprites de partículas reutilizables
│   ├── gradients/                # Degradados exportados como imagen
│   └── transitions/              # Máscaras / frames para transiciones entre capítulos
│
└── videos/                       # Recursos de vídeo
    ├── hero/                     # Vídeos de hero / portada
    ├── experiences/              # Clips de experiencias concretas
    └── backgrounds/              # Vídeos de fondo en bucle (ambiente)
```

Cada carpeta incluye un archivo `.gitkeep` para que Git versione la estructura aunque esté vacía.

---

## Propósito de cada subcarpeta de escena

Cada escena comparte siempre las mismas cinco capas para mantener un sistema de composición coherente:

| Capa | Rol | Ejemplos |
| --- | --- | --- |
| `backgrounds/` | Fondo a pantalla completa, ancla visual del capítulo. | Andes nevados, Potrerillos, portones del parque. |
| `foreground/` | Plano base sobre el que se apoya la escena. | Mesa de nogal, sendero, suelo urbano. |
| `props/` | Objeto/héroe y atrezzo en primer plano. | Botella, copa, tabla de quesos, caballo, scooter. |
| `effects/` | Luz, sombras de contacto y partículas. | Warm glow, contact shadow, partículas. |
| `ui/` | Interfaz propia de la escena. | Imágenes cuadradas de las cards del navigator, glow del CTA. |

---

## Mapa de assets — Escena 01 (Wine Tours & Bodegas)

Rutas exactas que el código ya referencia (vía `components/cinematic/cinematicAssets.ts`).
Sube los archivos finales con **estos nombres exactos**:

```txt
public/assets/scenes/wine-tours/backgrounds/
└── wine-background-01.webp

public/assets/scenes/wine-tours/foreground/
└── wine-table-foreground-01.png

public/assets/scenes/wine-tours/props/
├── wine-bottle-edmar-01.png
├── wine-glass-red-01.png
├── wine-cheese-board-01.png
├── wine-grapes-01.png
├── wine-dish-a-01.png
├── wine-dish-b-01.png
└── wine-napkin-knife-01.png

public/assets/scenes/wine-tours/effects/
├── wine-contact-shadow-01.png
├── wine-warm-glow-01.png
└── wine-atmospheric-particles-01.png

public/assets/scenes/wine-tours/ui/        # imágenes cuadradas de las cards del Experience Navigator
├── wine-card-luxury-01.jpg
├── wine-card-private-transfers-01.jpg
├── wine-card-valle-de-uco-01.jpg
└── wine-card-half-day-01.jpg
```

Mientras un archivo no exista, **la app no se rompe**: cada capa muestra un fallback visual
(degradado/etiqueta) hasta que subas el asset real.

---

## Convenciones de nombres

**Reglas obligatorias**

- Todo en **minúsculas**.
- Separar palabras con **guiones** (`-`). Nunca espacios ni guiones bajos (`_`).
- Nombres **descriptivos**; incluir la **escena/categoría** cuando aporte (`wine-…`, `adventure-…`).
- Numerar variantes con sufijo de **dos dígitos** (`-01`, `-02`, …).

**Patrón recomendado**

```txt
<escena>-<sujeto|rol>-<NN>.<ext>
```

**Ejemplos válidos**

```txt
wine-background-01.webp
wine-table-foreground-01.png
wine-bottle-edmar-01.png
wine-glass-red-01.png
wine-cheese-board-01.png
wine-grapes-01.png
wine-dish-a-01.png
wine-dish-b-01.png
wine-napkin-knife-01.png
wine-contact-shadow-01.png
wine-warm-glow-01.png
wine-atmospheric-particles-01.png
```

**Ejemplos NO válidos**

```txt
Wine Background 1.webp     # espacios y mayúsculas
wine_bottle.png            # guion bajo
WineGlass01.PNG            # camelCase y extensión en mayúsculas
```

---

## Formatos recomendados

| Tipo de asset | Formato | Motivo |
| --- | --- | --- |
| Fondos (sin transparencia) | `.webp` | Mejor compresión para imágenes grandes. |
| Foreground / props / effects (con transparencia) | `.png` (o `.webp` con alfa) | Conserva el canal alfa. |
| Cards del navigator | `.jpg` o `.webp` | Fotografía cuadrada sin transparencia. |
| Logos / iconos vectoriales | `.svg` | Escalable sin pérdida. |
| Vídeo | `.mp4` + `.webm` | Compatibilidad y compresión. |

---

## Notas de optimización

- **Fondos**: exportar a ~2560–3840 px de ancho para desktop; servir una variante recortada para móvil.
- **PNG con alfa**: comprimir (TinyPNG / `pngquant`) o usar `.webp` con alfa. Evitar PNG de 7000 px sin comprimir en producción.
- **`next/image`**: las capas se renderizan con `next/image` (`fill`). Usa `priority` **solo** en el fondo
  principal de la Escena 01; el resto carga de forma diferida.
- **Sin layout shift**: cada capa tiene contenedor posicionado con tamaño definido, así que cargar la
  imagen no desplaza la composición.
- **No precargar futuras escenas**: los assets de Adventure/Discover no se cargan hasta que esas
  escenas dejen de ser placeholders.
- **Partículas/efectos**: mantenerlos ligeros (overlays pequeños o tileables) para no penalizar el render.
```
