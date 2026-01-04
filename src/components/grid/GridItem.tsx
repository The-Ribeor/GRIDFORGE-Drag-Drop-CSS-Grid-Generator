// 'use client';

// import React, { useState } from 'react';
// import { useDraggable } from '@dnd-kit/core';
// import { X } from 'lucide-react';
// import { GridElement, GridConfig } from '@/lib/types';

// interface GridItemProps {
//   item: GridElement;
//   config: GridConfig;
//   onRemove: (id: string) => void;
//   onResizeEnd: (id: string, colSpan: number, rowSpan: number) => void;
//   onResizeUpdate: (id: string, colSpan: number, rowSpan: number) => void;
//   onResizeStart: () => void;
// }

// export const GridItem = React.memo(({ 
//   item, 
//   onRemove, 
//   onResizeEnd, 
//   onResizeUpdate, 
//   onResizeStart, 
//   config 
// }: GridItemProps) => {
//   const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id });
//   const [resizePreview, setResizePreview] = useState<{ col: number, row: number } | null>(null);

//   const colorClasses = ['bg-item-1', 'bg-item-2', 'bg-item-3', 'bg-item-4', 'bg-item-5'];
//   const selectedBgClass = colorClasses[(item.number - 1) % colorClasses.length];

//   const style: React.CSSProperties = {
//     // Si hay transform, lo aplicamos; si no, dejamos que el grid mande
//     transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
//     gridColumn: `${item.colStart} / span ${item.colSpan}`,
//     gridRow: `${item.rowStart} / span ${item.rowSpan}`,
//     zIndex: isDragging ? 100 : 10,
    
//     // TRANSICIÓN CRÍTICA:
//     // Durante el arrastre: 'none' para que siga al mouse sin lag.
//     // Al soltar: Una transición suave para que el bloque "vuele" a su posición final sin saltos.
//     transition: isDragging 
//       ? 'none' 
//       : 'transform 400ms cubic-bezier(0.18, 0.89, 0.32, 1.28), grid-area 0.2s ease',
    
//     opacity: isDragging ? 0.8 : 1,
//     scale: isDragging ? '1.02' : '1',
//     touchAction: 'none',
//   };

//   const handleResizeStart = (e: React.MouseEvent) => {
//     e.preventDefault(); e.stopPropagation(); onResizeStart();
//     const startX = e.clientX; const startY = e.clientY;
//     const initialColSpan = item.colSpan; const initialRowSpan = item.rowSpan;
//     const onMouseMove = (mE: MouseEvent) => {
//       const grid = document.getElementById('grid-canvas'); if (!grid) return;
//       const cw = grid.clientWidth / config.columns; const ch = 90 + config.gap;
//       const newCol = Math.max(1, initialColSpan + Math.round((mE.clientX - startX) / cw));
//       const newRow = Math.max(1, initialRowSpan + Math.round((mE.clientY - startY) / ch));
//       setResizePreview({ col: newCol, row: newRow }); onResizeUpdate(item.id, newCol, newRow);
//     };
//     const onMouseUp = () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); setResizePreview(null); };
//     window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp);
//   };

//   return (
//     <>
//       {resizePreview && (
//         <div style={{
//           gridColumn: `${item.colStart} / span ${resizePreview.col}`,
//           gridRow: `${item.rowStart} / span ${resizePreview.row}`,
//           backgroundColor: 'rgba(56, 189, 248, 0.15)',
//           border: '2px solid #38bdf8',
//           zIndex: 40, borderRadius: '8px', pointerEvents: 'none'
//         }} className="animate-pulse" />
//       )}

//       <div 
//         ref={setNodeRef} 
//         style={style} 
//         className={`relative ${selectedBgClass} border border-border-main rounded-lg flex items-center justify-center text-2xl font-bold group shadow-lg ${
//           isDragging ? 'shadow-2xl ring-2 ring-blue-500' : 'hover:border-blue-500'
//         }`}
//       >
//         <div {...listeners} {...attributes} className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing text-text-title italic select-none">
//           {item.number}
//         </div>
//         <button onClick={() => onRemove(item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all z-[60] shadow-xl">
//           <X size={10} />
//         </button>
//         <div onMouseDown={handleResizeStart} className="absolute bottom-0 right-0 w-10 h-10 cursor-nwse-resize z-[60] flex items-end justify-end p-2 rounded-br-lg">
//           <div className="w-4 h-4 border-r-4 border-b-4 border-border-main group-hover:border-blue-500 transition-colors" />
//         </div>
//       </div>
//     </>
//   );
// });

