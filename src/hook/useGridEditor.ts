'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { DragStartEvent, DragMoveEvent, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { GridConfig, GridElement } from '@/lib/types';
import { resolveDisplacement } from '@/lib/grid-utils';

export function useGridEditor() {
  const [config, setConfig] = useState<GridConfig>({ columns: 5, rows: 5, gap: 8 });
  const [items, setItems] = useState<GridElement[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<GridElement | null>(null);
  const [dragPreview, setDragPreview] = useState<{ colStart: number, rowStart: number } | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  
  const isHydrated = useRef(false);
  const originalItemsRef = useRef<GridElement[]>([]);

  useEffect(() => {
    const savedItems = localStorage.getItem('gridforge_items_v2');
    const savedConfig = localStorage.getItem('gridforge_config_v2');
    if (savedItems) {
      try {
        const parsed = JSON.parse(savedItems);
        if (parsed && parsed.length > 0) setItems(parsed);
      } catch (e) { console.error(e); }
    }
    if (savedConfig) {
      try { setConfig(JSON.parse(savedConfig)); } catch (e) { console.error(e); }
    }
    const timer = setTimeout(() => { isHydrated.current = true; }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHydrated.current) {
      localStorage.setItem('gridforge_items_v2', JSON.stringify(items));
      localStorage.setItem('gridforge_config_v2', JSON.stringify(config));
    }
  }, [items, config]);

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
      setItems(resolveDisplacement(originalItemsRef.current, { ...activeDragItem, colStart: newColStart, rowStart: newRowStart }, config));
    }
  };

  const handleDragEnd = () => {
    // Al soltar, simplemente limpiamos. 
    // El estado ya se actualizó en el último DragMove, así que el bloque ya está en su sitio.
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
    isHydrated.current = false;
    setItems([]);
    localStorage.removeItem('gridforge_items_v2');
    localStorage.removeItem('gridforge_config_v2');
    setTimeout(() => isHydrated.current = true, 50);
  };

  return {
    config, setConfig, items, addItem, removeItem, resetItems,
    activeDragItem, dragPreview, sensors, handleDragStart, handleDragMove, handleDragEnd,
    onResizeEnd, onResizeUpdate, onResizeStart,
    showHelp, setShowHelp
  };
}