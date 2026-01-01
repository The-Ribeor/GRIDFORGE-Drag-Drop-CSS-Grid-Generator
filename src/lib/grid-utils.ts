import { GridElement, GridConfig } from './types';

export const resolveDisplacement = (
  items: GridElement[],
  movedItem: GridElement,
  config: GridConfig
): GridElement[] => {
  const safeItem = {
    ...movedItem,
    colSpan: Math.max(1, Math.min(movedItem.colSpan, config.columns - movedItem.colStart + 1)),
    rowSpan: Math.max(1, Math.min(movedItem.rowSpan, config.rows - movedItem.rowStart + 1)),
  };

  const newItems = items.map(i => i.id === safeItem.id ? safeItem : i);
  const otherItems = newItems.filter(i => i.id !== safeItem.id);
  const processingOrder = [safeItem, ...otherItems];

  let changed = true;
  let attempts = 0;

  while (changed && attempts < 100) {
    changed = false;
    attempts++;
    for (let i = 0; i < processingOrder.length; i++) {
      for (let j = 0; j < processingOrder.length; j++) {
        if (i === j) continue;
        const a = processingOrder[i];
        const b = processingOrder[j];
        const hasCollision = 
          a.colStart < b.colStart + b.colSpan &&
          a.colStart + a.colSpan > b.colStart &&
          a.rowStart < b.rowStart + b.rowSpan &&
          a.rowStart + a.rowSpan > b.rowStart;

        if (hasCollision) {
          b.rowStart += 1;
          changed = true;
        }
      }
    }
  }

  return items.map(original => {
    const updated = processingOrder.find(p => p.id === original.id);
    return updated && updated.rowStart <= config.rows ? updated : original;
  }).filter(item => item.rowStart <= config.rows);
};