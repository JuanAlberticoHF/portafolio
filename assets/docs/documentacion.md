# Documentación Técnica: Portafolio Web de Juan Alberto

## 1. Introducción

El presente documento detalla la arquitectura, tecnologías y decisiones de diseño implementadas en el desarrollo del portafolio web personal de Juan Alberto. La aplicación ha sido diseñada como una Single Page Application (SPA) estática, orientada a ofrecer una experiencia de usuario fluida, moderna y altamente interactiva, utilizando un enfoque minimalista con soporte nativo para modos claro y oscuro.

## 2. Tecnologías Utilizadas

El proyecto se ha construido utilizando la "Trinidad de la Web" estándar, sin frameworks de JavaScript pesados, garantizando un rendimiento óptimo y tiempos de carga reducidos.

* **HTML5:** Utilizado para estructurar semánticamente el contenido. Se hace uso de etiquetas como `<header>`, `<main>`, `<section>`, y `<nav>` para mejorar la accesibilidad y el SEO.

* **Tailwind CSS (v3.x via CDN):** Framework de CSS de utilidades (utility-first) utilizado para todo el diseño visual y la adaptabilidad (responsiveness).

  * *Configuración personalizada:* Se inyectó una configuración en el `<head>` para definir colores de marca (brand colors), tipografía base (Inter) y habilitar el modo oscuro basado en clases (`darkMode: 'class'`).

* **Vanilla JavaScript (ES6+):** Utilizado para toda la lógica de interacción del lado del cliente, manipulación del DOM, validación de formularios y observadores de intersección (Intersection Observer).

* **FontAwesome (v6.x):** Librería de iconos vectoriales para ilustrar las habilidades, redes sociales y botones de acción.

* **Google Fonts:** Implementación de la fuente tipográfica 'Inter' para garantizar una lectura limpia y profesional.

## 3. Arquitectura de la Aplicación

La aplicación sigue una arquitectura de **Página Única Estática con Desplazamiento Anclado (Scroll-Snapping)**.

### Estructura de Secciones

El contenido principal (`<main>`) actúa como un contenedor de desplazamiento. Se divide en 6 vistas principales (Secciones 0 a 5):

1. **Inicio (`#inicio`):** Presentación, rol (Desarrollador Junior), enlaces rápidos y foto de perfil.

2. **Sobre Mi (`#sobre-mi`):** Biografía detallada y fotografía secundaria.

3. **Skills (`#skills`):** Cuadrícula categorizada de habilidades técnicas y blandas con un panel interactivo lateral.

4. **Proyectos (`#proyectos`):** Tarjetas (cards) de proyectos destacando tecnologías (badges), roles y enlaces a repositorios.

5. **Formación (`#formacion`):** Línea de tiempo / tarjetas de educación oficial.

6. **Contacto (`#contacto`):** Enlaces directos a redes, información de ubicación/disponibilidad y un formulario de contacto validado en el cliente.

### Patrones de Diseño de Interfaz

* **Scroll Snapping:** Se utiliza `scroll-snap-type: y mandatory` en el contenedor principal y `scroll-snap-align: start` en cada sección para emular una navegación estilo "diapositivas" (presentación).

* **Sticky Header:** Barra de navegación superior fija que reduce su altura dinámicamente al hacer scroll para maximizar el espacio de lectura.

* **Progress Bar:** Indicador visual anclado a la base del header que calcula el porcentaje de desplazamiento del contenedor principal.

## 4. Estrategia de Separación de Ficheros

Para garantizar la mantenibilidad, escalabilidad y las buenas prácticas en el despliegue (especialmente para plataformas como GitHub Pages), la base de código monolítica (todo en un `.html`) debe estructurarse en directorios y archivos independientes.

### Árbol de Directorios Propuesto

```
mi-portafolio/
├── index.html          # Estructura principal y marcado
├── css/
│   └── styles.css      # Estilos personalizados, animaciones y scrollbar
├── js/
│   └── main.js         # Lógica de interacción y manipulación del DOM
├── assets/
│   ├── img/            # Fotografías de perfil y banners de proyectos
│   └── docs/           # Archivos descargables (Ej. cv.pdf)
└── README.md           # Documentación del repositorio

```

### Beneficios de esta arquitectura:

1. **Separación de Responsabilidades (SoC):** El HTML se encarga únicamente de la estructura, el CSS de las reglas visuales no cubiertas por Tailwind, y el JS del comportamiento.

2. **Mantenibilidad:** Si se necesita modificar la lógica del formulario, el desarrollador acude directamente a `main.js` sin tener que navegar por cientos de líneas de HTML.

3. **Caché del Navegador:** Al separar CSS y JS, los navegadores de los visitantes pueden almacenar estos archivos en caché. En futuras visitas, solo se descargará el HTML, mejorando los tiempos de carga (Performance).

## 5. Lógica e Interacciones Principales (JavaScript)

El archivo JavaScript orquesta varias funcionalidades clave:

* **Gestión del Tema (Dark/Light Mode):** Lee las preferencias del usuario o interactúa con el botón `#theme-toggle` para alternar la clase `dark` en la etiqueta `<html>`. Modifica dinámicamente los iconos (sol/luna).

* **Intersection Observer API:** Un observador vigila qué sección está actualmente visible en el viewport para actualizar dinámicamente el estado "activo" de los botones de navegación en el header.

* **Panel de Habilidades Dinámico:** Al realizar `mouseenter` sobre cualquier `.skill-item`, JS extrae los atributos de datos (`data-name`, `data-level`, `data-desc`) y el HTML del icono para inyectarlos en el panel lateral (`#skill-info-box`) aplicando transiciones de opacidad y escala.

* **Validación de Formulario:** Escucha los eventos `input` en los campos del formulario. Utiliza expresiones regulares (Regex) para validar el formato del correo electrónico y asegura que ningún campo esté vacío antes de habilitar el botón de envío.