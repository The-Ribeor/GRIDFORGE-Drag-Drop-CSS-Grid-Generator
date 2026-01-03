// import { useState, useCallback, useRef } from 'react';
// import { DragStartEvent, DragMoveEvent, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
// import { GridConfig, GridElement } from '@/lib/types';
// import { resolveDisplacement } from '@/lib/grid-utils';

// export function useGridEditor() {
//   const [config, setConfig] = useState<GridConfig>({ columns: 5, rows: 5, gap: 8 });
//   const [items, setItems] = useState<GridElement[]>([]);
//   const [activeDragItem, setActiveDragItem] = useState<GridElement | null>(null);
//   const [dragPreview, setDragPreview] = useState<{ colStart: number, rowStart: number } | null>(null);
//   const [showHelp, setShowHelp] = useState(false);
  
//   // Memoria temporal para permitir el efecto "elástico"
//   const originalItemsRef = useRef<GridElement[]>([]);

//   const sensors = useSensors(
//     useSensor(MouseSensor, { activationConstraint: { distance: 3 } }), 
//     useSensor(TouchSensor)
//   );

//   const handleDragStart = (e: DragStartEvent) => {
//     const item = items.find(i => i.id === e.active.id);
//     if (item) {
//       setActiveDragItem(item);
//       originalItemsRef.current = [...items]; // Guardamos copia
//     }
//   };

//   const handleDragMove = (e: DragMoveEvent) => {
//     if (!activeDragItem) return;
//     const grid = document.getElementById('grid-canvas');
//     if (!grid) return;
//     const cw = grid.clientWidth / config.columns;
//     const ch = 90 + config.gap;

//     const newColStart = Math.max(1, Math.min(activeDragItem.colStart + Math.round(e.delta.x / cw), config.columns - activeDragItem.colSpan + 1));
//     const newRowStart = Math.max(1, Math.min(activeDragItem.rowStart + Math.round(e.delta.y / ch), config.rows - activeDragItem.rowSpan + 1));

//     setDragPreview({ colStart: newColStart, rowStart: newRowStart });
    
//     // Calculamos siempre basado en la posición ORIGINAL antes del drag
//     setItems(resolveDisplacement(originalItemsRef.current, { ...activeDragItem, colStart: newColStart, rowStart: newRowStart }, config));
//   };

//   const handleDragEnd = () => {
//     setActiveDragItem(null);
//     setDragPreview(null);
//     originalItemsRef.current = [];
//   };

//   const onResizeStart = useCallback(() => {
//     originalItemsRef.current = [...items]; // Capturamos el estado antes de la deformación
//   }, [items]);

//   const onResizeUpdate = useCallback((id: string, colSpan: number, rowSpan: number) => {
//     const item = originalItemsRef.current.find(i => i.id === id);
//     if (!item) return;

//     // Calculamos el desplazamiento basándonos en la foto original de los items
//     const updatedItems = resolveDisplacement(originalItemsRef.current, { ...item, colSpan, rowSpan }, config);
//     setItems(updatedItems);
//   }, [config]);

//   const onResizeEnd = useCallback((id: string, colSpan: number, rowSpan: number) => {
//     onResizeUpdate(id, colSpan, rowSpan);
//     originalItemsRef.current = [];
//   }, [onResizeUpdate]);

//   const addItem = (c: number, r: number) => {
//     const nextNum = items.length > 0 ? Math.max(...items.map(it => it.number)) + 1 : 1;
//     if (!items.find(it => it.colStart === c && it.rowStart === r)) {
//       setItems(prev => [...prev, { id: crypto.randomUUID(), number: nextNum, colStart: c, colSpan: 1, rowStart: r, rowSpan: 1, color: '#fff' }]);
//     }
//   };

//   const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
//   const resetItems = () => setItems([]);

//   return {
//     config, setConfig, items, addItem, removeItem, resetItems,
//     activeDragItem, dragPreview, sensors, handleDragStart, handleDragMove, handleDragEnd,
//     onResizeEnd, onResizeUpdate, onResizeStart,
//     showHelp, setShowHelp
//   };
// }

import { useState, useCallback, useRef } from 'react';
import { DragStartEvent, DragMoveEvent, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { GridConfig, GridElement } from '@/lib/types';
import { resolveDisplacement } from '@/lib/grid-utils';

export function useGridEditor() {
  const [config, setConfig] = useState<GridConfig>({ columns: 5, rows: 5, gap: 8 });
  const [items, setItems] = useState<GridElement[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<GridElement | null>(null);
  const [dragPreview, setDragPreview] = useState<{ colStart: number, rowStart: number } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  
  const originalItemsRef = useRef<GridElement[]>([]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } }), 
    useSensor(TouchSensor)
  );

  const handleDragStart = (e: DragStartEvent) => {
    const item = items.find(i => i.id === e.active.id);
    if (item) {
      setActiveDragItem(item);
      originalItemsRef.current = [...items];
    }
  };

  const handleDragMove = (e: DragMoveEvent) => {
    if (!activeDragItem) return;
    const grid = document.getElementById('grid-canvas');
    if (!grid) return;
    
    const cw = grid.clientWidth / config.columns;
    const ch = 90 + config.gap;

    const newColStart = Math.max(1, Math.min(activeDragItem.colStart + Math.round(e.delta.x / cw), config.columns - activeDragItem.colSpan + 1));
    const newRowStart = Math.max(1, Math.min(activeDragItem.rowStart + Math.round(e.delta.y / ch), config.rows - activeDragItem.rowSpan + 1));

    setDragPreview({ colStart: newColStart, rowStart: newRowStart });
    
    // Actualizamos los otros items para que se aparten, pero el activo mantiene su ID en la posición original
    // para evitar el salto visual del transform
    setItems(resolveDisplacement(originalItemsRef.current, { ...activeDragItem, colStart: newColStart, rowStart: newRowStart }, config));
  };

  const handleDragEnd = (e: DragEndEvent) => {
    if (activeDragItem && dragPreview) {
      setItems(prev => resolveDisplacement(prev, {
        ...activeDragItem,
        colStart: dragPreview.colStart,
        rowStart: dragPreview.rowStart
      }, config));
    }
    setActiveDragItem(null);
    setDragPreview(null);
    originalItemsRef.current = [];
  };

  const onResizeStart = useCallback(() => {
    originalItemsRef.current = [...items];
  }, [items]);

  const onResizeUpdate = useCallback((id: string, colSpan: number, rowSpan: number) => {
    const item = originalItemsRef.current.find(i => i.id === id);
    if (!item) return;
    setItems(resolveDisplacement(originalItemsRef.current, { ...item, colSpan, rowSpan }, config));
  }, [config]);

  const onResizeEnd = useCallback((id: string, colSpan: number, rowSpan: number) => {
    onResizeUpdate(id, colSpan, rowSpan);
    originalItemsRef.current = [];
  }, [onResizeUpdate]);

  const addItem = (c: number, r: number) => {
    const nextNum = items.length > 0 ? Math.max(...items.map(it => it.number)) + 1 : 1;
    if (!items.find(it => it.colStart === c && it.rowStart === r)) {
      setItems(prev => [...prev, { id: crypto.randomUUID(), number: nextNum, colStart: c, colSpan: 1, rowStart: r, rowSpan: 1, color: '#fff' }]);
    }
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));
  const resetItems = () => setItems([]);

  return {
    config, setConfig, items, addItem, removeItem, resetItems,
    activeDragItem, dragPreview, sensors, handleDragStart, handleDragMove, handleDragEnd,
    onResizeEnd, onResizeUpdate, onResizeStart,
    showHelp, setShowHelp
  };
}