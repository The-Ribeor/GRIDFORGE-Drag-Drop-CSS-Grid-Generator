import { useState, useCallback } from 'react';
import { DragStartEvent, DragMoveEvent, DragEndEvent, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { GridConfig, GridElement } from '@/lib/types';
import { resolveDisplacement } from '@/lib/grid-utils';

export function useGridEditor() {
  const [config, setConfig] = useState<GridConfig>({ columns: 5, rows: 5, gap: 8 });
  const [items, setItems] = useState<GridElement[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<GridElement | null>(null);
  const [dragPreview, setDragPreview] = useState<{ colStart: number, rowStart: number } | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } }), 
    useSensor(TouchSensor)
  );

  const handleDragStart = (e: DragStartEvent) => {
    const item = items.find(i => i.id === e.active.id);
    if (item) setActiveDragItem(item);
  };

  const handleDragMove = (e: DragMoveEvent) => {
    if (!activeDragItem) return;
    const grid = document.getElementById('grid-canvas');
    if (!grid) return;
    const cw = grid.clientWidth / config.columns;
    const ch = 90 + config.gap;
    setDragPreview({
      colStart: Math.max(1, Math.min(activeDragItem.colStart + Math.round(e.delta.x / cw), config.columns)),
      rowStart: Math.max(1, Math.min(activeDragItem.rowStart + Math.round(e.delta.y / ch), config.rows))
    });
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { delta } = e;
    if (activeDragItem && (delta.x !== 0 || delta.y !== 0)) {
      const grid = document.getElementById('grid-canvas');
      if (grid) {
        const cw = grid.clientWidth / config.columns;
        const ch = 90 + config.gap;
        setItems(prev => resolveDisplacement(prev, {
          ...activeDragItem,
          colStart: Math.max(1, Math.min(activeDragItem.colStart + Math.round(delta.x / cw), config.columns)),
          rowStart: Math.max(1, Math.min(activeDragItem.rowStart + Math.round(delta.y / ch), config.rows))
        }, config));
      }
    }
    setActiveDragItem(null);
    setDragPreview(null);
  };

  const addItem = (c: number, r: number) => {
    const nextNum = items.length > 0 ? Math.max(...items.map(it => it.number)) + 1 : 1;
    if (!items.find(it => it.colStart === c && it.rowStart === r)) {
      setItems(prev => [...prev, { id: crypto.randomUUID(), number: nextNum, colStart: c, colSpan: 1, rowStart: r, rowSpan: 1, color: '#fff' }]);
    }
  };

  const removeItem = (id: string) => setItems(prev => prev.filter(i => i.id !== id));

  const onResizeEnd = useCallback((id: string, colSpan: number, rowSpan: number) => {
    setItems(prev => {
      const item = prev.find(i => i.id === id);
      if (!item) return prev;
      return resolveDisplacement(prev, { ...item, colSpan, rowSpan }, config);
    });
  }, [config]);

  const resetItems = () => setItems([]);

  return {
    config, setConfig,
    items, addItem, removeItem, resetItems,
    activeDragItem, dragPreview,
    sensors, handleDragStart, handleDragMove, handleDragEnd,
    onResizeEnd,
    showHelp, setShowHelp
  };
}