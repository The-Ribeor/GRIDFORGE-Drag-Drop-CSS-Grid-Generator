'use client';

import { DndContext } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { HelpModal } from '@/components/ui/HelpModal';
import { GridItem } from '@/components/grid/GridItem';
import { useGridEditor } from '@/hook/useGridEditor';


export default function FinalApp() {
  const {
    config, setConfig,
    items, addItem, removeItem, resetItems,
    activeDragItem, dragPreview,
    sensors, handleDragStart, handleDragMove, handleDragEnd,
    onResizeEnd,
    showHelp, setShowHelp
  } = useGridEditor();

  return (
    <div className="min-h-screen bg-[#1E293B] text-slate-300 font-sans flex flex-col">
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
      
      <Navbar 
        config={config} 
        setConfig={setConfig} 
        onShowHelp={() => setShowHelp(true)} 
        onReset={resetItems} 
      />

      <main className="flex-1 p-8 overflow-auto">
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragMove={handleDragMove} onDragEnd={handleDragEnd}>
          <div id="grid-canvas" className="grid bg-[#0F172A] border border-slate-800 p-2 rounded-2xl shadow-2xl mx-auto w-full max-w-5xl relative"
            style={{ 
              gridTemplateColumns: `repeat(${config.columns}, 1fr)`, 
              gridTemplateRows: `repeat(${config.rows}, 90px)`, 
              gap: `${config.gap}px` 
            }}>
            
            {/* Fondo de la cuadrícula (Celdas vacías) */}
            {Array.from({ length: config.columns * config.rows }).map((_, i) => {
              const c = (i % config.columns) + 1, r = Math.floor(i / config.columns) + 1;
              return (
                <div key={`cell-${i}`} onClick={() => addItem(c, r)} style={{ gridColumn: c, gridRow: r }} className="border border-slate-800/50 hover:bg-slate-800/40 rounded-lg transition-all flex items-center justify-center cursor-crosshair group shadow-inner">
                  <Plus size={14} className="text-slate-800/30 group-hover:text-slate-600" />
                </div>
              );
            })}

            {/* Preview de lo que se está arrastrando */}
            {activeDragItem && dragPreview && (
              <div style={{
                gridColumn: `${dragPreview.colStart} / span ${activeDragItem.colSpan}`,
                gridRow: `${dragPreview.rowStart} / span ${activeDragItem.rowSpan}`,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '2px dashed rgba(255, 255, 255, 0.2)',
                zIndex: 5, borderRadius: '8px', pointerEvents: 'none'
              }} />
            )}

            {/* Los elementos reales del Grid */}
            {items.map(item => (
              <GridItem 
                key={item.id} 
                item={item} 
                config={config} 
                onRemove={removeItem} 
                onResizeEnd={onResizeEnd} 
              />
            ))}
          </div>
        </DndContext>
      </main>

      <Footer items={items} config={config} />
    </div>
  );
}