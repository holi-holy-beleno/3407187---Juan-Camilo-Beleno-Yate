/**
 * ============================================
 * PROYECTO SEMANA 02 - GESTOR DE COLECCIÓN
 * Archivo inicial para el aprendiz
 * ============================================
 *
 * INSTRUCCIONES:
 * 1. Lee el README.md del proyecto para entender los requisitos
 * 2. Adapta TODOS los TODOs a tu dominio asignado por el instructor
 * 3. Usa SOLO características ES2023 aprendidas esta semana:
 *    - Spread operator (...) para copiar arrays/objetos
 *    - Rest parameters (...args) en funciones
 *    - Default parameters
 *    - Array methods: map, filter, reduce, find
 *    - Object enhancements (shorthand, computed properties)
 * 4. NUNCA mutes el estado directamente - usa inmutabilidad
 * 5. Los comentarios deben estar en español
 * 6. La nomenclatura técnica (variables, funciones) en inglés
 *
 * NOTA IMPORTANTE:
 * Este archivo es una PLANTILLA GENÉRICA.
 * Debes adaptarlo completamente a tu dominio asignado.
 * NO copies la implementación de otro compañero.
 *
 * EJEMPLO DE REFERENCIA (NO es un dominio asignable):
 * Planetario - Gestión de cuerpos celestes
 *
 * ============================================
 */

// ============================================
// ESTADO GLOBAL
// ============================================

// Array que almacena todos los elementos de tu colección
let items = [];

// ID del elemento que se está editando (null si es nuevo)
let editingItemId = null;

// ============================================
// TODO 1: DEFINIR CATEGORÍAS DE TU DOMINIO
// ============================================

//Categorias
const CATEGORIES = {
  fabrics: { name: 'Tejidos tradicionales', emoji: '🧶' },
  ceramics: { name: 'Cerámica artesanal', emoji: '🏺' },
  wood: { name: 'Artesanías en madera', emoji: '🪵' },
  jewelery: { name: 'Joyería artesanal', emoji: '💍' },
  basketry: { name: 'Cestería', emoji: '🧺' }
};

// Prioridades 
const PRIORITIES = {
  high: { name: 'Producto destacado', color: '#ef4444' },
  medium: { name: 'Producto estándar', color: '#f59e0b' },
  low: { name: 'Producto básico', color: '#22c55e' },
};

// ============================================
// TODO 2: PERSISTENCIA (LocalStorage)
// ============================================

const STORAGE_KEY = 'artesaniasMarketplace';

/**
 * Carga los elementos desde LocalStorage
 * @returns {Array} Array de elementos guardados, o array vacío
 */
const loadItems = () => {
  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) ?? '[]'
  );
};

/**
 * Guarda los elementos en LocalStorage
 * @param {Array} itemsToSave - Array de elementos a guardar
 */
const saveItems = itemsToSave => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(itemsToSave)
  );
};

// ============================================
// TODO 3: CRUD - CREAR ELEMENTO
// ============================================

const createItem = (itemData = {}) => {

  const newItem = {
    // Propiedades base obligatorias
    id: Date.now(),
    createdAt: new Date().toISOString(),
    updatedAt: null,
    active: true,

    // Propiedades principales
    name: itemData.name ?? '',
    description: itemData.description ?? '',
    category: itemData.category ?? 'fabrics',   
    priority: itemData.priority ?? 'medium',

    // Propiedades específicas del dominio
    price: itemData.price ?? 0,
    artisan: itemData.artisan ?? '',

    // Permite sobreescritura si vienen más campos
    ...itemData
  };

  const newItems = [...items, newItem];

  saveItems(newItems);

  return newItems;
};

// ============================================
// TODO 4: CRUD - ACTUALIZAR ELEMENTO
// ============================================

const updateItem = (id, updates = {}) => {

  const updatedItems = items.map(item =>
    item.id === id
      ? {
          ...item,
          ...updates,
          updatedAt: new Date().toISOString()
        }
      : item
  );

  saveItems(updatedItems);

  return updatedItems;
};

// ============================================
// TODO 5: CRUD - ELIMINAR ELEMENTO
// ============================================

const deleteItem = id => {

  const filteredItems = items.filter(item => item.id !== id);

  saveItems(filteredItems);

  return filteredItems;
};

