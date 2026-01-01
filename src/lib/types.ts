export type Language = 'es' | 'en';

export interface GridConfig {
  columns: number;
  rows: number;
  gap: number;
}

export interface GridElement {
  id: string;
  number: number;
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
  color: string;
}