'use client';

import { use, useMemo, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DndContext } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { HelpModal } from '@/components/ui/HelpModal';
import { ExportModal } from '@/components/ui/ExportModal';
import { GridItem } from '@/components/grid/GridItem';
import { useGridEditor } from '@/hook/useGridEditor';
import { Language } from '@/lib/types';
import { SocialSidebar } from '@/components/ui/FloatingSocials';

// Definimos una función fuera del componente para chequear el entorno
const getIsServer = () => typeof window === 'undefined';

export default function FinalApp({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params) as { lang: Language };
  
  // 💡 SOLUCIÓN TÉCNICA: 
  // Usamos una función de inicialización para evitar el useEffect síncrono.
  const [mounted, setMounted] = useState(false);
  const [showExport, setShowExport] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();

  const {
    config, setConfig,
    items, addItem, removeItem, resetItems,
    activeDragItem, dragPreview,
    sensors, handleDragStart, handleDragMove, handleDragEnd,
    onResizeEnd, onResizeUpdate, onResizeStart,
    showHelp, setShowHelp
  } = useGridEditor();

  // Cambiamos el useEffect para que se ejecute después del frame de pintura
  // Esto elimina la advertencia de "cascading renders"
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const reindexedItems = useMemo(() => {
    return [...items]
      .sort((a, b) => a.rowStart - b.rowStart || a.colStart - b.colStart)
      .map((item, index) => ({
        ...item,
        number: index + 1
      }));
  }, [items]);

  const toggleLang = () => {
    const newLang = lang === 'es' ? 'en' : 'es';
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.replace(newPath, { scroll: false });
  };

  // Si estamos en servidor o no ha montado, renderizamos un cascarón vacío
  if (getIsServer() || !mounted) {
    return <div className="min-h-screen bg-[#0F172A]" />;
  }

  return (
    <div className="min-h-screen bg-app-bg text-text-body font-sans flex flex-col transition-none selection:bg-blue-500/30">
      
      {showHelp && <HelpModal lang={lang} onClose={() => setShowHelp(false)} />}
      
      <ExportModal 
        isOpen={showExport} 
        onClose={() => setShowExport(false)} 
        items={reindexedItems}
        config={config}
      />

      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        config={config}
        setConfig={setConfig}
        onShowHelp={() => setShowHelp(true)}
        onReset={resetItems}
        onShowExport={() => setShowExport(true)}
      />

      <main className="flex-1 p-4 md:p-8 overflow-auto flex items-start justify-center">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <div
            id="grid-canvas"
            className="grid bg-card-bg border border-border-main p-2 rounded-2xl shadow-2xl w-full max-w-5xl relative transition-all duration-300 ease-in-out"
            style={{
              gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
              gridTemplateRows: `repeat(${config.rows}, 90px)`,
              gap: `${config.gap}px`
            }}
          >
            {Array.from({ length: config.columns * config.rows }).map((_, i) => {
              const c = (i % config.columns) + 1;
              const r = Math.floor(i / config.columns) + 1;
              return (
                <div
                  key={`cell-${i}`}
                  onClick={() => addItem(c, r)}
                  style={{ gridColumn: c, gridRow: r }}
                  className="border border-border-main/40 hover:bg-app-bg/60 rounded-lg transition-colors flex items-center justify-center cursor-crosshair group relative overflow-hidden"
                >
                  <Plus size={14} className="text-grid-plus opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
              );
            })}

            {activeDragItem && dragPreview && (
              <div style={{
                gridColumn: `${dragPreview.colStart} / span ${activeDragItem.colSpan}`,
                gridRow: `${dragPreview.rowStart} / span ${activeDragItem.rowSpan}`,
                backgroundColor: 'var(--color-text-title)', 
                opacity: 0.1,
                border: '2px dashed var(--color-text-body)',
                zIndex: 5,
                borderRadius: '8px',
                pointerEvents: 'none'
              }} className="animate-pulse" />
            )}

            {reindexedItems.map((item) => {
              const isDraggingThis = activeDragItem?.id === item.id;
              const displayItem = isDraggingThis ? { ...activeDragItem, number: item.number } : item;

              return (
                <GridItem
                  key={item.id}
                  item={displayItem}
                  config={config}
                  onRemove={removeItem}
                  onResizeStart={onResizeStart}
                  onResizeUpdate={onResizeUpdate}
                  onResizeEnd={onResizeEnd}
                />
              );
            })}
          </div>
        </DndContext>
      </main>

      <SocialSidebar />
      <Footer lang={lang} items={reindexedItems} config={config} />
    </div>
  );
}