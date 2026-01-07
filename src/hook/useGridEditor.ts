'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { DragStartEvent, DragMoveEvent, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { GridConfig, GridElement } from '@/lib/types';
import { resolveDisplacement } from '@/lib/grid-utils';

export function useGridEditor() {
  // 1. Inicialización Lazy (Sin efectos de carga)
  const [config, setConfig] = useState<GridConfig>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gridforge_config_v2');
      return saved ? JSON.parse(saved) : { columns: 5, rows: 5, gap: 8 };
    }
    return { columns: 5, rows: 5, gap: 8 };
  });

  const [items, setItems] = useState<GridElement[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gridforge_items_v2');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const [activeDragItem, setActiveDragItem] = useState<GridElement | null>(null);
  const [dragPreview, setDragPreview] = useState<{ colStart: number, rowStart: number } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const originalItemsRef = useRef<GridElement[]>([]);

  // 2. Persistencia (Solo para guardar)
  useEffect(() => {
    localStorage.setItem('gridforge_items_v2', JSON.stringify(items));
    localStorage.setItem('gridforge_config_v2', JSON.stringify(config));
  }, [items, config]);

  /**
   * 💡 SOLUCIÓN MAESTRA: Estado Derivado
   * En lugar de un useEffect que "limpia" y causa errores de cascada,
   * calculamos los items válidos en cada render. Es mucho más rápido y sin errores.
   */
  const validItems = items.filter(item => 
    item.colStart <= config.columns && item.rowStart <= config.rows
  ).map(item => ({
    ...item,
    colSpan: Math.min(item.colSpan, config.columns - item.colStart + 1),
    rowSpan: Math.min(item.rowSpan, config.rows - item.rowStart + 1),
  }));

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } }), 
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
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

    if (newColStart !== dragPreview?.colStart || newRowStart !== dragPreview?.rowStart) {
      setDragPreview({ colStart: newColStart, rowStart: newRowStart });
      // Usamos validItems para la lógica de desplazamiento
      setItems(resolveDisplacement(originalItemsRef.current, { ...activeDragItem, colStart: newColStart, rowStart: newRowStart }, config));
    }
  };

  const handleDragEnd = () => {
    setActiveDragItem(null);
    setDragPreview(null);
    originalItemsRef.current = [];
  };

  const onResizeStart = useCallback(() => { originalItemsRef.current = [...items]; }, [items]);
  
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

  const resetItems = () => {
    setItems([]);
    setConfig({ columns: 5, rows: 5, gap: 8 });
    localStorage.removeItem('gridforge_items_v2');
    localStorage.removeItem('gridforge_config_v2');
  };

  return {
    config, setConfig, 
    items: validItems, // 👈 Devolvemos validItems en lugar de items
    addItem, removeItem, resetItems,
    activeDragItem, dragPreview, sensors, handleDragStart, handleDragMove, handleDragEnd,
    onResizeEnd, onResizeUpdate, onResizeStart,
    showHelp, setShowHelp
  };
}