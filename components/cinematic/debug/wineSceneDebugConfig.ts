/**
 * Re-exporta layout del hero para el panel de calibración.
 */
export {
  WINE_SCENE_LAYOUT as WINE_SCENE_DEBUG_DEFAULTS,
  WINE_LAYOUT_LAYER_ID as WINE_DEBUG_LAYER_ID,
  WINE_LAYOUT_LAYER_LABEL as WINE_DEBUG_LAYER_LABEL,
  WINE_LAYOUT_LAYER_ORDER as WINE_DEBUG_LAYER_ORDER,
  wineLayoutKeyFromLayerId as wineDebugKeyFromLayerId,
  wineLayoutToStyle as wineDebugValuesToStyle,
  type WineLayoutLayerKey as WineDebugLayerKey,
  type WineLayerLayout as WineLayerDebugValues,
} from "../wineSceneLayout";
