'use client';

import { use, useMemo, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DndContext } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { HelpModal } from '@/components/ui/HelpModal';
import { GridItem } from '@/components/grid/GridItem';
import { useGridEditor } from '@/hook/useGridEditor';
import { Language } from '@/lib/types';
import { SocialSidebar } from '@/components/ui/FloatingSocials';

export default function FinalApp({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params) as { lang: Language };
  const [mounted, setMounted] = useState(false);
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

  // Bloqueo de hidratación para evitar parpadeos
  useEffect(() => {
    setMounted(true);
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
    // replace y scroll: false mantienen la posición y suavizan el cambio
    router.replace(newPath, { scroll: false });
  };

  // Si no ha montado, mostramos el color de fondo oscuro de tu app para evitar el flash blanco
  if (!mounted) return <div className="min-h-screen bg-[#0F172A]" />;

  return (
    <div className="min-h-screen bg-app-bg text-text-body font-sans flex flex-col transition-none">
      {showHelp && <HelpModal lang={lang} onClose={() => setShowHelp(false)} />}

      <Navbar
        lang={lang}
        onToggleLang={toggleLang}
        config={config}
        setConfig={setConfig}
        onShowHelp={() => setShowHelp(true)}
        onReset={resetItems}
      />

      <main className="flex-1 p-8 overflow-auto">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        >
          <div
            id="grid-canvas"
            className="grid bg-card-bg border border-border-main p-2 rounded-2xl shadow-2xl mx-auto w-full max-w-5xl relative"
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
                  className="border border-border-main/50 hover:bg-app-bg/50 rounded-lg transition-all flex items-center justify-center cursor-crosshair group shadow-inner"
                >
                  <Plus size={14} className="text-grid-plus group-hover:text-blue-500 transition-colors" />
                </div>
              );
            })}

            {activeDragItem && dragPreview && (
              <div style={{
                gridColumn: `${dragPreview.colStart} / span ${activeDragItem.colSpan}`,
                gridRow: `${dragPreview.rowStart} / span ${activeDragItem.rowSpan}`,
                backgroundColor: 'var(--color-text-title)', 
                opacity: 0.08,
                border: '2px dashed var(--color-text-body)',
                zIndex: 5,
                borderRadius: '8px',
                pointerEvents: 'none'
              }} />
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

      <SocialSidebar/>
      <Footer lang={lang} items={reindexedItems} config={config} />
    </div>
  );
}