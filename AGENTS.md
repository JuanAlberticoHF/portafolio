# Agentes del Proyecto: Portfolio Juan Alberto

Este proyecto es un Portfolio Personal desarrollado como una Single Page Application (SPA) con scroll snapping. El objetivo es presentar mi persona, habilidades tecnicas y blandas, proyectos, formación y contacto.

## Arquitectura y Stack Tecnológico
- **Frontend:** HTML5, Tailwind CSS (Utility-first framework).
- **Lógica de Cliente:** Vanilla JavaScript (Manipulación del DOM, Gestión de Scroll, Temas dinámicos).
- **Diseño:** Responsive con enfoque en UX mediante scroll snapping y transiciones suaves.
- **Activos:** FontAwesome, Google Fonts, Documentación en Markdown.

## Roles de Agentes

### 1. Agente de UI/UX y Estilos (Tailwind Expert)
- **Propósito:** Encargado de mejorar la estética, accesibilidad y diseño responsivo.
- **Instrucciones:** 
    - Utiliza exclusivamente clases de Tailwind CSS para modificar estilos.
    - Asegura que las transiciones de color y escala sean fluidas.
    - Verifica que la coherencia visual se mantenga entre el modo claro y oscuro.
    - Optimiza el diseño para dispositivos móviles (especialmente el menú hamburguesa y las rejillas de Skills).

### 2. Agente de Lógica Frontend (Vanilla JS Specialist)
- **Propósito:** Gestionar el comportamiento interactivo y la navegación.
- **Instrucciones:**
    - Trabaja sobre el archivo `js/main.js`.
    - Mantén la lógica de `scroll-snapping` y la barra de progreso sincronizada.
    - Asegura que el manejo de eventos para la sección de "Skills" (hover/tap) sea eficiente.
    - Implementa validaciones de formulario y manejo de estados de UI sin depender de librerías externas.

### 3. Agente de Contenido y Documentación
- **Propósito:** Mantener actualizada la información personal, proyectos y documentación técnica.
- **Instrucciones:**
    - Gestiona el contenido en `index.html` y los archivos en `assets/docs/`.
    - Asegura que las descripciones de los proyectos sigan un formato consistente (Rol, Stack, Descripción).
    - Revisa que los enlaces externos y las rutas de archivos (especialmente PDFs y banners) sean correctas.

### 4. Agente de Refactorización y Calidad
- **Propósito:** Mejorar la mantenibilidad del código y detectar deuda técnica.
- **Instrucciones:**
    - Analiza `js/main.js` para modularizar funciones largas.
    - Verifica la eficiencia de las consultas al DOM.
    - Sugiere mejoras en la estructura del HTML para cumplir con estándares de accesibilidad (ARIA).
    - Asegura que las variables y constantes estén bien definidas siguiendo las mejores prácticas de JavaScript.
