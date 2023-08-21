import { CarritoProvider } from "@/context/CarritoContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Head from "next/head";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Barlow } from "next/font/google";
import "./globals.scss";

import { openGraphData } from "@/utils/shared-metadata";

export const metadata = {
  metadataBase: new URL("https://cafemas.cl"),
  title: "Café más",
  description: "Café de especialidad tostado en Chile, atrévete a probarlo! ",
  keywords:
    "Café, Café de especialidad, Café tostado en Chile, Gourmet, Accesorios para café",
  openGraph: {
    ...openGraphData,
  },
  locale: "es_CL",
  type: "website",
};

//const inter = Inter({ subsets: ['latin'] })

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
  //variable: "--font-barlow",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${barlow.className}`}>
      <Head>
        <title>Café +</title>
      </Head>
      <body className=" bg-slate-100">
        <ThemeProvider>
          <CarritoProvider>
            <Header />
            {children}
          </CarritoProvider>
        </ThemeProvider>

        <Footer />
      </body>
    </html>
  );
}