// ============================================
// TODO 6: CRUD - TOGGLE ESTADO ACTIVO
// ============================================

const toggleItemActive = id => {

  const updatedItems = items.map(item =>
    item.id === id
      ? {
          ...item,
          active: !item.active,
          updatedAt: new Date().toISOString()
        }
      : item
  );

  saveItems(updatedItems);

  return updatedItems;
};

// ============================================
// TODO 7: FILTROS Y BÚSQUEDA
// ============================================

/**
 * Filtra elementos por estado (activo/inactivo)
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} status - 'all' | 'active' | 'inactive'
 * @returns {Array} Elementos filtrados
 */
const filterByStatus = (itemsToFilter, status = 'all') => {

  if (status === 'all') return itemsToFilter;

  if (status === 'active') {
    return itemsToFilter.filter(item => item.active);
  }

  if (status === 'inactive') {
    return itemsToFilter.filter(item => !item.active);
  }

  return itemsToFilter;
};

/**
 * Filtra elementos por categoría
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} category - Categoría a filtrar o 'all'
 * @returns {Array} Elementos filtrados
 */
const filterByCategory = (itemsToFilter, category = 'all') => {

  if (category === 'all') return itemsToFilter;

  return itemsToFilter.filter(item => item.category === category);
};

/**
 * Filtra elementos por prioridad
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} priority - Prioridad a filtrar o 'all'
 * @returns {Array} Elementos filtrados
 */
const filterByPriority = (itemsToFilter, priority = 'all') => {

  if (priority === 'all') return itemsToFilter;

  return itemsToFilter.filter(item => item.priority === priority);
};

/**
 * Busca elementos por texto en nombre y descripción
 * @param {Array} itemsToFilter - Array de elementos
 * @param {String} query - Texto a buscar
 * @returns {Array} Elementos que coinciden
 */
const searchItems = (itemsToFilter, query = '') => {

  if (!query || query.trim() === '') return itemsToFilter;

  const searchTerm = query.toLowerCase();

  return itemsToFilter.filter(item =>
    item.name.toLowerCase().includes(searchTerm) ||
    (item.description ?? '').toLowerCase().includes(searchTerm)
  );
};

/**
 * Aplica todos los filtros de forma encadenada
 * @param {Array} itemsToFilter - Array de elementos
 * @param {Object} filters - Objeto con todos los filtros
 * @returns {Array} Elementos filtrados
 */
const applyFilters = (itemsToFilter, filters = {}) => {

  const {
    status = 'all',
    category = 'all',
    priority = 'all',
    search = ''
  } = filters;

  let result = filterByStatus(itemsToFilter, status);
  result = filterByCategory(result, category);
  result = filterByPriority(result, priority);
  result = searchItems(result, search);

  return result;
};

// ============================================
// TODO 8: ESTADÍSTICAS
// ============================================

/**
 * Calcula estadísticas generales de la colección
 * @param {Array} itemsToAnalyze - Array de elementos
 * @returns {Object} Objeto con estadísticas
 */
const getStats = (itemsToAnalyze = []) => {

  const total = itemsToAnalyze.length;

  const active = itemsToAnalyze.filter(item => item.active).length;

  const inactive = total - active;

  const byCategory = itemsToAnalyze.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + 1;
    return acc;
  }, {});

  const byPriority = itemsToAnalyze.reduce((acc, item) => {
    acc[item.priority] = (acc[item.priority] ?? 0) + 1;
    return acc;
  }, {});

  return {
    total,
    active,
    inactive,
    byCategory,
    byPriority
  };
};

// ============================================
// TODO 9: RENDERIZADO - ELEMENTO INDIVIDUAL
// ============================================

/**
 * Obtiene el emoji de una categoría
 * @param {String} category - Clave de la categoría
 * @returns {String} Emoji de la categoría
 */
const getCategoryEmoji = category => {
  return CATEGORIES[category]?.emoji ?? '📌';
};

/**
 * Formatea una fecha ISO a formato legible
 * @param {String} dateString - Fecha en formato ISO
 * @returns {String} Fecha formateada
 */
const formatDate = dateString => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Renderiza un elemento individual como HTML
 * @param {Object} item - Objeto del elemento
 * @returns {String} HTML del elemento
 */
