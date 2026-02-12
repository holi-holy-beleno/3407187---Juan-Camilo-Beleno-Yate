/* ============================================
   PROYECTO SEMANA 01 - FICHA DE INFORMACIÓN INTERACTIVA
   Archivo inicial para el aprendiz
   ============================================ */

// ============================================
// TODO 1: Crear el objeto de datos de tu dominio
// ============================================

const entityData = {
  //Nombre de la entidad 
   name: 'Raíces Ancestrales',
  
  // Descripción del negocio
   description: 'Marketplace colombiano de artesanías tradcionales de Colombia',
  
  //Identificador de la tienda 
   identifier: 'ART-CO-001', 

  // Contacto y ubicación
   contact: {
     email: 'ventas01@raicesancestrales.com',
     phone: '+57 321 456 7890',
     location: 'Bogotá, Colombia'
   },

  // Productos artesanales
   items: [
     { name: 'Mochila Wayuu', level: 95, category: 'Tejidos' },
     { name: 'Sombrero Vueltiao', level: 90, category: 'Fibras Naturales' },
     { name: 'Cerámica de Ráquiro', level: 88, category: 'Cerámica' },
     { name: 'Collar de Chaquiras', level: 85, category: 'Bisutería Artesanal' },
   ],

  // Enlaces del marketplace
  // Array de enlaces o referencias (si aplica)
  links: [
     { platform: 'Instagram', url: 'https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-1200x1200.png', icon: '📷' },
     { platform: 'Facebook', url: 'https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-1200x1200.png', icon: '📘' },
     { platform: 'Sitio Web', url: 'https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-1200x1200.png', icon: '🌐' },
   ],

  // Estadísticas de la tienda
   stats: {
     total: 120,
     active: 95,
     rating: 4.7,
     total_Sales: 3600,  
   }
};

// TODO: Extraer datos usando destructuring
const {
  name,
  description,
  contact: { email, phone, location: storeLocation },
  items,
  stats: { total, active, rating, total_Sales }
} = entityData;
// ============================================
// TODO 2: Referencias a elementos del DOM
// ============================================

// Información principal
const entityName = document.getElementById('userName');
const entityDescription = document.getElementById('userBio');
const entityCode = document.getElementById('userTitle');
const entityLocation = document.getElementById('userLocation');
const entityEmail = document.getElementById('userEmail');
const entityPhone = document.getElementById('userPhone');

// Lista de productos (skills)
const itemsList = document.getElementById('skillsList');

// Estadísticas
const statsContainer = document.getElementById('stats');

// Botones
const themeToggle = document.getElementById('themeToggle');
const copyBtn = document.getElementById('copyEmailBtn');
const toggleItemsBtn = document.getElementById('toggleSkills');

// Toast
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toastMessage');

// Enlaces sociales
const linksContainer = document.getElementById('socialLinks');
// ============================================
// TODO 3: Renderizar información básica
// ============================================

const renderBasicInfo = () => {
  // 1. Destructuring del objeto principal
  const {
    name,
    description,
    identifier,
    contact: { email, phone, location: storeLocation }
  } = entityData;

  // 2. Actualizar el DOM con template literals
  entityName.textContent = name;

  entityDescription.innerHTML = `
    <p>${description}</p>
    <p><strong>Código:</strong> ${identifier}</p>
    <p><strong>Contacto:</strong> ${email} | ${phone}</p>
    <p><strong>Ubicación:</strong> ${storeLocation}</p>
  `;
  entityEmail.textContent = email;
  entityPhone.textContent = phone;
  entityCode.textContent = identifier;
  entityLocation.textContent = `📍 ${storeLocation}`;


};

// ============================================
// TODO 4: Renderizar lista de elementos
// ============================================

const renderItems = (showAll = false) => {
  // 1. Extraer el array de items
  const { items } = entityData;

  // 2. Filtrar si no se deben mostrar todos
  const itemsToShow = showAll ? items : items.slice(0, 4);

  // 3. Generar el HTML con map()
  const itemsHtml = itemsToShow
    .map(({ name, level }) => `
      <div class="item">
        <div class="item-name">${name}</div>
        <div class="item-level">
          <span>${level}%</span>
          <div class="level-bar">
            <div class="level-fill" style="width: ${level}%"></div>
          </div>
        </div>
      </div>
    `)
    .join('');

  // 4. Insertar en el DOM
  itemsList.innerHTML = itemsHtml;
};

// ============================================
// TODO 5: Renderizar enlaces/referencias
// ============================================

