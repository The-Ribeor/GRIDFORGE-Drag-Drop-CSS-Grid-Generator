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

  // 1. CARGAR DATOS (Solo al montar el cliente)
  useEffect(() => {
    const savedItems = localStorage.getItem('gridforge_items');
    const savedConfig = localStorage.getItem('gridforge_config');
    
    if (savedItems) {
      try { setItems(JSON.parse(savedItems)); } catch (e) { console.error(e); }
    }
    if (savedConfig) {
      try { setConfig(JSON.parse(savedConfig)); } catch (e) { console.error(e); }
    }
    isHydrated.current = true;
  }, []);

  // 2. GUARDAR DATOS (Solo si ya se cargaron los previos)
  useEffect(() => {
    if (isHydrated.current) {
      localStorage.setItem('gridforge_items', JSON.stringify(items));
      localStorage.setItem('gridforge_config', JSON.stringify(config));
    }
  }, [items, config]);

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
  
  const resetItems = () => {
    setItems([]);
    localStorage.removeItem('gridforge_items');
    localStorage.removeItem('gridforge_config');
  };

  return {
    config, setConfig, items, addItem, removeItem, resetItems,
    activeDragItem, dragPreview, sensors, handleDragStart, handleDragMove, handleDragEnd,
    onResizeEnd, onResizeUpdate, onResizeStart,
    showHelp, setShowHelp
  };
}