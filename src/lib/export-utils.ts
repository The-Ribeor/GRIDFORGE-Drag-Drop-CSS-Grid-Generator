import { GridElement, GridConfig } from './types';

export const generateCode = (items: GridElement[], config: GridConfig, mode: 'css' | 'tailwind') => {
  if (mode === 'tailwind') {
    // Generamos el contenedor con valores dinámicos
    const container = `grid grid-cols-[repeat(${config.columns},_minmax(0,_1fr))] grid-rows-[repeat(${config.rows},_minmax(0,_1fr))] gap-[${config.gap}px]`;
    
    const itemsHtml = items.map(item => {
      // Traducimos posición a clases arbitrarias de Tailwind
      const position = `col-[${item.colStart}/span_${item.colSpan}] row-[${item.rowStart}/span_${item.rowSpan}]`;
      return `  <div class="${position} bg-blue-500 rounded-lg flex items-center justify-center text-white p-4">
    ${item.number}
  </div>`;
    }).join('\n');

    return `<div class="${container}">\n${itemsHtml}\n</div>`;
  }

  // Generación en CSS estándar
  const cssStyles = items.map(item => `.item-${item.number} {
  grid-area: ${item.rowStart} / ${item.colStart} / span ${item.rowSpan} / span ${item.colSpan};
}`).join('\n');

  return `<style>\n.grid-container {\n  display: grid;\n  grid-template-columns: repeat(${config.columns}, 1fr);\n  gap: ${config.gap}px;\n}\n${cssStyles}\n</style>`;
};