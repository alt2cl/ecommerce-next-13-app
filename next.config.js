// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   images:{
//     formats: ['image/avif', 'image/webp'],
//     domains: [`${process.env.DOMAIN}`]
//   },
//   env: {
//     NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL
//   },
//   async rewrites() {
//     return [
//       {
//         source: "/api/clientes",
//         destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/clientes`,
//       },
//     ];
//   },
// }

//module.exports = nextConfig

module.exports = {
  //output: "standalone",
  experimental: {
    appDir: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    domains: [`${process.env.DOMAIN}`],
  },
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/clientes",
  //       destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/clientes`,
  //     },
  //   ];
  // },
  // compiler: {
  //   // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
  //   styledComponents:
  //     false |
  //     {
  //       // Enabled by default in development, disabled in production to reduce file size,
  //       // setting this will override the default for all environments.
  //       //displayName: true,
  //       // Enabled by default.
  //       //ssr: true,
  //       // Enabled by default.
  //       //fileName: true,
  //       // Empty by default.
  //       //topLevelImportPaths?: string[] ,
  //       // Defaults to ["index"].
  //       //meaninglessFileNames?: string[],
  //       // Enabled by default.
  //       //cssProp: boolean,
  //       // Empty by default.
  //       //namespace?: string,
  //       // Not supported yet.
  //       //minify: true,
  //       // Not supported yet.
  //       //transpileTemplateLiterals?: boolean,
  //       // Not supported yet.
  //       //pure?: boolean,
  //     },
  // },
};
