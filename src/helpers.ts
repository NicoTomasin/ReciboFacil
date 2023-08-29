export function Antiguedad(empleado, premio) {
  if (empleado.antiguedad > 0) {
    if (premio.tipo === "Porcentual") {
      empleado.salarioFinal +=
        (empleado.salarioFinal * empleado.antiguedad * premio.cantidad) / 100;
    } else if (premio.tipo === "Fija") {
      empleado.salarioFinal += premio.cantidad * empleado.antiguedad;
    }
  }
}

export function Default(empleado, premio) {
  if (premio.tipo === "Porcentual") {
    empleado.salarioFinal += (empleado.salarioFinal * premio.cantidad) / 100;
  } else {
    empleado.salarioFinal += premio.cantidad;
  }
}

export function Deducciones(empleado, deduccion) {
  if (deduccion.tipo === "Porcentual") {
    empleado.salarioFinal -= (empleado.salarioFinal * deduccion.cantidad) / 100;
  } else {
    empleado.salarioFinal -= deduccion.cantidad;
  }
}
