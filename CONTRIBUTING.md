# Contribuir

## Internacionalización (`messages/`)

Los archivos en `messages/` deben estar guardados en **UTF-8** (sin BOM). Next.js con Turbopack rechaza secuencias que no son UTF-8 válido; un carácter acentuado mal codificado (por ejemplo Latin-1) puede romper el build.

Antes de un PR, ejecutá:

```bash
npm run check:i18n
```

Si `messages/it.json` (u otro) fue editado con codificación incorrecta, una conversión posible es leer el archivo como ISO-8859-1 y volver a guardarlo como UTF-8 (validando con `JSON.parse`). El script de comprobación solo valida; no modifica archivos.
