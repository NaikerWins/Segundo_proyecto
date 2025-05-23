import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as TooltipPie,
  Legend as LegendPie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as TooltipBar,
  Legend as LegendBar,
  LineChart,
  Line,
  XAxis as XAxisLine,
  YAxis as YAxisLine,
  CartesianGrid as CartesianGridLine,
  Tooltip as TooltipLine,
  Legend as LegendLine,
} from "recharts";

import { useEffect, useState } from "react";
import { Toolbar } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
// const WIDTH = 400;
// const HEIGHT = 300;
// const PIE_OUTER_RADIUS = 100;

// --- Gráficos circulares ---

export function GraficoCircular1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { name: "Marketing", value: 35 },
      { name: "Ventas", value: 40 },
      { name: "Producción", value: 25 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <TooltipPie />
      <LegendPie />
    </PieChart>
  );
}

export function GraficoCircular2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { name: "Diseño", value: 50 },
      { name: "Desarrollo", value: 30 },
      { name: "QA", value: 20 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={40}
        outerRadius={70}
        fill="#8884d8"
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <TooltipPie />
      <LegendPie />
    </PieChart>
  );
}

export function GraficoCircular3() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { name: "Administración", value: 45 },
      { name: "RRHH", value: 35 },
      { name: "Operaciones", value: 20 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <PieChart width={300} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        startAngle={180}
        endAngle={0}
        outerRadius={80}
        label
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[(index + 1) % COLORS.length]} />
        ))}
      </Pie>
      <TooltipPie />
      <LegendPie />
    </PieChart>
  );
}

// --- Gráficos de barras ---
// Ahora reciben la data como prop


  export function GraficoBarras1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { name: "Enero", ventas: 120 },
      { name: "Febrero", ventas: 180 },
      { name: "Marzo", ventas: 150 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <BarChart
      width={350}
      height={250}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <TooltipBar />
      <LegendBar />
      <Bar dataKey="ventas" fill="#8884d8" />
    </BarChart>
  );
}

export function GraficoBarras2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { name: "Abril", ventas: 90 },
      { name: "Mayo", ventas: 180 },
      { name: "Junio", ventas: 140 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <BarChart
      width={350}
      height={250}
      data={data}
      margin={{ top: 10, right: 20, left: 15, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis dataKey="name" />
      <YAxis />
      <TooltipBar />
      <LegendBar />
      <Bar dataKey="ventas" fill="#00C49F" />
    </BarChart>
  );
}


export function GraficoBarras3() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { name: "Julio", ventas: 110 },
      { name: "Agosto", ventas: 170 },
      { name: "Septiembre", ventas: 130 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <BarChart
      width={350}
      height={250}
      data={data}
      margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      layout="vertical"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis dataKey="name" type="category" />
      <TooltipBar />
      <LegendBar />
      <Bar dataKey="ventas" fill="#FF8042" />
    </BarChart>
  );
}

// --- Gráficos de series temporales ---

export function GraficoSeries1() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { fecha: "2024-01-01", valor: 10 },
      { fecha: "2024-01-02", valor: 15 },
      { fecha: "2024-01-03", valor: 20 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <LineChart
      width={350}
      height={220}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="fecha" />
      <YAxis />
      <TooltipLine />
      <LegendLine />
      <Line type="monotone" dataKey="valor" stroke="#8884d8" />
    </LineChart>
  );
}

export function GraficoSeries2() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { fecha: "2024-02-01", valor: 12 },
      { fecha: "2024-02-02", valor: 18 },
      { fecha: "2024-02-03", valor: 22 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <LineChart
      width={350}
      height={220}
      data={data}
      margin={{ top: 10, right: 30, left: 15, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="2 2" />
      <XAxis dataKey="fecha" />
      <YAxis />
      <TooltipLine />
      <LegendLine />
      <Line type="monotone" dataKey="valor" stroke="#FF8042" />
    </LineChart>
  );
}
export function GraficoSeries3() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔹 Datos estáticos para probar sin API
    const ejemploData = [
      { fecha: "2024-03-01", valor: 14 },
      { fecha: "2024-03-02", valor: 20 },
      { fecha: "2024-03-03", valor: 25 },
    ];

    setData(ejemploData); // 📌 Cargar datos manualmente
    setLoading(false); // ✅ Desactivar el estado de carga
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <LineChart
      width={350}
      height={220}
      data={data}
      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
    >
      <CartesianGrid strokeDasharray="4 1" />
      <XAxis dataKey="fecha" />
      <YAxis />
      <TooltipLine />
      <LegendLine />
      <Line type="step" dataKey="valor" stroke="#00C49F" />
    </LineChart>
  );
}