const renderItem = item => {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP'
  }).format(item.price);

  return `
    <div class="task-item ${item.active ? '' : 'completed'} priority-${item.priority}" data-item-id="${item.id}">
      <input type="checkbox" class="task-checkbox item-checkbox" ${item.active ? 'checked' : ''}>

      <div class="task-content">
        <h3>${item.name}</h3>
        <p>${item.description}</p>

        <div class="task-meta">
          <span class="task-badge badge-category">${item.category}</span>
          <span class="task-badge badge-priority priority-${item.priority}">
            ${item.priority === 'high' ? 'Producto destacado' : 'Producto estándar'}
          </span>

          <span>💰 ${formattedPrice}</span>
          <span>👨‍🎨 ${item.artisan}</span>
          <span>📅 ${new Date(item.createdAt).toLocaleDateString('es-CO')}</span>
        </div>
      </div>

      <div class="task-actions">
        <button class="btn-edit">✏️</button>
        <button class="btn-delete">🗑️</button>
      </div>
    </div>
  `;
};

// ============================================
// TODO 10: RENDERIZADO - LISTA COMPLETA
// ============================================

/**
 * Renderiza la lista completa de elementos
 * @param {Array} itemsToRender - Array de elementos a renderizar
 */
const renderItems = itemsToRender => {
  const itemList = document.getElementById('item-list');
  const emptyState = document.getElementById('empty-state');

  if (itemsToRender.length === 0) {
    itemList.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
    itemList.innerHTML = itemsToRender
      .map(renderItem)
      .join('');
  }
};

/**
 * Renderiza las estadísticas en el DOM
 * @param {Object} stats - Objeto con estadísticas
 */
const renderStats = stats => {
  document.getElementById('stat-total').textContent = `${stats.total}`;
  document.getElementById('stat-active').textContent = `${stats.active}`;
  document.getElementById('stat-inactive').textContent = `${stats.inactive}`;

  const categoryStats = Object.entries(stats.byCategory)
    .map(([cat, count]) =>
      `${getCategoryEmoji(cat)} ${CATEGORIES[cat]?.name ?? cat}: ${count}`
    )
    .join(' | ');

  document.getElementById('stats-details').textContent = categoryStats;
};

// ============================================
// TODO 11: EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario (crear/editar)
 * @param {Event} e - Evento del formulario
 */
