/**
 * ============================================
 * PROYECTO SEMANA 03 - SISTEMA DE GESTIÓN CON POO
 * Archivo inicial para el aprendiz
 * ============================================

// ============================================
// TODO 1: CLASE BASE - CraftProduct
// ============================================

/**
 * Representa la entidad fundamental de una artesanía en el sistema.
 * Esta clase es "Abstracta" en concepto, ya que sirve de plantilla 
 * para tipos específicos de productos.
 * * @abstract
 */
class CraftProduct {
  // --- CAMPOS PRIVADOS (Encapsulación ES2023) ---
  // El prefijo '#' asegura que estas variables no sean accesibles fuera de la clase.
  #id;           // Identificador único (UUID)
  #name;         // Nombre comercial de la pieza
  #active;       // Estado de disponibilidad (Boolean)
  #location;     // Taller, ciudad o vitrina de origen
  #dateCreated;  // Fecha de registro en el sistema
  #artisan;      // Maestro artesano responsable
  #category;     // Categoría general del producto
  #price;        // Valor en Pesos Colombianos (COP)

  /**
   * Constructor para inicializar una nueva artesanía.
   * @param {string} name - Nombre descriptivo.
   * @param {string} location - Ubicación física inicial.
   * @param {string} artisan - Nombre del artesano (Default: 'Desconocido').
   * @param {number} price - Precio inicial (Default: 0).
   */
  constructor(name, location, artisan = 'Desconocido', price = 0) {
    // Generación de ID único universal para evitar colisiones de datos
    this.#id = crypto.randomUUID();
    this.#name = name;
    this.#location = location;
    this.#artisan = artisan;
    this.#price = price;
    
    // Estados iniciales por defecto
    this.#active = true; 
    this.#dateCreated = new Date().toLocaleDateString();
    this.#category = 'General'; 
  }

  // ============================================
  // GETTERS (Acceso de solo lectura)
  // ============================================
  // Permiten leer los campos privados desde la UI o el sistema.

