# Establece la imagen base de Node.js con la versión 18.15.0
FROM node:18.15.0

# Establece el directorio de trabajo de la aplicación dentro del contenedor
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Argumentos de construcción para variables de entorno
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_CLOUDINARY_API_KEY
ARG NEXT_PUBLIC_CLOUDINARY_API_SECRET

# Asigna argumentos de construcción a variables de entorno
ENV NEXT_PUBLIC_STRAPI_URL=$NEXT_PUBLIC_STRAPI_URL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_API_KEY=$NEXT_PUBLIC_CLOUDINARY_API_KEY
ENV NEXT_PUBLIC_CLOUDINARY_API_SECRET=$NEXT_PUBLIC_CLOUDINARY_API_SECRET

# Compila la aplicación Next.js para producción
RUN npm run build

# Expone el puerto 3000 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]