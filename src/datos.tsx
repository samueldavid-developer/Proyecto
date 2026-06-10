// ==========================================
// 1. ESQUEMAS DE DATOS Y TIPOS (TYPESCRIPT)
// ========================================

export interface Property {
  id: string;
  nombre: string;
  tipo: "Casa" | "Apartamento" | "Local" | "Oficina" | "Lote";
  op: "Venta" | "Alquiler";
  precio: number;
  estado: "Disponible" | "Reservado" | "Vendido" | "Alquilado";
  ubicacion: string;
  area: number;
  hab: number;
  ban: number;
  fecha: string;
}

export interface Agent {
  id: string;
  nombre: string;
  avatar: string;
  pctV: number; // Porcentaje comisión en ventas
  pctA: number; // Porcentaje comisión en alquileres
  especialidad: string;
}

export interface Transaction {
  id: string;
  propId: string;
  tipo: "Venta" | "Alquiler";
  cliente: string;
  agenteId: string;
  valor: number;
  pct: number;
  fecha: string;
  estado: "Pendiente" | "Completado" | "Cancelado";
}
