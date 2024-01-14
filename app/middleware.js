// app/middleware.js o app/middleware.ts

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function middleware(request) {
  const { pathname } = new URL(request.url);

  console.log("el pathname________", pathname);

  // Modifica esta ruta según tu estructura de archivos
  if (
    fs.existsSync(path.join(process.cwd(), "app", "pages", pathname + ".js"))
  ) {
    return NextResponse.next();
  }

  // Verifica si el path tiene respuesta desde la API.
  const apiResponse = await fetch(
    `pages/?filters[slug]=${pathname}&populate=cover`
  );
  if (apiResponse.ok) {
    return NextResponse.next();
  }

  // Redirecciona a la página de 'not found' si no se cumple ninguna condición anterior.
  return NextResponse.redirect("/not-found");
}
