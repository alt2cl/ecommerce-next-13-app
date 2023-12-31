export default function formatearNumero(numero) {
  // Convertimos el número a string
  let numeroStr = numero.toString();

  // Revertimos la cadena
  numeroStr = numeroStr.split("").reverse().join("");

  // Usamos una expresión regular para añadir un punto cada tres dígitos
  numeroStr = numeroStr.replace(/(\d{3})/g, "$1.");

  // Revertimos la cadena de nuevo a su forma original y eliminamos el último punto si hay uno
  numeroStr = numeroStr.split("").reverse().join("");
  if (numeroStr.startsWith(".")) {
    numeroStr = numeroStr.substring(1);
  }

  return numeroStr;
}
