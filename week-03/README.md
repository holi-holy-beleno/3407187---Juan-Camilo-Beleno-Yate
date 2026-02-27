# 🎨 Sistema de Gestión: Artesanías de Colombia (POO)

**Ficha:** 3407187 - Juan Camilo Beleño Yate  
**Dominio:** Marketing y Administración de Artesanías Colombianas  
**Fecha:** 11/02/2026  
**Proyecto Semana 03:** Gestión Avanzada con POO

---

## 📋 Descripción del Proyecto
Evolución del gestor de colección hacia un sistema robusto basado en el paradigma de **Programación Orientada a Objetos (POO)**. Esta aplicación permite administrar el inventario, los artesanos y las transacciones de *Artesanías de Colombia*, garantizando la integridad de los datos mediante encapsulamiento y validaciones de negocio.

---

## 🚀 Funcionalidades Principales
* **Gestión de Inventario Multicategoría:** Registro de productos especializados (Decoración, Joyería, Cerámica) con propiedades únicas.
* **Sistema de Usuarios:** Manejo de roles diferenciados para Maestros Artesanos y Clientes.
* **Historial de Ventas:** Registro dinámico de transacciones con trazabilidad de comprador y precio.
* **Filtrado Inteligente:** Búsqueda en tiempo real por nombre, categoría y estado de disponibilidad.
* **Panel de Estadísticas:** Visualización de métricas clave del sistema (total de productos, stock activo, usuarios registrados).

---

## 🛠️ Características Técnicas (POO ES2023)
El proyecto implementa los 4 pilares de la Programación Orientada a Objetos:

1.  **Encapsulamiento:** Uso estricto de campos privados (`#`) para proteger el estado interno de los objetos.
2.  **Herencia:** Estructura jerárquica con una clase base `CraftProduct` y clases derivadas especializadas.
3.  **Polimorfismo:** Implementación personalizada del método `getInfo()` en cada subclase para mostrar detalles específicos según el tipo de artesanía.
4.  **Abstracción:** Definición de modelos de datos que representan entidades reales (Artesanos, Clientes, Productos).



### 💎 Características de ES2023 aplicadas:
* **Campos y métodos privados:** Uso de `#` para seguridad de datos.
* **Bloques Estáticos:** Configuración inicial del sistema mediante `static blocks`.
* **Métodos Estáticos:** Utilidades globales para generación de IDs y validaciones.
* **Getters y Setters:** Acceso controlado y validación de reglas de negocio (precios no negativos, emails válidos).

---

## 📝 Arquitectura del Modelo de Datos

### Jerarquía de Productos
* **CraftProduct (Clase Base)**
    * `HandmadeDecoration`: Material, estilo, peso.
    * `HandmadeJewelry`: Metal, gema, talla.
    * `HandmadeCeramics`: Tipo de cerámica, capacidad, color.



### Jerarquía de Personas
* **User (Clase Base)**
    * `Artisan`: Especialidad, años de experiencia.
    * `Customer`: Historial de compras, puntos de fidelidad.

---

## ⚙️ Instalación y Uso
1.  **Clonar** el repositorio o descargar los archivos fuente.
2.  **Abrir** el archivo `index.html` en cualquier navegador moderno.
3.  **Sin dependencias:** No requiere librerías externas ni compiladores (Vanilla JavaScript).

---

> Desarrollado con ❤️ para el fortalecimiento de la cultura artesanal colombiana.