const renderLinks = () => {
  // 1. Sacamos los links con destructuring
  const { links } = entityData;

  // 2. Creamos el HTML con map()
  const linksHtml = links.map(link => {
    const { platform, url, icon } = link;
    return `
      <a href="${url}" target="_blank" class="social-link">
        ${icon} ${platform}
      </a>
    `;
  }).join('');

  // 3. Insertamos el HTML en el contenedor del DOM
  linksContainer.innerHTML = linksHtml;
};


// ============================================
// TODO 6: Calcular y renderizar estadísticas
// ============================================

const renderStats = () => {
  // 1. Extraer stats con destructuring
  const { stats } = entityData;

  // 2. Crear array con etiquetas en español
  const statsArray = [
    { label: 'Productos Totales', value: stats.total },
    { label: 'Productos Activos', value: stats.active },
    { label: 'Calificación', value: stats.rating },
    { label: 'Ventas Realizadas', value: stats.total_Sales }
  ];

  // 3. Generar HTML con map()
  const statsHtml = statsArray
    .map(({ label, value }) => `
      <div class="stat-item">
        <span class="stat-value">${value}</span>
        <span class="stat-label">${label}</span>
      </div>
    `)
    .join('');

  // 4. Insertar en el DOM
  statsContainer.innerHTML = statsHtml;
};

// ============================================
// TODO 7: Funcionalidad de cambio de tema
// ============================================

const toggleTheme = () => {
  // 1. Obtener el tema actual
  const currentTheme = document.documentElement.dataset.theme;

  // 2. Calcular el nuevo tema
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // 3. Aplicarlo
  document.documentElement.dataset.theme = newTheme;

  // 4. Cambiar ícono del botón
  themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';

  // 5. Guardar preferencia
  localStorage.setItem('theme', newTheme);
};

const loadTheme = () => {
  // 1. Cargar desde localStorage
  const savedTheme = localStorage.getItem('theme') ?? 'light';

  // 2. Aplicar
  document.documentElement.dataset.theme = savedTheme;

  // 3. Ajustar ícono
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
};

// ============================================
// TODO 8: Funcionalidad de copiar información
// ============================================

const copyInfo = () => {
  // 1. Construir texto con destructuring
  const {
    name,
    description,
    contact: { email }
  } = entityData;

  const infoText = `
 ${email}
  `.trim();

  // 2. Copiar al portapapeles
  navigator.clipboard.writeText(infoText);

  // 3. Mostrar notificación
  showToast('¡Información copiada al portapapeles!');
};

// Función auxiliar para mostrar notificaciones toast
const showToast = message => {
  toastMessage.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
};

// ============================================
// TODO 9: Funcionalidad de mostrar/ocultar items
// ============================================

let showingAllItems = false;

const handleToggleItems = () => {
  // 1. Cambiar estado
  showingAllItems = !showingAllItems;

  // 2. Renderizar según estado
  renderItems(showingAllItems);

  // 3. Cambiar texto del botón
  toggleItemsBtn.textContent = showingAllItems
    ? 'Mostrar menos'
    : 'Mostrar más';
};

// ============================================
// TODO 10: Event Listeners
// ============================================

// Botón tema
themeToggle.addEventListener('click', toggleTheme);

// Botón copiar
copyBtn.addEventListener('click', copyInfo);

// Botón mostrar/ocultar
toggleItemsBtn.addEventListener('click', handleToggleItems);

// ============================================
// TODO 11: Inicializar la aplicación
// ============================================

const init = () => {
  loadTheme();
  renderBasicInfo();
  renderItems();
  renderLinks();
  renderStats();
  console.log('✅ Aplicación inicializada correctamente');
};

// Ejecuta init cuando el DOM esté listo
init();
// ============================================
// CHECKLIST DE VERIFICACIÓN
// ============================================
// Después de completar todos los TODOs, verifica:
// ✓ La información de tu dominio se muestra correctamente
// ✓ Los items muestran niveles/porcentajes con barras
// ✓ Los enlaces/referencias funcionan y abren en nueva pestaña
// ✓ Las estadísticas se muestran correctamente
// ✓ El cambio de tema funciona (claro/oscuro)
// ✓ El botón de copiar funciona y muestra notificación
// ✓ El botón de mostrar más/menos funciona
// ✓ Todo usa sintaxis ES2023 (sin var, sin funciones tradicionales)
// ✓ Template literals para toda interpolación de strings
// ✓ Arrow functions en todo el código
// ✓ Destructuring usado donde corresponde
// ✓ Comentarios en español
// ✓ Nomenclatura técnica en inglés
