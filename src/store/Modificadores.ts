import { writable } from "svelte/store";

export const Premios = writable([
  {
    nombre: "Antiguedad",
    tipo: "Porcentual",
    cantidad: 3,
    estado: true,
  },
]);
export const Deducciones = writable([
  {
    cantidad: 11,
    estado: true,
    nombre: "Jubilacion",
    tipo: "Porcentual",
  },
  {
    cantidad: 3,
    estado: true,
    nombre: "Ley 19032",
    tipo: "Porcentual",
  },
]);
export const Edicion = writable([
  {
    cantidad: 0,
    estado: true,
    nombre: "",
    tipo: "",
    modificador: "",
  }]
);