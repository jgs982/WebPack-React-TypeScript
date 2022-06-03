# Proyecto semilla para crear aplicaciones en React

Boilerplate inicial para construir aplicaciones en React que soporta las siguientes características:

- Transpilación de código con Babel
- Servidor Web de Desarrollo
- Generación de paquete en producción, con inyección automática del html dentro de la carpeta dist, mediante el uso del plugin 'html-webpack-plugin'
- Integrando CSS en nuestro proceso de bundling: css-loader para leer el archivo css y style-loader para inyectar los estilos en nuestra aplicación
- Limpieza de la carpeta dist cada vez que modifiquemos un archivo y creemos nuestros ficheros, para tal tarea haremos uso del plugin clean-webpack-plugin
-  Mantenimiento de los estilos que se encuentrarn en un fichero .js a un arhivo .css separado, para ello haremos uso del plugin mini-css-extract-plugin
-  SASS
-  Manejo de Imágenes haciendo referenciar recursos estáticos y que estos se acaben volcando a la carpeta ./dist 
-  Librería de REACT
-  Transformando CSS a Módulos, esta tecnología te permite que cuando importemos ficheros CSS en un JSX, automáticamente les añada un prefijo que los haga único por módulo y evitar así colisiones de selectores
-  TypeScript
