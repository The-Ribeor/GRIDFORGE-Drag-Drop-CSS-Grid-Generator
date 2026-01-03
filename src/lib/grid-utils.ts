import { GridElement, GridConfig } from './types';

export const resolveDisplacement = (
  items: GridElement[],
  activeItem: GridElement,
  config: GridConfig
): GridElement[] => {
  // 1. Forzar límites del elemento que el usuario está moviendo/redimensionando
  const safeActive = {
    ...activeItem,
    colSpan: Math.max(1, Math.min(activeItem.colSpan, config.columns - activeItem.colStart + 1)),
    rowSpan: Math.max(1, Math.min(activeItem.rowSpan, config.rows - activeItem.rowStart + 1)),
  };

  const resolved: GridElement[] = [safeActive];
  
  // Ordenamos los demás para procesarlos de arriba a abajo
  const otherItems = items
    .filter((i) => i.id !== safeActive.id)
    .sort((a, b) => a.rowStart - b.rowStart || a.colStart - b.colStart);

  for (const item of otherItems) {
    let current = { ...item };
    
    // Función auxiliar para verificar colisión con lo ya posicionado
    const checkCollision = (testItem: GridElement) => {
      return resolved.some((fixed) =>
        testItem.colStart < fixed.colStart + fixed.colSpan &&
        testItem.colStart + testItem.colSpan > fixed.colStart &&
        testItem.rowStart < fixed.rowStart + fixed.rowSpan &&
        testItem.rowStart + testItem.rowSpan > fixed.rowStart
      );
    };

    // --- ESTRATEGIA DE POSICIONAMIENTO ---
    
    // Paso 1: ¿Cabe en su posición original?
    const collision = checkCollision(current);
    
    if (collision) {
      // Paso 2: Intentar mover ABAJO (Prioridad 1)
      const downItem = { ...current };
      let canGoDown = false;
      
      // Buscamos el primer hueco disponible hacia abajo
      while (downItem.rowStart + downItem.rowSpan - 1 < config.rows) {
        downItem.rowStart++;
        if (!checkCollision(downItem)) {
          canGoDown = true;
          break;
        }
      }

      if (canGoDown) {
        current = downItem;
      } else {
        // Paso 3: Si no cupo abajo, intentar mover a la DERECHA (Prioridad 2)
        const rightItem = { ...current }; // Reset a posición original para probar derecha
        let canGoRight = false;

        while (rightItem.colStart + rightItem.colSpan - 1 < config.columns) {
          rightItem.colStart++;
          // Al mover a la derecha, también verificamos si hay colisión en esa nueva X
          if (!checkCollision(rightItem)) {
            canGoRight = true;
            break;
          }
        }

        if (canGoRight) {
          current = rightItem;
        } else {
          // Paso 4: No cupo abajo ni a la derecha dentro de los límites actuales -> ELIMINAR
          continue; // Salta al siguiente item sin añadir este a 'resolved'
        }
      }
    }

    // Verificar una última vez que el item final esté dentro de los límites dinámicos
    const finalWithinBounds = 
      current.colStart + current.colSpan - 1 <= config.columns &&
      current.rowStart + current.rowSpan - 1 <= config.rows;

    if (finalWithinBounds) {
      resolved.push(current);
    }
  }

  return resolved;
};