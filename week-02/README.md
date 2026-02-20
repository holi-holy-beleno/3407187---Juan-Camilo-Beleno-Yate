# Ficha 3407187 - Juan Camilo Beleño Yate
**Dominio:** Marketing de Artesanías Colombianas  
**Fecha:** 11/02/2026  
**Proyecto Semana 02:** Gestor de Colección

---

## 📋 Descripción del Proyecto
Esta aplicación web permite **gestionar una colección de productos de artesanías colombianas** dentro de un marketplace llamado *Raíces Ancestrales*.  

Funcionalidades principales:  
- Crear elementos (artesanías) con propiedades específicas: nombre, categoría, precio, estado de disponibilidad, prioridad (popularidad), fecha de creación.  
- Listar todos los elementos y aplicar filtros por estado (activo/inactivo), categoría o prioridad.  
- Editar o eliminar elementos existentes.  
- Alternar estado activo/inactivo.  
- Buscar productos por nombre o descripción.  
- Calcular estadísticas: total de productos, activos/inactivos, por categoría.  
- Persistencia usando LocalStorage.  

Características técnicas:  
- JavaScript puro (ES2023)  
- Uso de **inmutabilidad**, **programación funcional** y métodos de array (`map`, `filter`, `reduce`, `find`)  
- Spread & Rest operators para actualizar arrays y objetos  
- Default parameters y optional chaining  
- Código modular y organizado en funciones puras  

---

## 📝 Modelo de Datos Adaptado
```javascript
const artisanalProduct = {
  id: Date.now(),           // ID único
  name: "Mochila Wayuu",    // Nombre del producto
  description: "Mochila tejida a mano por artesanas Wayuu", 
  active: true,             // Disponible para la venta
  priority: "high",         // Popularidad: high/medium/low
  category: "bolsos",       // Categoría: bolsos, figuras, joyería, textiles
  createdAt: "2026-02-11", 
  updatedAt: null
};