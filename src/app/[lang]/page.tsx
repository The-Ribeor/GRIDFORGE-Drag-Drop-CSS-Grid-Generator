// 'use client';

// import { use } from 'react';
// import { useRouter, usePathname } from 'next/navigation';
// import { DndContext } from '@dnd-kit/core';
// import { Plus } from 'lucide-react';
// import { Navbar } from '@/components/ui/Navbar';
// import { Footer } from '@/components/ui/Footer';
// import { HelpModal } from '@/components/ui/HelpModal';
// import { GridItem } from '@/components/grid/GridItem';
// import { useGridEditor } from '@/hook/useGridEditor';
// import { Language } from '@/lib/types';

// export default function FinalApp({ params }: { params: Promise<{ lang: string }> }) {
//   const { lang } = use(params) as { lang: Language };
//   const router = useRouter();
//   const pathname = usePathname();

//   const {
//     config, setConfig,
//     items, addItem, removeItem, resetItems,
//     activeDragItem, dragPreview,
//     sensors, handleDragStart, handleDragMove, handleDragEnd,
//     onResizeEnd, onResizeUpdate, onResizeStart,
//     showHelp, setShowHelp
//   } = useGridEditor();

//   const toggleLang = () => {
//     const newLang = lang === 'es' ? 'en' : 'es';
//     const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
//     router.push(newPath);
//   };

//   return (
//     <div className="min-h-screen bg-[#1E293B] text-slate-300 font-sans flex flex-col">
//       {showHelp && <HelpModal lang={lang} onClose={() => setShowHelp(false)} />}
      
//       <Navbar 
//         lang={lang}
//         onToggleLang={toggleLang}
//         config={config} 
//         setConfig={setConfig} 
//         onShowHelp={() => setShowHelp(true)} 
//         onReset={resetItems} 
//       />

//       <main className="flex-1 p-8 overflow-auto">
//         <DndContext 
//           sensors={sensors} 
//           onDragStart={handleDragStart} 
//           onDragMove={handleDragMove} 
//           onDragEnd={handleDragEnd}
//         >
//           <div 
//             id="grid-canvas" 
//             className="grid bg-[#0F172A] border border-slate-800 p-2 rounded-2xl shadow-2xl mx-auto w-full max-w-5xl relative"
//             style={{ 
//               gridTemplateColumns: `repeat(${config.columns}, 1fr)`, 
//               gridTemplateRows: `repeat(${config.rows}, 90px)`, 
//               gap: `${config.gap}px` 
//             }}
//           >
            
//             {Array.from({ length: config.columns * config.rows }).map((_, i) => {
//               const c = (i % config.columns) + 1;
//               const r = Math.floor(i / config.columns) + 1;
//               return (
//                 <div 
//                   key={`cell-${i}`} 
//                   onClick={() => addItem(c, r)} 
//                   style={{ gridColumn: c, gridRow: r }} 
//                   className="border border-slate-800/50 hover:bg-slate-800/40 rounded-lg transition-all flex items-center justify-center cursor-crosshair group shadow-inner"
//                 >
//                   <Plus size={14} className="text-slate-800/30 group-hover:text-slate-600" />
//                 </div>
//               );
//             })}

//             {activeDragItem && dragPreview && (
//               <div style={{
//                 gridColumn: `${dragPreview.colStart} / span ${activeDragItem.colSpan}`,
//                 gridRow: `${dragPreview.rowStart} / span ${activeDragItem.rowSpan}`,
//                 backgroundColor: 'rgba(255, 255, 255, 0.08)',
//                 border: '2px dashed rgba(255, 255, 255, 0.3)',
//                 zIndex: 5, 
//                 borderRadius: '8px', 
//                 pointerEvents: 'none'
//               }} />
//             )}

//             {items
//               .sort((a, b) => a.rowStart - b.rowStart || a.colStart - b.colStart)
//               .map((item, index) => {
//                 // Durante el arrastre, el item activo debe mantener su "ancla" original en el grid
//                 // para que el transform de dnd-kit se calcule correctamente sin desfases.
//                 const isDraggingThis = activeDragItem?.id === item.id;
//                 const displayItem = isDraggingThis ? activeDragItem : item;

//                 return (
//                   <GridItem 
//                     key={item.id} 
//                     item={{ ...displayItem, number: index + 1 }}
//                     config={config} 
//                     onRemove={removeItem} 
//                     onResizeStart={onResizeStart}
//                     onResizeUpdate={onResizeUpdate}
//                     onResizeEnd={onResizeEnd}
//                   />
//                 );
//               })}
//           </div>
//         </DndContext>
//       </main>

//       <Footer lang={lang} items={items} config={config} />
//     </div>
//   );
// }

'use client';

import { use, useMemo } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { DndContext } from '@dnd-kit/core';
import { Plus } from 'lucide-react';
import { Navbar } from '@/components/ui/Navbar';
import { Footer } from '@/components/ui/Footer';
import { HelpModal } from '@/components/ui/HelpModal';
import { GridItem } from '@/components/grid/GridItem';
import { useGridEditor } from '@/hook/useGridEditor';
import { Language } from '@/lib/types';

export default function FinalApp({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params) as { lang: Language };
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

  // CALCULAMOS LOS ITEMS RENUMERADOS:
  // Esta constante asegura que tanto la visualización como el generador de código (Footer)
  // vean los mismos números basados en la posición actual.
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
    router.push(newPath);
  };

  return (
    <div className="min-h-screen bg-[#1E293B] text-slate-300 font-sans flex flex-col">
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
            className="grid bg-[#0F172A] border border-slate-800 p-2 rounded-2xl shadow-2xl mx-auto w-full max-w-5xl relative"
            style={{ 
              gridTemplateColumns: `repeat(${config.columns}, 1fr)`, 
              gridTemplateRows: `repeat(${config.rows}, 90px)`, 
              gap: `${config.gap}px` 
            }}
          >
            
            {/* Celdas de fondo */}
            {Array.from({ length: config.columns * config.rows }).map((_, i) => {
              const c = (i % config.columns) + 1;
              const r = Math.floor(i / config.columns) + 1;
              return (
                <div 
                  key={`cell-${i}`} 
                  onClick={() => addItem(c, r)} 
                  style={{ gridColumn: c, gridRow: r }} 
                  className="border border-slate-800/50 hover:bg-slate-800/40 rounded-lg transition-all flex items-center justify-center cursor-crosshair group shadow-inner"
                >
                  <Plus size={14} className="text-slate-800/30 group-hover:text-slate-600" />
                </div>
              );
            })}

            {/* Preview de arrastre */}
            {activeDragItem && dragPreview && (
              <div style={{
                gridColumn: `${dragPreview.colStart} / span ${activeDragItem.colSpan}`,
                gridRow: `${dragPreview.rowStart} / span ${activeDragItem.rowSpan}`,
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '2px dashed rgba(255, 255, 255, 0.3)',
                zIndex: 5, 
                borderRadius: '8px', 
                pointerEvents: 'none'
              }} />
            )}

            {/* Renderizado con items re-indexados */}
            {reindexedItems.map((item) => {
                const isDraggingThis = activeDragItem?.id === item.id;
                // Si se está arrastrando, mantenemos su posición visual original para evitar jitter
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

      {/* AHORA PASAMOS LOS ITEMS RE-INDEXADOS AL FOOTER */}
      <Footer lang={lang} items={reindexedItems} config={config} />
    </div>
  );
}