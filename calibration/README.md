# Calibración Escena 01

Valores persistidos en el repo:

- `wine-layout.json` → `components/cinematic/wineSceneLayout.ts`

## Re-exportar hero (logo + carrusel)

Con `http://localhost:3000/es?director=true` — calibrá y mové un slider (se guarda en localStorage):

```bash
npm run hero-layout:export
npm run hero-layout:sync
```

O panel → Copiar JSON → `calibration/hero-layout.json` → `npm run hero-layout:sync`

Persiste en `components/experience-hero/heroLayoutProduction.ts` (layout 3D + `HERO_PANEL_COPY` textos/posición editorial).

## Re-exportar wine (Escena 01)

Con `http://localhost:3000/es?director=true`:

**Layout** — panel → Descargar JSON → `calibration/wine-layout.json`:

```bash
node scripts/sync-wine-layout.mjs calibration/wine-layout.json
```

O exportar layout desde Chrome (dev server activo):

```bash
npm run calibration:export
```