// GridItem.displayName = 'GridItem';


'use client';

import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { X } from 'lucide-react';
import { GridElement, GridConfig } from '@/lib/types';

interface GridItemProps {
  item: GridElement;
  config: GridConfig;
  onRemove: (id: string) => void;
  onResizeEnd: (id: string, colSpan: number, rowSpan: number) => void;
  onResizeUpdate: (id: string, colSpan: number, rowSpan: number) => void;
  onResizeStart: () => void;
}

export const GridItem = React.memo(({ 
  item, 
  onRemove, 
  onResizeEnd, 
  onResizeUpdate, 
  onResizeStart, 
  config 
}: GridItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id });
  const [resizePreview, setResizePreview] = useState<{ col: number, row: number } | null>(null);

  const colorClasses = ['bg-item-1', 'bg-item-2', 'bg-item-3', 'bg-item-4', 'bg-item-5'];
  const selectedBgClass = colorClasses[(item.number - 1) % colorClasses.length];

  const style: React.CSSProperties = {
    // Usamos translate3d para que el movimiento sea fluido con la GPU
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    gridColumn: `${item.colStart} / span ${item.colSpan}`,
    gridRow: `${item.rowStart} / span ${item.rowSpan}`,
    zIndex: isDragging ? 100 : 10,
    
    // ELIMINAMOS ANIMACIONES DE MOVIMIENTO
    // Solo dejamos transiciones para cambios de estado visual (hover, opacidad)
    transition: isDragging 
      ? 'none' 
      : 'opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
    
    opacity: isDragging ? 0.9 : 1,
    touchAction: 'none',
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation(); onResizeStart();
    const startX = e.clientX; const startY = e.clientY;
    const initialColSpan = item.colSpan; const initialRowSpan = item.rowSpan;
    const onMouseMove = (mE: MouseEvent) => {
      const grid = document.getElementById('grid-canvas'); if (!grid) return;
      const cw = grid.clientWidth / config.columns; const ch = 90 + config.gap;
      const newCol = Math.max(1, initialColSpan + Math.round((mE.clientX - startX) / cw));
      const newRow = Math.max(1, initialRowSpan + Math.round((mE.clientY - startY) / ch));
      setResizePreview({ col: newCol, row: newRow }); onResizeUpdate(item.id, newCol, newRow);
    };
    const onMouseUp = () => { window.removeEventListener('mousemove', onMouseMove); window.removeEventListener('mouseup', onMouseUp); setResizePreview(null); };
    window.addEventListener('mousemove', onMouseMove); window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      {resizePreview && (
        <div style={{
          gridColumn: `${item.colStart} / span ${resizePreview.col}`,
          gridRow: `${item.rowStart} / span ${resizePreview.row}`,
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          border: '2px solid #38bdf8',
          zIndex: 40, borderRadius: '8px', pointerEvents: 'none'
        }} className="animate-pulse" />
      )}

      <div 
        ref={setNodeRef} 
        style={style} 
        className={`relative ${selectedBgClass} border border-border-main rounded-lg flex items-center justify-center text-2xl font-bold group shadow-md ${
          isDragging ? 'shadow-2xl ring-2 ring-blue-500 cursor-grabbing' : 'hover:border-blue-500 cursor-grab'
        }`}
      >
        <div {...listeners} {...attributes} className="w-full h-full flex items-center justify-center select-none italic text-text-title">
          {item.number}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onRemove(item.id); }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all z-[60] shadow-xl hover:scale-110">
          <X size={10} />
        </button>
        <div onMouseDown={handleResizeStart} className="absolute bottom-0 right-0 w-8 h-8 cursor-nwse-resize z-[60] flex items-end justify-end p-1">
          <div className="w-3 h-3 border-r-2 border-b-2 border-border-main/50 group-hover:border-blue-500" />
        </div>
      </div>
    </>
  );
});

GridItem.displayName = 'GridItem';