  get id() { return this.#id; }
  get name() { return this.#name; }
  get isActive() { return this.#active; }
  get location() { return this.#location; }
  get artisan() { return this.#artisan; }
  get price() { return this.#price; }
  get dateCreated() { return this.#dateCreated; }

  // ============================================
  // SETTERS CON VALIDACIÓN (Control de Integridad)
  // ============================================
  // Aseguran que los datos ingresados sean lógicos antes de guardarlos.

  /**
   * Actualiza la ubicación validando que no sea una cadena vacía.
   */
  set location(value) {
    if (!value || value.trim() === '') {
      throw new Error('La ubicación es obligatoria para el inventario');
    }
    this.#location = value.trim();
  }

  /**
   * Actualiza el precio validando que sea un valor numérico coherente.
   */
  set price(value) {
    if (typeof value !== 'number' || value < 0) {
      throw new Error('El precio de la artesanía no puede ser negativo');
    }
    this.#price = value;
  }

  // ============================================
  // MÉTODOS DE INSTANCIA (Comportamiento)
  // ============================================

  /**
   * Habilita la pieza para que aparezca en el catálogo activo.
   * @returns {Object} Respuesta con estado de la operación.
   */
  activate() {
    if (this.#active) return { success: false, message: 'La pieza ya figura como activa' };
    this.#active = true;
    return { success: true, message: 'Artesanía activada correctamente' };
  }

  /**
   * Desactiva la pieza (por venta o retiro de exhibición).
   * @returns {Object} Respuesta con estado de la operación.
   */
  deactivate() {
    if (!this.#active) return { success: false, message: 'La pieza ya se encuentra desactivada' };
    this.#active = false;
    return { success: true, message: 'Artesanía marcada como inactiva' };
  }

  /**
   * Método de interfaz: Obliga a las clases hijas a definir su propia 
   * estructura de datos para mostrar. (Lógica de Polimorfismo).
   */
  getInfo() {
    throw new Error('El método getInfo() debe ser implementado por la categoría específica');
  }

  /**
   * Retorna el nombre de la clase hija para identificar el tipo de producto.
   */
  getType() {
    return this.constructor.name;
  }
}

// ============================================
// TODO 2: CLASES DERIVADAS - Especializaciones
// ============================================

/**
 * Especialización para productos decorativos.
 * Hereda de CraftProduct (Herencia).
 */
class HandmadeDecoration extends CraftProduct {
  // Atributos específicos de decoración con encapsulamiento privado
  #material; // Ejemplo: Madera, Totumo, Caña flecha
  #style;    // Ejemplo: Precolombino, Moderno, Étnico
  #weight;   // Peso para cálculos de logística

  /**
   * @param {string} material - Insumo principal de la obra.
   * @param {string} style - Corriente artística o técnica aplicada.
   * @param {string} weight - Peso físico del objeto.
   */
  constructor(name, location, artisan, price, material, style, weight) {
    // super() invoca al constructor de la clase padre (CraftProduct)
    // Esto es obligatorio antes de usar 'this' en clases derivadas.
    super(name, location, artisan, price);
    this.#material = material;
    this.#style = style;
    this.#weight = weight;
  }

  // Getters específicos de la categoría
  get material() { return this.#material; }
  get style() { return this.#style; }
  get weight() { return this.#weight; }

  /**
   * Implementación del método abstracto getInfo (Polimorfismo).
   * Combina datos del padre con los detalles específicos de esta clase.
   */
  getInfo() {
    return {
      id: this.id, // Accedemos al getter del padre
      name: this.name,
      artisan: this.artisan,
      price: this.price,
      location: this.location,
      type: this.getType(),
      details: `Material: ${this.#material}, Estilo: ${this.#style}, Peso: ${this.#weight}`,
      active: this.isActive
    };
  }
}

/**
 * Especialización para joyería (ej. Filigrana, bisutería artesanal).
 * Extiende las funcionalidades básicas de CraftProduct.
 */
class HandmadeJewelry extends CraftProduct {
  #gemstone; // Tipo de piedra preciosa o semipreciosa
  #metal;    // Oro, Plata, Cobre, etc.
  #size;     // Talla (para anillos o longitud de collares)

  constructor(name, location, artisan, price, gemstone, metal, size) {
    super(name, location, artisan, price);
    this.#gemstone = gemstone;
    this.#metal = metal;
    this.#size = size;
  }

  get gemstone() { return this.#gemstone; }
  get metal() { return this.#metal; }
  get size() { return this.#size; }

  /**
   * Retorna el objeto de información formateado para joyería.
   */
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      artisan: this.artisan,
      price: this.price,
      location: this.location,
      type: this.getType(),
      details: `Metal: ${this.#metal}, Gema: ${this.#gemstone}, Talla: ${this.#size}`,
      active: this.isActive
    };
  }
}

/**
 * Especialización para piezas cerámicas y alfarería.
 */
class HandmadeCeramics extends CraftProduct {
  #ceramicType; // Barro negro, cerámica vidriada, gres
  #capacity;    // Volumen (si es un recipiente)
  #color;       // Pigmentos o color natural

  constructor(name, location, artisan, price, ceramicType, capacity, color) {
    super(name, location, artisan, price);
    this.#ceramicType = ceramicType;
    this.#capacity = capacity;
    this.#color = color;
  }

  get ceramicType() { return this.#ceramicType; }
  get capacity() { return this.#capacity; }
  get color() { return this.#color; }

  /**
   * Retorna el objeto de información formateado para alfarería.
   */
  getInfo() {
    return {
      id: this.id,
      name: this.name,
      artisan: this.artisan,
      price: this.price,
      location: this.location,
      type: this.getType(),
      details: `Tipo: ${this.#ceramicType}, Capacidad: ${this.#capacity}, Color: ${this.#color}`,
      active: this.isActive
    };
  }
}

// ============================================
// TODO 3: CLASE PERSON - Base para usuarios
// ============================================

class User {
  #id;
  #name;
  #email;
  #registrationDate;

  constructor(name, email) {
    this.#id = crypto.randomUUID();
    this.#name = name.trim();
    // Ejecutamos la validación manualmente o usamos el setter
    this.email = email; 
    this.#registrationDate = new Date().toLocaleDateString();
  }

  // ============================================
  // GETTERS
  // ============================================
  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get registrationDate() { return this.#registrationDate; }

  // ============================================
  // SETTERS CON VALIDACIÓN
  // ============================================
  set email(value) {
    // Expresión regular para validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      throw new Error('Formato de email inválido');
    }
    this.#email = value.trim();
  }

  set name(value) {
    if (!value || value.trim().length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }
    this.#name = value.trim();
  }

  /**
   * Retorna la información básica del usuario
   */
  getInfo() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      registrationDate: this.#registrationDate
    };
  }
}

// ============================================
// TODO 4: CLASES DE ROLES - Usuarios especializados
// ============================================

/**
 * Clase para clientes del sistema
 */
class Customer extends User {
  #productsPurchased;
  #loyaltyPoints;

  constructor(name, email) {
    super(name, email);
    this.#loyaltyPoints = 0;
    this.#productsPurchased = [];
  }

  /**
   * Registra una compra y otorga puntos
   * @param {CraftProduct} product 
   */
  addPurchase(product) {
    this.#productsPurchased.push(product);
    this.#loyaltyPoints += 10; // 10 puntos por cada artesanía comprada
  }

  get productsPurchased() { return [...this.#productsPurchased]; }
  get loyaltyPoints() { return this.#loyaltyPoints; }

  getInfo() {
    return {
      ...super.getInfo(), // Trae id, name, email y date de la clase User
      role: 'Customer',
      loyaltyPoints: this.#loyaltyPoints,
      purchasesCount: this.#productsPurchased.length
    };
  }
}

/**
 * Clase para los maestros artesanos
 */
class Artisan extends User {
  #specialty;
  #yearsOfExperience;

  constructor(name, email, specialty, yearsOfExperience) {
    super(name, email);
    this.#specialty = specialty;
    this.yearsOfExperience = yearsOfExperience; // Usamos el setter para validar
  }

  get specialty() { return this.#specialty; }
  get yearsOfExperience() { return this.#yearsOfExperience; }

  set yearsOfExperience(value) {
    if (typeof value !== 'number' || value < 0) {
      throw new Error('Los años de experiencia deben ser un número positivo');
    }
    this.#yearsOfExperience = value;
  }

  getInfo() {
    return {
      ...super.getInfo(),
      role: 'Artisan',
      specialty: this.#specialty,
      experience: `${this.#yearsOfExperience} años`
    };
  }
}


// ============================================
// TODO 5: CLASE PRINCIPAL DEL SISTEMA
// ============================================

class MainSystem {
  #items = [];
  #users = [];
  #transactions = [];

  // Bloque estático para configuración inicial
  static {
    this.VERSION = '1.1.0';
    this.MAX_ITEMS = 1000;
    this.SYSTEM_NAME = 'Artesanías de Colombia - Gestión';
    console.log(`🚀 ${this.SYSTEM_NAME} v${this.VERSION} inicializado.`);
  }

  // Métodos estáticos de utilidad
  static isValidId(id) {
    return typeof id === 'string' && id.length > 0;
  }

  static generateId() {
    return crypto.randomUUID();
  }

  addTransaction(transaction) {
    const newTransaction = {
      id: MainSystem.generateId(),
      date: new Date().toLocaleString(),
      ...transaction
    };
    this.#transactions.push(newTransaction);
    return { success: true, transaction: newTransaction };
  }

  /**
   * Retorna la lista de transacciones registradas
   * @returns {Array}
   */
  getTransactions() {
    return [...this.#transactions]; // Retornamos copia para proteger el original
  }
  // ============================================
  // MÉTODOS CRUD PARA ARTESANÍAS (ITEMS)
  // ============================================

  addItem(item) {
    if (!(item instanceof CraftProduct)) {
      return { success: false, message: 'El objeto debe ser una instancia de CraftProduct' };
    }

    if (this.#items.length >= MainSystem.MAX_ITEMS) {
      return { success: false, message: 'Capacidad máxima del inventario alcanzada' };
    }

    this.#items.push(item);
    return { success: true, message: 'Artesanía agregada al inventario', item };
  }

  removeItem(id) {
    if (!MainSystem.isValidId(id)) return { success: false, message: 'ID no válido' };

    const index = this.#items.findIndex(item => item.id === id);
    if (index === -1) return { success: false, message: 'Producto no encontrado' };

    const removed = this.#items.splice(index, 1)[0];
    return { success: true, message: 'Eliminado correctamente', item: removed };
  }

  findItem(id) {
    if (!MainSystem.isValidId(id)) return null;
    return this.#items.find(item => item.id === id) ?? null;
  }

  getAllItems() {
    return [...this.#items]; // Copia de seguridad
  }

  // ============================================
  // BÚSQUEDA Y FILTRADO
  // ============================================

  searchByName(query) {
    if (!query || query.trim() === '') return this.getAllItems();
    const term = query.toLowerCase();
    return this.#items.filter(item => item.name.toLowerCase().includes(term));
  }

  filterByType(type) {
    if (!type || type === 'all') return this.getAllItems();
    return this.#items.filter(item => item.getType() === type);
  }

  filterByStatus(active) {
    if (typeof active !== 'boolean') return this.getAllItems();
    return this.#items.filter(item => item.isActive === active);
  }

  // ============================================
  // ESTADÍSTICAS Y USUARIOS
  // ============================================

  getStats() {
    const total = this.#items.length;
    const active = this.#items.filter(item => item.isActive).length;
    
    const byType = this.#items.reduce((acc, item) => {
      const type = item.getType();
      acc[type] = (acc[type] ?? 0) + 1;
      return acc;
    }, {});

    return {
      total,
      active,
      inactive: total - active,
      byType,
      users: this.#users.length
    };
  }

  addUser(user) {
    if (!(user instanceof User)) {
      return { success: false, message: 'Debe ser una instancia de la clase User' };
    }

    if (this.#users.some(u => u.email === user.email)) {
      return { success: false, message: 'Este correo electrónico ya está registrado' };
    }

    this.#users.push(user);
    return { success: true, message: 'Usuario registrado exitosamente', user };
  }

  getAllUsers() {
    return [...this.#users];
  }
}

// ============================================
// TODO 6: INSTANCIA DEL SISTEMA Y DATOS DE PRUEBA
// ============================================

// 1. Instanciamos el cerebro del proyecto
const system = new MainSystem();

// 2. Creamos productos usando las clases específicas del TODO 2
// (Recordemos el orden: name, location, artisan, price, ...específicos)
const decor1 = new HandmadeDecoration(
    'Jarrón de la Chamba', 
    'Bodega Central', 
    'Maestra Juana', 
    120000, 
    'Arcilla Negra', 
    'Tradicional', 
    '1.5kg'
);

const jewelry1 = new HandmadeJewelry(
    'Topos en Filigrana', 
    'Vitrina de Lujo', 
    'Luis Alarcón', 
    85000, 
    'Esmeralda', 
    'Plata 925', 
    'Pequeño'
);

const ceramic1 = new HandmadeCeramics(
    'Matera de Ráquira', 
    'Pasillo 3', 
    'Pedro Rojas', 
    45000, 
    'Vidriada', 
    '500ml', 
    'Terracota'
);


// Agrega los datos de prueba
system.addTransaction({
    itemName: 'Sombrero Vueltiao',
    customerName: 'Andrés López',
    price: 155000
});


// 3. Agregamos los productos al sistema
system.addItem(decor1);
system.addItem(jewelry1);
system.addItem(ceramic1);

// 4. Creamos usuarios de prueba (Artistas y Clientes)
const artisan1 = new Artisan('Carmen Teresa', 'carmen@artesanias.co', 'Tejeduría', 25);
const customer1 = new Customer('Andrés López', 'andres.l@gmail.com');

system.addUser(artisan1);
system.addUser(customer1);

console.log('✅ Datos de prueba cargados exitosamente');

// ============================================
// TODO 7: REFERENCIAS AL DOM (REPARADO)
// ============================================

// Usamos una estructura organizada para evitar repeticiones
const UI = {
    // Listas y Contenedores
    itemList: document.getElementById('item-list'),
    
    // Formularios y Modales
    itemForm: document.getElementById('item-form'),
    itemModal: document.getElementById('item-modal'),
    
    // Filtros
    filterType: document.getElementById('filter-type'),
    filterStatus: document.getElementById('filter-status'),
    searchInput: document.getElementById('search-input'),
    
    // Estadísticas
    stats: {
        total: document.getElementById('stat-total'),
        active: document.getElementById('stat-active'),
        inactive: document.getElementById('stat-inactive'),
        users: document.getElementById('stat-users')
    },
    
    // Navegación (Aquí es donde estaba el error)
    tabs: document.querySelectorAll('.tab-btn'),
    panels: document.querySelectorAll('.tab-panel')
};

// Referencias sueltas para botones de acción rápida
const btnAddProduct = document.getElementById('add-item-btn');
const btnCloseModal = document.getElementById('close-modal');
const btnCancel = document.getElementById('cancel-btn');

// ============================================
// TODO 8: FUNCIONES DE RENDERIZADO
// ============================================

/**
 * Renderiza un elemento individual (Tarjeta de Artesanía)
 * @param {CraftProduct} item 
 * @returns {string} HTML
 */
const renderItem = item => {
    // Usamos el método getInfo() que definimos en el TODO 2
    const info = item.getInfo();
    
    return `
        <div class="item-card ${item.isActive ? '' : 'inactive'}" data-id="${item.id}">
            <div class="item-card-header">
                <span class="type-badge">${item.getType()}</span>
                <span class="status-indicator ${item.isActive ? 'online' : 'offline'}"></span>
            </div>
            
            <h3>${item.name}</h3>
            <p><strong>Artesano:</strong> ${item.artisan}</p>
            <p><strong>Ubicación:</strong> ${item.location}</p>
            <p><strong>Precio:</strong> $${item.price.toLocaleString()}</p>
            <p class="details-text"><small>${info.details || ''}</small></p>

            <div class="actions">
                <button class="toggle-btn">
                    ${item.isActive ? 'Desactivar' : 'Activar'}
                </button>
                <button class="delete-btn">Eliminar</button>
            </div>
        </div>
    `;
};
const renderUsers = () => {
    const userList = document.getElementById('user-list');
    if (!userList) return;

    const users = system.getAllUsers();
    
    if (users.length === 0) {
        userList.innerHTML = '<p class="empty-state">No hay usuarios registrados.</p>';
        return;
    }

    userList.innerHTML = users.map(user => `
        <div class="member-card">
            <div class="member-avatar">${user.name.charAt(0)}</div>
            <div class="member-name">${user.name}</div>
            <div class="member-email">${user.email}</div>
            <span class="membership-badge ${user instanceof Artisan ? 'premium' : 'standard'}">
                ${user instanceof Artisan ? 'Maestro Artesano' : 'Cliente'}
            </span>
        </div>
    `).join('');
};

// Y actualiza tu función refreshUI para que también los dibuje:

/**
 * Renderiza la lista completa de elementos
 * @param {Array} items 
 */
const renderItems = (items = []) => {
    // Usamos la referencia del objeto UI si lo implementaste, 
    // o la variable directa itemList
    const container = UI ? UI.itemList : itemList;
    
    if (items.length === 0) {
        container.innerHTML = '<p class="empty">No se encontraron artesanías</p>';
        return;
    }

    container.innerHTML = items.map(renderItem).join('');
};

/**
 * Actualiza los números en los widgets de estadísticas
 * @param {Object} stats 
 */
const renderStats = stats => {
    // Corrección: Asignación directa a los elementos del DOM
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-active').textContent = stats.active;
    document.getElementById('stat-inactive').textContent = stats.inactive;
    document.getElementById('stat-users').textContent = stats.users;
};
// Busca y reemplaza cualquier declaración previa de refreshUI con esta:
const refreshUI = () => {
    console.log("🔄 Sincronizando interfaz...");
    if (typeof handleFilterChange === 'function') handleFilterChange();
    if (typeof renderUsers === 'function') renderUsers();
    if (typeof renderTransactions === 'function') renderTransactions();
    if (typeof renderStats === 'function') renderStats(system.getStats());
};
// ============================================
// TODO 9: EVENT HANDLERS
// ============================================

/**
 * Maneja el envío del formulario para nuevas artesanías
 */
const handleFormSubmit = e => {
    e.preventDefault();

    // Captura de valores básicos
    const name = document.getElementById('item-name').value;
    const location = document.getElementById('item-location').value;
    const type = document.getElementById('item-type').value;
    
    // Valores complementarios (puedes capturarlos de inputs adicionales si los tienes)
    const artisan = "Maestro Artesano"; 
    const price = 0;

    let newItem;

    // Instanciamos según el orden de parámetros del TODO 2:
    // (name, location, artisan, price, ...específicos)
    switch (type) {
        case 'HandmadeDecoration':
            newItem = new HandmadeDecoration(name, location, artisan, price, 'Madera', 'Tradicional', '500g');
            break;
        case 'HandmadeJewelry':
            newItem = new HandmadeJewelry(name, location, artisan, price, 'Esmeralda', 'Plata', 'M');
            break;
        case 'HandmadeCeramics':
            newItem = new HandmadeCeramics(name, location, artisan, price, 'Vidriada', '1L', 'Terracota');
            break;
        default:
            alert('Por favor selecciona un tipo válido');
            return;
    }

    const result = system.addItem(newItem);
    
    if (result.success) {
        // Ocultar modal y limpiar
        itemModal.style.display = 'none';
        itemForm.reset();
        
        // Refrescar toda la interfaz
        refreshUI(); 
    } else {
        alert(result.message);
    }
};

/**
 * Filtra los elementos según los inputs de búsqueda
 */
/**
 * Filtra los elementos según los inputs de búsqueda
 */
const handleFilterChange = () => {
    // 1. Capturamos las referencias JUSTO ANTES de usarlas
    const fType = document.getElementById('filter-type');
    const fStatus = document.getElementById('filter-status');
    const sInput = document.getElementById('search-input');

    // 2. Si por algún motivo no existen, devolvemos todo el catálogo para no romper nada
    if (!fType || !fStatus || !sInput) {
        renderItems(system.getAllItems());
        return;
    }

    let filtered = system.getAllItems();

    const typeValue = fType.value;
    const statusValue = fStatus.value;
    const searchValue = sInput.value.toLowerCase();

    // 3. Aplicar filtros en cadena
    if (typeValue !== 'all') {
        filtered = filtered.filter(item => item.getType() === typeValue);
    }

    if (statusValue !== 'all') {
        const isActive = statusValue === 'active';
        filtered = filtered.filter(item => item.isActive === isActive);
    }

    if (searchValue.trim() !== '') {
        filtered = filtered.filter(item =>
            item.name.toLowerCase().includes(searchValue)
        );
    }

    // 4. Renderizar el resultado
    renderItems(filtered);
};

/**
 * Maneja las acciones de los botones dentro de las tarjetas (Delegación de eventos)
 */
const handleItemAction = e => {
    const itemCard = e.target.closest('.item-card');
    if (!itemCard) return;
    
    const itemId = itemCard.dataset.id;
    const target = e.target;

    // Acción: Alternar estado
    if (target.classList.contains('toggle-btn')) {
        const item = system.findItem(itemId);
        if (item) {
            item.isActive ? item.deactivate() : item.activate();
            refreshUI();
        }
    }

    // Acción: Eliminar
    if (target.classList.contains('delete-btn')) {
        if (confirm('¿Estás seguro de eliminar esta artesanía?')) {
            system.removeItem(itemId);
        }
    }
    function refreshUI() {
    console.log("🔄 Sincronizando interfaz...");
    
    // Ejecutamos cada parte con seguridad
    if (typeof handleFilterChange === 'function') handleFilterChange();
    if (typeof renderUsers === 'function') renderUsers();
    if (typeof renderTransactions === 'function') renderTransactions();
    
    // Actualizamos estadísticas
    const stats = system.getStats();
    renderStats(stats);
}

/**
 * Manejador de acciones en las tarjetas
 */
const handleItemAction = e => {
    const itemCard = e.target.closest('.item-card');
    if (!itemCard) return;
    
    const itemId = itemCard.dataset.id;
    const target = e.target;

    // Acción: Activar/Desactivar
    if (target.classList.contains('toggle-btn')) {
        const item = system.findItem(itemId);
        if (item) {
            item.isActive ? item.deactivate() : item.activate();
            // Esta llamada ahora SIEMPRE funcionará
            refreshUI(); 
        }
    }

    // Acción: Eliminar
    if (target.classList.contains('delete-btn')) {
        if (confirm('¿Estás seguro de eliminar esta artesanía?')) {
            system.removeItem(itemId);
            refreshUI();
        }
    }
  };
    handleFilterChange();    // Renderiza productos
    renderUsers();           // Renderiza artesanos
    renderTransactions();    // Renderiza ventas (NUEVO)
    renderStats(system.getStats()); 
  };
;

const renderTransactions = () => {
    const container = document.getElementById('transaction-list');
    if (!container) return;

    const transactions = system.getTransactions();

    if (transactions.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <p>📭 No hay ventas registradas aún.</p>
            </div>`;
        return;
    }

    container.innerHTML = transactions.map(t => `
        <div class="loan-card"> <div class="loan-header">
                <span class="loan-item-title">📦 ${t.itemName}</span>
                <span class="loan-status returned">Vendido</span>
            </div>
            <div class="loan-info">
                <p>👤 <strong>Cliente:</strong> ${t.customerName}</p>
                <p>📅 <strong>Fecha:</strong> ${t.date}</p>
                <p>💰 <strong>Monto:</strong> $${t.price.toLocaleString()}</p>
            </div>
        </div>
    `).join('');
};

// ============================================
// TODO 10: EVENT LISTENERS (REPARADO)
// ============================================

// Usamos una función para envolver todo y asegurarnos de que el DOM existe
const setupEventListeners = () => {
    
    // 1. Formulario (Aquí estaba el error)
    // Buscamos directamente el elemento para estar 100% seguros
    const form = document.getElementById('item-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }

    // 2. Filtros y Búsqueda
    const fType = document.getElementById('filter-type');
    const fStatus = document.getElementById('filter-status');
    const sInput = document.getElementById('search-input');

    if (fType) fType.addEventListener('change', handleFilterChange);
    if (fStatus) fStatus.addEventListener('change', handleFilterChange);
    if (sInput) sInput.addEventListener('input', handleFilterChange);

    // 3. Delegación de eventos en la lista
    const list = document.getElementById('item-list');
    if (list) {
        list.addEventListener('click', handleItemAction);
    }

    // 4. Navegación de Pestañas
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const panel = document.getElementById(btn.dataset.tab);
            if (panel) panel.classList.add('active');
        });
    });

    // 5. Botones de Modales
    document.getElementById('add-item-btn')?.addEventListener('click', () => {
        document.getElementById('item-modal').style.display = 'flex';
    });

    document.querySelectorAll('.close-btn, .btn-secondary, #cancel-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
        });
    });
    
};

// ... (Aquí van los listeners que ya tenías de filtros y catálogo) ...

// --- Control de Modales (Abrir) ---
document.getElementById('add-item-btn')?.addEventListener('click', () => {
    document.getElementById('item-modal').style.display = 'flex';
});

// Botón para Usuarios
document.getElementById('add-user-btn')?.addEventListener('click', () => {
    const userModal = document.getElementById('user-modal');
    if (userModal) userModal.style.display = 'flex';
});

// --- Control de Formulario de Usuarios ---
const userForm = document.getElementById('user-form');
if (userForm) {
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const role = document.getElementById('user-role').value;
        const name = document.getElementById('user-name').value;
        const email = document.getElementById('user-email').value;

        let newUser;
        if (role === 'Artisan') {
            newUser = new Artisan(name, email, 'Artesanía General', 0);
        } else {
            newUser = new Customer(name, email);
        }

        const result = system.addUser(newUser);
        
        if (result.success) {
            document.getElementById('user-modal').style.display = 'none';
            userForm.reset();
            refreshUI(); 
            alert('Usuario registrado con éxito');
        } else {
            alert(result.message);
        }
    });
}

// Botones para cerrar modales (Asegúrate de tener esto para que se cierren)
document.querySelectorAll('.close-btn, .btn-secondary, #cancel-btn, #cancel-user-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(m => m.style.display = 'none');
    });
});

// Llamamos a esta función dentro del DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    refreshUI(); // Esto inicializa los datos
});
// ============================================
// TODO 11: INICIALIZACIÓN
// ============================================

/**
 * Arranca la aplicación sincronizando el sistema con la interfaz
 */
const init = () => {
    // 1. Ejecutamos el refresco general para mostrar items y stats
    // handleFilterChange ya llama internamente a renderItems
    handleFilterChange(); 
    
    // 2. Aseguramos que las estadísticas iniciales se muestren
    renderStats(system.getStats());
    
    // 3. Confirmación en consola
    console.log(`%c✅ ${MainSystem.SYSTEM_NAME} v${MainSystem.VERSION} listo`, "color: #27ae60; font-weight: bold;");
};

// Reemplaza tus últimas líneas por esto:
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners(); // Configura botones
    refreshUI();           // Carga los datos iniciales y las ventas
    console.log(`%c✅ ${MainSystem.SYSTEM_NAME} listo`, "color: #27ae60; font-weight: bold;");
});