const handleFormSubmit = e => {
  e.preventDefault();

  const name = document.getElementById('item-name').value.trim();
  const description = document.getElementById('item-description').value.trim();
  const category = document.getElementById('item-category').value;
  const priority = document.getElementById('item-priority').value;
  const price = parseFloat(document.getElementById('item-price').value) || 0;
  const artisan = document.getElementById('item-artisan').value.trim();

  if (!name) {
    alert('El nombre es obligatorio');
    return;
  }

  const itemData = { 
    name, 
    description, 
    category, 
    priority, 
    price,      // 👈 AÑADIDO
    artisan     // 👈 AÑADIDO
  };

  if (editingItemId) {
    items = updateItem(editingItemId, itemData);
  } else {
    items = createItem(itemData);
  }

  resetForm();
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja el click en checkbox de un elemento
 * @param {Number} itemId - ID del elemento
 */
const handleItemToggle = itemId => {
  items = toggleItemActive(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Maneja el click en botón editar
 * @param {Number} itemId - ID del elemento a editar
 */
const handleItemEdit = itemId => {
  const itemToEdit = items.find(item => item.id === itemId);
  if (!itemToEdit) return;
  document.getElementById('item-price').value = itemToEdit.price ?? '';
  document.getElementById('item-artisan').value = itemToEdit.artisan ?? '';
  document.getElementById('item-name').value = itemToEdit.name;
  document.getElementById('item-description').value = itemToEdit.description ?? '';
  document.getElementById('item-category').value = itemToEdit.category;
  document.getElementById('item-priority').value = itemToEdit.priority;

  document.getElementById('form-title').textContent = '✏️ Editar Elemento';
  document.getElementById('submit-btn').textContent = 'Actualizar';
  document.getElementById('cancel-btn').style.display = 'inline-block';

  editingItemId = itemId;
};

/**
 * Maneja el click en botón eliminar
 * @param {Number} itemId - ID del elemento a eliminar
 */
const handleItemDelete = itemId => {
  if (!confirm('¿Estás seguro de que deseas eliminar este elemento?')) return;

  items = deleteItem(itemId);
  renderItems(applyCurrentFilters());
  renderStats(getStats(items));
};

/**
 * Obtiene los filtros actuales del DOM
 * @returns {Object} Objeto con los valores de los filtros
 */
const getCurrentFilters = () => {
  return {
    status: document.getElementById('filter-status').value,
    category: document.getElementById('filter-category').value,
    priority: document.getElementById('filter-priority').value,
    search: document.getElementById('search-input').value.trim()
  };
};

/**
 * Aplica los filtros actuales y retorna los elementos filtrados
 * @returns {Array} Elementos filtrados
 */
const applyCurrentFilters = () => {
  const filters = getCurrentFilters();
  return applyFilters(items, filters);
};

/**
 * Maneja cambios en los filtros
 */
const handleFilterChange = () => {
  const filteredItems = applyCurrentFilters();
  renderItems(filteredItems);
};

/**
 * Resetea el formulario a su estado inicial
 */
const resetForm = () => {
  document.getElementById('item-form').reset();
  document.getElementById('form-title').textContent = '➕ Nuevo Elemento';
  document.getElementById('submit-btn').textContent = 'Crear';
  document.getElementById('cancel-btn').style.display = 'none';
  editingItemId = null;
};

// ============================================
// TODO 12: EVENT LISTENERS
// ============================================

/**
 * Adjunta todos los event listeners necesarios
 */
const attachEventListeners = () => {

  // Form submit
  document
    .getElementById('item-form')
    .addEventListener('submit', handleFormSubmit);

  // Cancel button
  document
    .getElementById('cancel-btn')
    .addEventListener('click', resetForm);

  // Filtros
  document
    .getElementById('filter-status')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('filter-category')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('filter-priority')
    .addEventListener('change', handleFilterChange);

  document
    .getElementById('search-input')
    .addEventListener('input', handleFilterChange);

  // Botón limpiar inactivos
  document
    .getElementById('clear-inactive')
    .addEventListener('click', () => {
      if (confirm('¿Eliminar todos los elementos inactivos?')) {
        items = clearInactive();
        renderItems(applyCurrentFilters());
        renderStats(getStats(items));
      }
    });

  // Event delegation para la lista
  document
    .getElementById('item-list')
    .addEventListener('click', e => {

      const itemElement = e.target.closest('.task-item');
      if (!itemElement) return;

      const itemId = parseInt(itemElement.dataset.itemId);

      if (e.target.classList.contains('item-checkbox')) {
        handleItemToggle(itemId);

      } else if (e.target.classList.contains('btn-edit')) {
        handleItemEdit(itemId);

      } else if (e.target.classList.contains('btn-delete')) {
        handleItemDelete(itemId);
      }
    });
};

// ============================================
// TODO 13: INICIALIZACIÓN
// ============================================

/**
 * Inicializa la aplicación
 */
const init = () => {
  // 1️⃣ Cargar datos desde localStorage
  items = loadItems();

  // 2️⃣ Renderizar lista inicial (con filtros aplicados por si acaso)
  renderItems(applyCurrentFilters());

  // 3️⃣ Renderizar estadísticas
  renderStats(getStats(items));

  // 4️⃣ Adjuntar event listeners
  attachEventListeners();

  // 5️⃣ Mensaje en consola
  console.log('✅ Aplicación inicializada correctamente');
};

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);

// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
//
// FUNCIONALIDAD:
// ✓ Puedo crear nuevos elementos
// ✓ Puedo editar elementos existentes
// ✓ Puedo eliminar elementos
// ✓ Puedo marcar como activo/inactivo
// ✓ Los filtros funcionan correctamente
// ✓ La búsqueda funciona en tiempo real
// ✓ Las estadísticas se actualizan
// ✓ Los datos persisten al recargar (localStorage)
//
// CÓDIGO:
// ✓ Uso spread operator para copiar arrays/objetos
// ✓ Uso array methods (map, filter, reduce, find)
// ✓ NUNCA muto el estado directamente
// ✓ Default parameters donde corresponde
// ✓ Destructuring para extraer propiedades
// ✓ Template literals para todo el HTML
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
//
// DOMINIO:
// ✓ Adaptado completamente a mi dominio asignado
// ✓ Categorías específicas de mi dominio
// ✓ Propiedades adicionales relevantes
// ✓ Emojis y textos coherentes con el dominio

