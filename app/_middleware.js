import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  console.log("url pathname", url, pathname);

  // Lista de rutas estáticas
  const staticRoutes = [
    "/contacto",
    "/tienda",
    "/home",
    "/carrito",
    "/blog",
    "/nosotros",
  ];

  // Si la ruta no es estática y no es una API o recurso de Next.js, reescribe a `[extrapage]`
  if (
    !staticRoutes.includes(pathname) &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/api")
  ) {
    url.pathname = `/app/${pathname}`;
    return NextResponse.rewrite(url);
  }

  // Si no, continúa con la respuesta normal
  return NextResponse.next();
}
