'use client';

import React, { useState, useRef } from 'react';
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
  onResizeUpdate, 
  onResizeStart, 
  config 
}: GridItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id });
  const [resizePreview, setResizePreview] = useState<{ col: number, row: number } | null>(null);
  const [isSelected, setIsSelected] = useState(false); // Estado para selección manual en móvil
  const isResizing = useRef(false);

  const colorClasses = ['bg-item-1', 'bg-item-2', 'bg-item-3', 'bg-item-4', 'bg-item-5'];
  const selectedBgClass = colorClasses[(item.number - 1) % colorClasses.length];

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    gridColumn: `${item.colStart} / span ${item.colSpan}`,
    gridRow: `${item.rowStart} / span ${item.rowSpan}`,
    zIndex: isDragging || isSelected ? 100 : 10,
    transition: isDragging ? 'none' : 'opacity 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.1s ease',
    opacity: isDragging ? 0.8 : 1,
    touchAction: 'none',
  };

  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    isResizing.current = true;
    onResizeStart();

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const startX = clientX;
    const startY = clientY;
    const initialColSpan = item.colSpan;
    const initialRowSpan = item.rowSpan;

    const onMove = (moveEvent: MouseEvent | TouchEvent) => {
      const grid = document.getElementById('grid-canvas');
      if (!grid) return;

      const currentX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const cw = grid.clientWidth / config.columns;
      const ch = 90 + config.gap;

      const newCol = Math.max(1, initialColSpan + Math.round((currentX - startX) / cw));
      const newRow = Math.max(1, initialRowSpan + Math.round((currentY - startY) / ch));

      setResizePreview({ col: newCol, row: newRow });
      onResizeUpdate(item.id, newCol, newRow);
    };

    const onEnd = () => {
      isResizing.current = false;
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      setResizePreview(null);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
  };

  // Alternar selección al tocar/clicar (sin interrumpir el drag)
  const toggleSelection = (e: React.MouseEvent | React.TouchEvent) => {
    if (isResizing.current) return;
    setIsSelected(!isSelected);
  };

  return (
    <>
      {resizePreview && (
        <div style={{
          gridColumn: `${item.colStart} / span ${resizePreview.col}`,
          gridRow: `${item.rowStart} / span ${resizePreview.row}`,
          backgroundColor: 'rgba(56, 189, 248, 0.15)',
          border: '2px dashed #38bdf8',
          zIndex: 5, borderRadius: '8px', pointerEvents: 'none'
        }} className="animate-pulse" />
      )}

      <div 
        ref={setNodeRef} 
        style={style} 
        onPointerDown={() => {
            // Si el usuario empieza a tocar otro ítem, podríamos querer deseleccionar otros (opcional)
        }}
        className={`relative ${selectedBgClass} border rounded-lg flex items-center justify-center text-2xl font-bold group shadow-md transition-all ${
          isDragging || isSelected 
            ? 'shadow-2xl ring-2 ring-blue-500 border-blue-500 z-[50]' 
            : 'border-border-main hover:border-blue-500 cursor-grab'
        }`}
      >
        <div 
          {...listeners} 
          {...attributes} 
          onClick={toggleSelection}
          className="w-full h-full flex items-center justify-center select-none italic text-text-title"
        >
          {item.number}
        </div>

        {/* Controles: visibles en Hover (PC) o cuando isSelected es true (Móvil) */}
        <div className={`absolute inset-0 pointer-events-none transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
            
            {/* Botón X para eliminar */}
            <button 
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={(e) => { e.stopPropagation(); onRemove(item.id); }} 
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 pointer-events-auto z-[110] shadow-xl hover:scale-110 active:scale-90"
            >
              <X size={14} />
            </button>

            {/* Tirador para redimensionar */}
            <div 
              onMouseDown={handleResizeStart} 
              onTouchStart={handleResizeStart}
              className="absolute bottom-0 right-0 w-10 h-10 cursor-nwse-resize pointer-events-auto z-[110] flex items-end justify-end p-1"
            >
              <div className="w-4 h-4 border-r-[3px] border-b-[3px] border-blue-500 rounded-br-sm" />
            </div>
        </div>
      </div>
    </>
  );
});

GridItem.displayName = 'GridItem';