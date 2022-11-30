# Lumbre (Front-End)

## Introducción
### Lumbre: Lado cliente de la aplicación para usuarios
Este proyecto es una aplicación web desarrollada con React. Constituye el lado cliente de la aplicación para usuarios de LUMBRE.

## Tecnologías
* HTML5
* CSS3
* Javascript:
 * node 18.12.1
 * npm 9.1.2
 * react 18.2.0
 * react-router 6.4.3

## Estructura
El proyecto se ha desarrollado a partir de la estructura básica de una aplicación en React generada con ```npm create-react-app```. Se han añadido los diferentes componentes, que se encuentran en los directorios "pages" (componentes que devuelven páginas enteras) y "components" (componentes más pequeños), y se han configurado las rutas en el componente "App".  
Por otra parte, en el directorio "public" se han introducido las imágenes y la hoja de estilos.  
La estructura del proyecto es la siguiente:

```bash
.
├── package.json
├── package-lock.json
├── public
│   ├── assets
│   │   ├── css
│   │   │   └── style.css
│   │   └── img
│   │       ├── dado.png
│   │       ├── favicon.png
│   │       ├── icon_calendario.png
│   │       ├── icon_campanha.png
│   │       ├── icon_personaje.png
│   │       ├── icon_raza.png
│   │       ├── icon_sesion.png
│   │       ├── logo1.png
│   │       ├── logo2.png
│   │       ├── logo3.png
│   │       ├── logo4.png
│   │       ├── logo_texto1.png
│   │       ├── logo_texto2.png
│   │       ├── logo_texto3.png
│   │       └── logo_texto4.png
│   └── index.html
├── README.md
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── components
    │   ├── Cabecera.js
    │   ├── Footer.js
    │   ├── FormCampanha.js
    │   ├── FormPersonaje.js
    │   ├── FormRaza.js
    │   ├── FormSesion.js
    │   ├── MenuPpal.js
    │   ├── TarjetaC.js
    │   └── TarjetaS.js
    ├── index.css
    ├── index.js
    ├── pages
    │   ├── About.js
    │   ├── Calendario.js
    │   ├── campanha
    │   │   ├── CrearCampanha.js
    │   │   ├── EditarCampanha.js
    │   │   └── VerCampanha.js
    │   ├── Campanhas.js
    │   ├── Contrasenha.js
    │   ├── Login.js
    │   ├── personaje
    │   │   ├── CrearPersonaje.js
    │   │   ├── EditarPersonaje.js
    │   │   └── VerPersonaje.js
    │   ├── Personajes.js
    │   ├── raza
    │   │   ├── CrearRaza.js
    │   │   ├── EditarRaza.js
    │   │   └── VerRaza.js
    │   ├── Razas.js
    │   ├── Registro.js
    │   ├── sesion
    │   │   ├── CrearSesion.js
    │   │   ├── EditarSesion.js
    │   │   └── VerSesion.js
    │   └── Sesiones.js
    └── peticiones.js

```

## Ejecución del proyecto (Ubuntu)
### Requisitos mínimos
* Servidor Apache instalado y activo
* node y npm instalados

### Configuración
Para poder ejecutar el proyecto, se deben instalar sus dependencias. Para ello, se ejecuta en la raíz del proyecto:
```npm i```  
Es necesario tener en cuenta que este proyecto funciona conjuntamente con el proyecto del lado servidor, que se puede descargar desde https://github.com/saravidalgarcia/lumbreAPI/.

### Acceso
El proyecto se puede desplegar directamente en http://localhost:3000 lanzando en el directorio raíz:
```npm start```  
También se puede generar una build (recomendado) con el comando:
```npm run build```  
Dicho comando genera una carpeta "build" en la raíz del proyecto. Su contenido se debe situar en el directorio /var/www/html/lumbre. Hecho esto, el proyecto es accesible desde el navegador, en la dirección http://localhost/lumbre.
