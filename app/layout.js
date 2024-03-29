import { CarritoProvider } from "@/src/context/CarritoContext";
import { ThemeProvider } from "@/src/context/ThemeContext";
import Head from "next/head";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import { Barlow } from "next/font/google";
//import Script from "next/script";
import "./globals.scss";

import { openGraphData } from "@/src/utils/shared-metadata";

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
  variable: "--font-barlow",
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${barlow.className}`}>
      <Head>
        <title>Café +</title>
      </Head>
      {/* Script de Google Tag Manager */}
      {/* <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-R0DE61DHD4"
        strategy="afterInteractive" // Cargar después de que la página se haya vuelto interactiva
        async
      />
      <Script
        id="google-analytics" // Un ID para identificar el script
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R0DE61DHD4');
        `}
      </Script> */}
      <body className=" bg-gray-100">
        <ThemeProvider>
          <CarritoProvider>
            <Header />
            {children}
            <Footer />
          </CarritoProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
