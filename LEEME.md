# Entre Telas — sitio web

Sitio estático ultraliviano (HTML + CSS + JS vanilla). Sin frameworks ni build step. Listo para subir a cualquier hosting estático (Netlify, Vercel, hosting tradicional, etc.).

## Antes de publicar — actualizar 4 cosas

### 1. Número de WhatsApp
[script.js](script.js#L8) — variable `WSP_NUMERO`.
Formato internacional sin "+" ni espacios. Ejemplo: `5491133334444`.

### 2. Dominio real
Reemplazar `https://entretelas-home.com/` en:
- [index.html](index.html) — etiquetas `og:url`, `og:image`, `twitter:image`, `canonical`, JSON-LD
- [sitemap.xml](sitemap.xml)
- [robots.txt](robots.txt)

### 3. Datos del negocio (JSON-LD LocalBusiness)
[index.html](index.html) — bloque `<script type="application/ld+json">`:
- `telephone` — teléfono real
- `address.addressLocality` — ciudad
- `sameAs` — sumar URLs de Instagram, Facebook, Google Business si las hay

### 4. Logo
Por ahora se usa un monograma "eT" generado por SVG inline. Si tenés un logo, reemplazar:
- favicon (etiqueta `<link rel="icon">` en index.html)
- las apariciones de `<span class="brand-mark">eT</span>`

## Probar localmente

Doble click en `index.html` o, mejor, levantar un server estático para que funcione todo bien:
```bash
# desde la carpeta entre-telas
python -m http.server 8000
# y abrir http://localhost:8000
```

## SEO ya implementado

- Meta title + description optimizados
- Open Graph + Twitter Card
- Canonical
- robots.txt + sitemap.xml (con imágenes)
- Schema.org `LocalBusiness` y `WebSite`
- HTML semántico (header / main / section / article / footer)
- alt en todas las imágenes
- `loading="lazy"` + `width`/`height` para evitar CLS
- `fetchpriority="high"` en imagen del hero
- `preconnect` y `preload` para fuentes y hero
- `lang="es-AR"`, `theme-color`
- skip link de accesibilidad

## Performance

- Sin frameworks, sin build, sin dependencias JS externas
- CSS y JS minimizables con cualquier herramienta si se quiere ir más allá
- Imágenes traídas tal cual de WhatsApp — si querés bajar todavía más el peso, exportar a WebP/AVIF y reducir a ~1600px de ancho máximo

## Estructura

```
entre-telas/
├── index.html
├── styles.css
├── script.js
├── robots.txt
├── sitemap.xml
├── LEEME.md
└── images/
    ├── hero-cortinas-living-comedor.jpg
    ├── cortinas-tela-living-amplio.jpg
    ├── cortinado-tela-natural-living.jpg
    ├── cortina-tela-dormitorio-jardin.jpg
    ├── cortina-roller-blackout-dormitorio.jpg
    ├── cortina-roller-blackout-bajada.jpg
    ├── cortina-roller-screen-azul.jpg
    ├── cortina-roller-screen-detalle.jpg
    ├── cortina-combinada-roller-tela.jpg
    ├── cortina-combinada-dormitorio-jardin.jpg
    ├── cortina-combinada-tela-roller.jpg
    ├── cortina-tela-luz-natural.jpg
    ├── cortina-tela-sheer-detalle.jpg
    ├── cortinado-tela-clasica.jpg
    ├── cortina-roller-dormitorio-noche.jpg
    └── cortina-roller-screen-estudio.jpg
```
