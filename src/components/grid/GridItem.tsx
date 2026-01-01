import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { X } from 'lucide-react';
import { GridElement, GridConfig } from '@/lib/types';

interface GridItemProps {
  item: GridElement;
  config: GridConfig;
  onRemove: (id: string) => void;
  onResizeEnd: (id: string, colSpan: number, rowSpan: number) => void;
}

export const GridItem = React.memo(({ item, onRemove, onResizeEnd, config }: GridItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id });
  const [resizePreview, setResizePreview] = useState<{ col: number, row: number } | null>(null);

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    gridColumn: `${item.colStart} / span ${item.colSpan}`,
    gridRow: `${item.rowStart} / span ${item.rowSpan}`,
    zIndex: isDragging ? 50 : 10,
    transition: isDragging ? 'none' : 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const initialColSpan = item.colSpan;
    const initialRowSpan = item.rowSpan;
    setResizePreview({ col: initialColSpan, row: initialRowSpan });

    const onMouseMove = (mE: MouseEvent) => {
      const grid = document.getElementById('grid-canvas');
      if (!grid) return;
      const cw = grid.clientWidth / config.columns;
      const ch = 90 + config.gap;
      setResizePreview({
        col: Math.max(1, initialColSpan + Math.round((mE.clientX - startX) / cw)),
        row: Math.max(1, initialRowSpan + Math.round((mE.clientY - startY) / ch))
      });
    };

    const onMouseUp = (mE: MouseEvent) => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      onResizeEnd(item.id, 
        Math.max(1, initialColSpan + Math.round((mE.clientX - startX) / (document.getElementById('grid-canvas')!.clientWidth / config.columns))), 
        Math.max(1, initialRowSpan + Math.round((mE.clientY - startY) / (90 + config.gap)))
      );
      setResizePreview(null);
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
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
      <div ref={setNodeRef} style={style} className={`relative bg-[#334155] border border-slate-500 rounded-lg flex items-center justify-center text-2xl font-bold group ${isDragging ? 'shadow-2xl ring-2 ring-slate-400 z-50 opacity-90' : 'hover:border-slate-300 shadow-lg'}`}>
        <div {...listeners} {...attributes} className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing text-slate-100 italic">{item.number}</div>
        <button onClick={() => onRemove(item.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all z-[60] shadow-xl hover:scale-110 active:scale-95"><X size={10} /></button>
        <div onMouseDown={handleResizeStart} className="absolute bottom-0 right-0 w-10 h-10 cursor-nwse-resize z-[60] flex items-end justify-end p-2 rounded-br-lg">
          <div className="w-4 h-4 border-r-4 border-b-4 border-slate-400 group-hover:border-white transition-colors rounded-br-sm" />
        </div>
      </div>
    </>
  );
});
GridItem.displayName = 'GridItem';