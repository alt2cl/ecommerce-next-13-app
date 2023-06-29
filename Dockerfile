# Establece la imagen base de Node.js con la versión 14
FROM node:18.15.0

# Establece el directorio de trabajo de la aplicación dentro del contenedor
WORKDIR /app

# Borra todo el contenido del directorio de trabajo
#RUN rm -rf ./*

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Compila la aplicación Next.js para producción
RUN npm run build

# Expone el puerto 3000 para que la aplicación sea accesible desde fuera del contenedor
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["npm", "start"]