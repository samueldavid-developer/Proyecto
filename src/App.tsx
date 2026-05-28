import React, { useState, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from "recharts";
import {
  DollarSign, TrendingUp, Key, Building2, Users,
  Plus, Search, X, Edit2, Trash2, CheckCircle, Clock,
  MapPin, ChevronRight, LayoutDashboard, Receipt, BarChart2, Briefcase
} from "lucide-react";

// ==========================================
// 1. ESQUEMAS DE DATOS Y TIPOS (TYPESCRIPT)
// ==========================================
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

// ==========================================
// 2. MOCK DATA INICIAL DE ALTA CALIDAD
// ==========================================
const INITIAL_PROPERTIES: Property[] = [
  { id: "prop-1", nombre: "Penthouse El Poblado", tipo: "Apartamento", op: "Venta", precio: 450000, estado: "Disponible", ubicacion: "VALERA", area: 210, hab: 3, ban: 4, fecha: "2026-01-10" },
  { id: "prop-2", nombre: "Mansión UPTT", tipo: "Casa", op: "Venta", precio: 890000, estado: "Reservado", ubicacion: "Valera", area: 520, hab: 5, ban: 6, fecha: "2026-02-14" },
  { id: "prop-3", nombre: "Local Comercial Valera", tipo: "Local", op: "Alquiler", precio: 3500, estado: "Alquilado", ubicacion: "Trujillo", area: 85, hab: 0, ban: 2, fecha: "2026-03-01" },
  { id: "prop-4", nombre: "Oficina Corporativa Samuel", tipo: "Oficina", op: "Alquiler", precio: 2800, estado: "Disponible", ubicacion: "Trujillo", area: 110, hab: 0, ban: 2, fecha: "2026-03-15" },
  { id: "prop-5", nombre: "Casa zona Timometes", tipo: "Casa", op: "Venta", precio: 310000, estado: "Vendido", ubicacion: "Timotes", area: 280, hab: 4, ban: 4, fecha: "2026-04-02" },
];

const INITIAL_AGENTS: Agent[] = [
  { id: "ag-1", nombre: "Alejandro Mendoza", avatar: "AM", pctV: 3.0, pctA: 10.0, especialidad: "Propiedades de Lujo" },
  { id: "ag-2", nombre: "Valentina Diaz", avatar: "VR", pctV: 3.5, pctA: 12.0, especialidad: "Comercial & Oficinas" },
  { id: "ag-3", nombre: "Samuel Diaz", avatar: "SC", pctV: 2.8, pctA: 8.5, especialidad: "Residencial Familiar" },
];

const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: "tx-1", propId: "prop-5", tipo: "Venta", cliente: "Carlos Gomez", agenteId: "ag-1", valor: 310000, pct: 3.0, fecha: "2026-04-15", estado: "Completado" },
  { id: "tx-2", propId: "prop-3", tipo: "Alquiler", cliente: "Studio Contable SAS", agenteId: "ag-2", valor: 3500, pct: 12.0, fecha: "2026-05-01", estado: "Completado" },
  { id: "tx-3", propId: "prop-2", tipo: "Venta", cliente: "Mariana Silva", agenteId: "ag-3", valor: 890000, pct: 2.8, fecha: "2026-05-20", estado: "Pendiente" },
];

// Datos históricos para las gráficas
const GRAPH_DATA = [
  { name: "Ene", Ventas: 240000, Rentas: 4500, Comisiones: 8200 },
  { name: "Feb", Ventas: 410000, Rentas: 7200, Comisiones: 14300 },
  { name: "Mar", Ventas: 180000, Rentas: 9800, Comisiones: 6100 },
  { name: "Abr", Ventas: 650000, Rentas: 12500, Comisiones: 22800 },
  { name: "May", Ventas: 890000, Rentas: 15800, Comisiones: 31500 },
];

const METRIC_COLORS = ["#d4af37", "#38bdf8", "#34d399", "#fbbf24", "#f87171"];

