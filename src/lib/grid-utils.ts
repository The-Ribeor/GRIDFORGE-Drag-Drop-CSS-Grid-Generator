import { GridElement, GridConfig } from './types';

export const resolveDisplacement = (
  items: GridElement[],
  movedItem: GridElement,
  config: GridConfig
): GridElement[] => {
  // 1. Asegurar que el elemento movido/redimensionado esté dentro de los límites de columnas
  // pero permitimos que crezca en filas si es necesario, el límite lo pondrá la limpieza final
  const safeItem = {
    ...movedItem,
    colSpan: Math.max(1, Math.min(movedItem.colSpan, config.columns - movedItem.colStart + 1)),
    rowSpan: Math.max(1, movedItem.rowSpan), 
  };

  // 2. Creamos copias de los elementos para trabajar sobre ellas
  const currentItems = items.map(i => (i.id === safeItem.id ? { ...safeItem } : { ...i }));

  let changed = true;
  let attempts = 0;
  const MAX_ATTEMPTS = 200; // Aumentamos intentos para layouts complejos

  // 3. Algoritmo de resolución de colisiones por empuje
  while (changed && attempts < MAX_ATTEMPTS) {
    changed = false;
    attempts++;

    for (const a of currentItems) {
      for (const b of currentItems) {
        if (a.id === b.id) continue;

        // Comprobar colisión
        const hasCollision =
          a.colStart < b.colStart + b.colSpan &&
          a.colStart + a.colSpan > b.colStart &&
          a.rowStart < b.rowStart + b.rowSpan &&
          a.rowStart + a.rowSpan > b.rowStart;

        if (hasCollision) {
          // El elemento "a" siempre empuja al elemento "b" hacia abajo
          // Lo movemos exactamente a la fila donde termina "a"
          const newRowStart = a.rowStart + a.rowSpan;
          if (b.rowStart !== newRowStart) {
            b.rowStart = newRowStart;
            changed = true;
          }
        }
      }
    }
  }

  // 4. Limpieza final:
  // Solo eliminamos elementos que, tras el empuje, quedaron TOTALMENTE fuera de la grilla definida.
  // Si quieres que la grilla crezca automáticamente, podrías quitar el filtro.
  return currentItems.filter(item => {
    const isOutOfBounds = item.rowStart > config.rows;
    return !isOutOfBounds;
  });
};