// ==========================================
// 3. COMPONENTES ATÓMICOS DE DISEÑO UI
// ==========================================
function FormatMoney({ value }: { value: number }) {
  return <span>${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Disponible: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Reservado: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Vendido: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    Alquilado: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    Completado: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    Pendiente: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    Cancelado: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    Venta: "text-[#d4af37] bg-[#d4af37]/10 border-[#d4af37]/20",
    Alquiler: "text-sky-400 bg-sky-500/10 border-sky-500/20",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config[status] || "text-slate-400 bg-slate-500/10"}`}>
      {status}
    </span>
  );
}

// ==========================================
// 4. VISTA: DASHBOARD PRINCIPAL
// ==========================================
interface ViewProps {
  properties: Property[];
  transactions: Transaction[];
  agents: Agent[];
  setProperties: React.Dispatch<React.SetStateAction<Property[]>>;
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
}

function DashboardView({ properties, transactions, agents }: Omit<ViewProps, "setProperties" | "setTransactions">) {
  const stats = useMemo(() => {
    const completed = transactions.filter(t => t.estado === "Completado");
    return {
      totalComisiones: completed.reduce((acc, t) => acc + (t.valor * (t.pct / 100)), 0),
      volumenVentas: completed.filter(t => t.tipo === "Venta").reduce((acc, t) => acc + t.valor, 0),
      volumenRentas: completed.filter(t => t.tipo === "Alquiler").reduce((acc, t) => acc + t.valor, 0),
      propiedadesActivas: properties.filter(p => p.estado === "Disponible").length
    };
  }, [properties, transactions]);

  const pieData = useMemo(() => {
    const data: Record<string, number> = {};
    properties.forEach(p => { data[p.tipo] = (data[p.tipo] || 0) + 1; });
    return Object.entries(data).map(([name, value]) => ({ name, value }));
  }, [properties]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Panel de Control General</h1>
        <p className="text-sm text-slate-400 mt-1">Monitoreo financiero y control de activos globales.</p>
      </div>

      {/* Tarjetas de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-[#d4af37]" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Comisiones Netas</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-2"><FormatMoney value={stats.totalComisiones} /></h3>
            </div>
            <div className="p-2 bg-[#d4af37]/10 rounded-lg text-[#d4af37]"><DollarSign size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-sky-500" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Cierre en Ventas</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-2"><FormatMoney value={stats.volumenVentas} /></h3>
            </div>
            <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400"><TrendingUp size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-emerald-500" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Volumen Alquileres</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-2"><FormatMoney value={stats.volumenRentas} /></h3>
            </div>
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400"><Key size={20} /></div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[3px] bg-purple-500" />
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Stock Disponible</p>
              <h3 className="text-2xl font-bold text-slate-100 mt-2">{stats.propiedadesActivas} <span className="text-xs text-slate-400 font-normal">Unidades</span></h3>
            </div>
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Building2 size={20} /></div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 lg:col-span-2">
          <h3 className="text-base font-bold text-slate-200 mb-4">Crecimiento y Proyección Mensual</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GRAPH_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={v => `$${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f1f5f9" }} />
                <Legend />
                <Area type="monotone" dataKey="Ventas" stroke="#d4af37" fill="#d4af37" fillOpacity={0.1} strokeWidth={2} />
                <Area type="monotone" dataKey="Comisiones" stroke="#34d399" fill="#34d399" fillOpacity={0.05} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <h3 className="text-base font-bold text-slate-200 mb-2">Composición del Portafolio</h3>
          <div className="h-48 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={5} dataKey="value">
                  {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={METRIC_COLORS[index % METRIC_COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 border-t border-slate-800 pt-3">
            {pieData.map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: METRIC_COLORS[idx % METRIC_COLORS.length] }} />
                <span>{item.name}: <strong>{item.value}</strong></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Historial Corto */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-base font-bold text-slate-200 mb-4">Últimas Operaciones Auditadas</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 pb-2">
                <th className="py-2 font-medium">Cliente</th>
                <th className="py-2 font-medium">Operación</th>
                <th className="py-2 font-medium">Monto Total</th>
                <th className="py-2 font-medium">Asesor Comercial</th>
                <th className="py-2 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {transactions.slice(-3).reverse().map(t => (
                <tr key={t.id}>
                  <td className="py-3 font-semibold">{t.cliente}</td>
                  <td className="py-3"><StatusBadge status={t.tipo} /></td>
                  <td className="py-3 text-[#d4af37] font-bold"><FormatMoney value={t.valor} /></td>
                  <td className="py-3 text-slate-400">{agents.find(a => a.id === t.agenteId)?.nombre || "Externo"}</td>
                  <td className="py-3"><StatusBadge status={t.estado} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 5. VISTA: PORTAFOLIO DE INMUEBLES
// ==========================================
function PropiedadesView({ properties, setProperties }: ViewProps) {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProp, setEditingProp] = useState<Property | null>(null);

  // Estados explicitos e independientes para el formulario (Anti-Errores TS)
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<Property["tipo"]>("Apartamento");
  const [op, setOp] = useState<Property["op"]>("Venta");
  const [precio, setPrecio] = useState("");
  const [estado, setEstado] = useState<Property["estado"]>("Disponible");
  const [ubicacion, setUbicacion] = useState("");
  const [area, setArea] = useState("");
  const [hab, setHab] = useState("");
  const [ban, setBan] = useState("");

  const filtered = properties.filter(p =>
    p.nombre.toLowerCase().includes(search.toLowerCase()) ||
    p.ubicacion.toLowerCase().includes(search.toLowerCase())
  );

  const openCreateModal = () => {
    setEditingProp(null);
    setNombre(""); setTipo("Apartamento"); setOp("Venta"); setPrecio("");
    setEstado("Disponible"); setUbicacion(""); setArea(""); setHab(""); setBan("");
    setIsModalOpen(true);
  };

  const openEditModal = (p: Property) => {
    setEditingProp(p);
    setNombre(p.nombre); setTipo(p.tipo); setOp(p.op); setPrecio(p.precio.toString());
    setEstado(p.estado); setUbicacion(p.ubicacion); setArea(p.area.toString());
    setHab(p.hab.toString()); setBan(p.ban.toString());
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const dataModel: Property = {
      id: editingProp ? editingProp.id : `prop-${Date.now()}`,
      nombre, tipo, op, estado, ubicacion,
      precio: Number(precio) || 0,
      area: Number(area) || 0,
      hab: Number(hab) || 0,
      ban: Number(ban) || 0,
      fecha: editingProp ? editingProp.fecha : new Date().toISOString().split("T")[0]
    };

    if (editingProp) {
      setProperties(prev => prev.map(item => item.id === editingProp.id ? dataModel : item));
    } else {
      setProperties(prev => [...prev, dataModel]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Está seguro de que desea eliminar este inmueble de forma permanente?")) {
      setProperties(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Catálogo de Activos</h1>
          <p className="text-sm text-slate-400 mt-1">Gestión integral del inventario de bienes raíces.</p>
        </div>
        <button onClick={openCreateModal} className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#b8962e] text-slate-950 font-bold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer self-start sm:self-auto shadow-lg shadow-[#d4af37]/10">
          <Plus size={16} /> Registrar Inmueble
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input type="text" placeholder="Filtrar por nombre, ciudad o código..." value={search} onChange={e => setSearch(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 outline-none focus:border-[#d4af37] transition-all" />
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shadow-xl">
        <table className="w-full border-collapse text-sm text-left">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs border-b border-slate-800">
            <tr>
              <th className="p-4 font-semibold">Propiedad</th>
              <th className="p-4 font-semibold">Tipo / Operación</th>
              <th className="p-4 font-semibold">Precio Base</th>
              <th className="p-4 font-semibold">Dimensiones</th>
              <th className="p-4 font-semibold">Estado</th>
              <th className="p-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-slate-100">{p.nombre}</div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} /> {p.ubicacion}</div>
                </td>
                <td className="p-4">
                  <span className="block text-slate-200">{p.tipo}</span>
                  <div className="mt-1"><StatusBadge status={p.op} /></div>
                </td>
                <td className="p-4 font-bold text-[#d4af37] text-base"><FormatMoney value={p.precio} /></td>
                <td className="p-4 text-slate-400">{p.area} m² <span className="text-slate-600 block text-xs">{p.hab} Hab · {p.ban} Baños</span></td>
                <td className="p-4"><StatusBadge status={p.estado} /></td>
                <td className="p-4 text-center">
                  <div className="inline-flex items-center gap-2">
                    <button onClick={() => openEditModal(p)} className="p-1.5 text-[#d4af37] hover:bg-slate-800 border border-slate-800 rounded-lg cursor-pointer transition-colors" title="Editar"><Edit2 size={14} /></button>
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 text-rose-400 hover:bg-slate-800 border border-slate-800 rounded-lg cursor-pointer transition-colors" title="Eliminar"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL RESPONSIVO PARA CREAR/EDITAR PROPIEDADES */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSave} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 text-left shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-[#d4af37]">{editingProp ? "Modificar Ficha de Activo" : "Registrar Nuevo Inmueble"}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Nombre Comercial</label>
                <input required type="text" value={nombre} onChange={e => setNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#d4af37] outline-none" placeholder="Ej: Penthouse Luxury 101" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Ubicación / Dirección</label>
                <input required type="text" value={ubicacion} onChange={e => setUbicacion(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#d4af37] outline-none" placeholder="Ej: Poblado, las acasias" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Precio de Lista (USD)</label>
                  <input required type="number" value={precio} onChange={e => setPrecio(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#d4af37] outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Área Total (m²)</label>
                  <input required type="number" value={area} onChange={e => setArea(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#d4af37] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Habitaciones</label>
                  <input required type="number" value={hab} onChange={e => setHab(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#d4af37] outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Baños</label>
                  <input required type="number" value={ban} onChange={e => setBan(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#d4af37] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Tipo</label>
                  <select value={tipo} onChange={e => setTipo(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200">
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Local">Local</option>
                    <option value="Oficina">Oficina</option>
                    <option value="Lote">Lote</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Operación</label>
                  <select value={op} onChange={e => setOp(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200">
                    <option value="Venta">Venta</option>
                    <option value="Alquiler">Alquiler</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Estado</label>
                  <select value={estado} onChange={e => setEstado(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200">
                    <option value="Disponible">Disponible</option>
                    <option value="Reservado">Reservado</option>
                    <option value="Vendido">Vendido</option>
                    <option value="Alquilado">Alquilado</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-sm transition-colors cursor-pointer">Cancelar</button>
              <button type="submit" className="flex-[2] py-2.5 bg-[#d4af37] hover:bg-[#b8962e] text-slate-950 font-bold rounded-xl text-sm transition-colors cursor-pointer">Preservar Registro</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. VISTA: CONTROL DE TRANSACCIONES (CIERRES)
// ==========================================
function TransaccionesView({ transactions, setTransactions, properties, agents }: ViewProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estados explicitos para Formulario de Cierres
  const [cliente, setCliente] = useState("");
  const [propId, setPropId] = useState(properties[0]?.id || "");
  const [tipo, setTipo] = useState<Transaction["tipo"]>("Venta");
  const [agenteId, setAgenteId] = useState(agents[0]?.id || "");
  const [valor, setValor] = useState("");
  const [pct, setPct] = useState(agents[0]?.pctV || 3);
  const [estado, setEstado] = useState<Transaction["estado"]>("Pendiente");

  const handleAgentSelection = (id: string) => {
    setAgenteId(id);
    const ag = agents.find(a => a.id === id);
    if (ag) setPct(tipo === "Venta" ? ag.pctV : ag.pctA);
  };

  const handleSaveTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      propId, tipo, cliente, agenteId, estado,
      valor: Number(valor) || 0,
      pct: Number(pct) || 0,
      fecha: new Date().toISOString().split("T")[0]
    };

    setTransactions(prev => [...prev, newTx]);
    setIsModalOpen(false);
    setCliente(""); setValor("");
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Desea revocar esta transacción de las auditorías contables?")) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const toggleStatus = (id: string) => {
    setTransactions(prev => prev.map(t => {
      if (t.id === id) {
        const next: Transaction["estado"] = t.estado === "Pendiente" ? "Completado" : "Pendiente";
        return { ...t, estado: next };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Cierres y Operaciones</h1>
          <p className="text-sm text-slate-400 mt-1">Libro de contabilidad de operaciones comerciales firmadas.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#b8962e] text-slate-950 font-bold px-4 py-2 rounded-xl text-sm cursor-pointer transition-colors shadow-lg shadow-[#d4af37]/10">
          <Plus size={16} /> Nueva Transacción
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shadow-xl">
        <table className="w-full border-collapse text-sm text-left">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs border-b border-slate-800">
            <tr>
              <th className="p-4 font-semibold">Cliente / Comprador</th>
              <th className="p-4 font-semibold">Inmueble Vinculado</th>
              <th className="p-4 font-semibold">Modalidad</th>
              <th className="p-4 font-semibold">Monto Bruto</th>
              <th className="p-4 font-semibold">Comisión Generada</th>
              <th className="p-4 font-semibold">Asesor Asignado</th>
              <th className="p-4 font-semibold">Estado de Pago</th>
              <th className="p-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {transactions.map(t => {
              const matchedProp = properties.find(p => p.id === t.propId);
              const matchedAgent = agents.find(a => a.id === t.agenteId);
              return (
                <tr key={t.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-4 font-bold text-slate-100">{t.cliente}</td>
                  <td className="p-4 text-slate-400">{matchedProp ? matchedProp.nombre : "Desconocido"}</td>
                  <td className="p-4"><StatusBadge status={t.tipo} /></td>
                  <td className="p-4 font-semibold"><FormatMoney value={t.valor} /></td>
                  <td className="p-4">
                    <span className="text-[#d4af37] font-bold"><FormatMoney value={t.valor * (t.pct / 100)} /></span>
                    <span className="text-slate-500 block text-xs">({t.pct}%)</span>
                  </td>
                  <td className="p-4 text-slate-400">{matchedAgent ? matchedAgent.nombre : "Externo"}</td>
                  <td className="p-4"><StatusBadge status={t.estado} /></td>
                  <td className="p-4 text-center">
                    <div className="inline-flex items-center gap-2">
                      <button onClick={() => toggleStatus(t.id)} className="p-1.5 text-emerald-400 hover:bg-slate-800 border border-slate-800 rounded-lg cursor-pointer transition-colors" title="Cambiar Estado">
                        {t.estado === "Pendiente" ? <CheckCircle size={14} /> : <Clock size={14} />}
                      </button>
                      <button onClick={() => handleDelete(t.id)} className="p-1.5 text-rose-400 hover:bg-slate-800 border border-slate-800 rounded-lg cursor-pointer transition-colors" title="Eliminar"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MODAL TRANSACCIONES */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <form onSubmit={handleSaveTransaction} className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4 text-left shadow-2xl animate-scaleUp">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-[#d4af37]">Registrar Cierre de Operación</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-200 cursor-pointer"><X size={20} /></button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Nombre del Cliente</label>
                <input required type="text" value={cliente} onChange={e => setCliente(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#d4af37] outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Asociar Inmueble del Stock</label>
                <select value={propId} onChange={e => setPropId(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200">
                  {properties.map(p => <option key={p.id} value={p.id}>{p.nombre} ({p.op})</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Modalidad Contrato</label>
                  <select value={tipo} onChange={e => setTipo(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200">
                    <option value="Venta">Venta</option>
                    <option value="Alquiler">Alquiler</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Asesor Ejecutor</label>
                  <select value={agenteId} onChange={e => handleAgentSelection(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200">
                    {agents.map(a => <option key={a.id} value={a.id}>{a.nombre}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Valor de Cierre (USD)</label>
                  <input required type="number" value={valor} onChange={e => setValor(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:border-[#d4af37] outline-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Comisión (%)</label>
                  <input required type="number" step="0.1" value={pct} onChange={e => setPct(Number(e.target.value))} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-[#d4af37] font-bold focus:border-[#d4af37] outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1 uppercase tracking-wider">Estado Inicial</label>
                <select value={estado} onChange={e => setEstado(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-sm text-slate-200">
                  <option value="Pendiente">Pendiente</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-slate-800">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium rounded-xl text-sm cursor-pointer">Cancelar</button>
              <button type="submit" className="flex-[2] py-2.5 bg-[#d4af37] hover:bg-[#b8962e] text-slate-950 font-bold rounded-xl text-sm cursor-pointer">Establecer Contrato</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. VISTA: TABLA LIQUIDACIÓN DE COMISIONES
// ==========================================
function ComisionesView({ transactions, agents }: Omit<ViewProps, "setProperties" | "setTransactions">) {
  const agentCommissions = useMemo(() => {
    return agents.map(agent => {
      const activeTxs = transactions.filter(t => t.agenteId === agent.id && t.estado === "Completado");
      const totalEarned = activeTxs.reduce((sum, t) => sum + (t.valor * (t.pct / 100)), 0);
      const volume = activeTxs.reduce((sum, t) => sum + t.valor, 0);
      return {
        ...agent,
        earned: totalEarned,
        count: activeTxs.length,
        volume: volume
      };
    });
  }, [transactions, agents]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Honorarios y Comisiones</h1>
        <p className="text-sm text-slate-400 mt-1">Liquidación contable basada estrictamente en cierres efectivos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 lg:col-span-2">
          <h3 className="text-base font-bold text-slate-200 mb-4">Métricas Comparativas por Asesor</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={agentCommissions}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="nombre" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={v => `$${v}`} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155" }} />
                <Bar dataKey="earned" name="Comisión Retenida" fill="#d4af37" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-center items-center text-center">
          <div className="p-3 bg-[#d4af37]/10 text-[#d4af37] rounded-full mb-3"><Briefcase size={24} /></div>
          <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold">Total Desembolsado Asesores</span>
          <h2 className="text-3xl font-black text-slate-100 mt-2">
            <FormatMoney value={agentCommissions.reduce((s, a) => s + a.earned, 0)} />
          </h2>
          <p className="text-xs text-slate-500 mt-2 max-w-[200px]">Auditoría de nómina interna generada de forma automatizada.</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shadow-xl">
        <table className="w-full border-collapse text-sm text-left">
          <thead className="bg-slate-950 text-slate-400 uppercase text-xs border-b border-slate-800">
            <tr>
              <th className="p-4 font-semibold">Asesor Comercial</th>
              <th className="p-4 font-semibold">Especialidad</th>
              <th className="p-4 font-semibold">Cierres Totales</th>
              <th className="p-4 font-semibold">Volumen Colocado</th>
              <th className="p-4 font-semibold">Tasas Pactadas</th>
              <th className="p-4 font-semibold text-right">Comisión Devengada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {agentCommissions.map(a => (
              <tr key={a.id} className="hover:bg-slate-800/20 transition-colors">
                <td className="p-4 font-bold text-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-[#d4af37]">
                    {a.avatar}
                  </div>
                  {a.nombre}
                </td>
                <td className="p-4 text-slate-400">{a.especialidad}</td>
                <td className="p-4 font-medium text-slate-200">{a.count} operaciones exitosas</td>
                <td className="p-4 text-slate-400"><FormatMoney value={a.volume} /></td>
                <td className="p-4 text-xs text-slate-500">Venta: {a.pctV}% <br /> Renta: {a.pctA}%</td>
                <td className="p-4 text-right font-black text-lg text-[#d4af37]"><FormatMoney value={a.earned} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 8. VISTA: INFORMES CONSOLIDADOS
// ==========================================
function ReportesView({ transactions, properties }: Omit<ViewProps, "setProperties" | "setTransactions">) {
  const financialSummary = useMemo(() => {
    const done = transactions.filter(t => t.estado === "Completado");
    const totalV = done.filter(t => t.tipo === "Venta").reduce((s, t) => s + t.valor, 0);
    const totalR = done.filter(t => t.tipo === "Alquiler").reduce((s, t) => s + t.valor, 0);
    return {
      totalV,
      totalR,
      pipelinePotencial: properties.filter(p => p.estado === "Disponible" || p.estado === "Reservado").reduce((s, p) => s + p.precio, 0),
      countV: properties.filter(p => p.estado === "Vendido").length,
      countR: properties.filter(p => p.estado === "Alquilado").length,
    };
  }, [transactions, properties]);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">Estados y Balances</h1>
        <p className="text-sm text-slate-400 mt-1">Reporte corporativo consolidado para la junta directiva.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37]" /> Estado Analítico de Ingresos
          </h3>
          <div className="flex justify-between text-sm"><span className="text-slate-400">Facturación Bruta por Ventas</span><span className="font-bold text-slate-200"><FormatMoney value={financialSummary.totalV} /></span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-400">Facturación Bruta por Arrendamiento</span><span className="font-bold text-slate-200"><FormatMoney value={financialSummary.totalR} /></span></div>
          <div className="flex justify-between text-base font-bold text-[#d4af37] border-t border-slate-800/80 pt-3"><span>Valor Total Movilizado</span><span><FormatMoney value={financialSummary.totalV + financialSummary.totalR} /></span></div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest border-b border-slate-800 pb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-400" /> Rendimiento de Activos
          </h3>
          <div className="flex justify-between text-sm"><span className="text-slate-400">Pipeline de Activos en Stock</span><span className="font-bold text-slate-200"><FormatMoney value={financialSummary.pipelinePotencial} /></span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-400">Unidades Colocadas en Venta</span><span className="font-bold text-sky-400">{financialSummary.countV} Inmuebles</span></div>
          <div className="flex justify-between text-sm"><span className="text-slate-400">Unidades Colocadas en Alquiler</span><span className="font-bold text-purple-400">{financialSummary.countR} Inmuebles</span></div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. NÚCLEO ARQUITECTÓNICO PRINCIPAL (APP)
// ==========================================
export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  
  // Estado Unificado Global para sincronización de vistas en tiempo real
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const agents = INITIAL_AGENTS;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      
      {/* BARRA DE NAVEGACIÓN LATERAL (SIDEBAR CORPORATIVO) */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 text-left">
        <div className="p-6 border-b border-slate-800">
          <div className="text-[#008cff] text-lg font-black tracking-widest flex items-center gap-2">
            <Building2 size={20} /> VIVIENDA PROPIA
          </div>
          <div className="text-[10px] text-slate-500 tracking-[3px] mt-1 font-bold uppercase"></div>
        </div>
        
        <nav className="p-4 flex-1 space-y-1.5">
          {[
            { id: "dashboard", label: "Dashboard", Icon: LayoutDashboard },
            { id: "propiedades", label: "Portafolio Activos", Icon: Building2 },
            { id: "transacciones", label: "Cierres y Operaciones", Icon: Receipt },
            { id: "comisiones", label: "Liquidaciones", Icon: Users },
            { id: "reportes", label: "Estados Financieros", Icon: BarChart2 },
          ].map(item => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl border text-xs cursor-pointer text-left font-semibold transition-all duration-200
                  ${isActive 
                    ? "bg-[#d4af37]/10 border-[#d4af37]/30 text-[#00c3ff] shadow-inner" 
                    : "bg-transparent border-transparent text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
              >
                <item.Icon size={16} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={14} className="text-[#d4af37]" />}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800 text-[11px] text-slate-600 font-mono tracking-wider">
          Enterprise v2.0.4 · 2026
        </div>
      </aside>

      {/* CONTENEDOR FLUIDO DE INFORMACIÓN DE TRABAJO */}
      <main className="flex-1 overflow-y-auto px-8 py-8 box-border">
        <div className="max-w-6xl mx-auto">
          {currentTab === "dashboard" && (
            <DashboardView properties={properties} transactions={transactions} agents={agents} />
          )}
          {currentTab === "propiedades" && (
            <PropiedadesView properties={properties} setProperties={setProperties} transactions={transactions} agents={agents} />
          )}
          {currentTab === "transacciones" && (
            <TransaccionesView transactions={transactions} setTransactions={setTransactions} properties={properties} agents={agents} />
          )}
          {currentTab === "comisiones" && (
            <ComisionesView transactions={transactions} agents={agents} properties={properties} setProperties={setProperties} setTransactions={setTransactions} />
          )}
          {currentTab === "reportes" && (
            <ReportesView transactions={transactions} properties={properties} agents={agents} setProperties={setProperties} setTransactions={setTransactions} />
          )}
        </div>
      </main>
    </div>
  );
}