# TechNova — Prompt de Continuidad del Proyecto

> Este documento es una guía completa para que cualquier IA pueda continuar asistiendo el desarrollo de TechNova desde el punto exacto en que se encuentra, manteniendo coherencia técnica, visual y funcional.

---

## Contexto general

**TechNova** es un e-commerce de tecnología desarrollado con React + Vite. El proyecto está en desarrollo activo y cuenta con una base sólida: catálogo de productos, carrito, favoritos, autenticación simulada, historial de pedidos, checkout por pasos y perfil de usuario. Todo el estado persistente se maneja con localStorage a través de un hook personalizado.

El desarrollador es principiante en React, por lo que las explicaciones deben ser claras, con código completo y sin omitir imports. Cuando se detecte un error, se debe pedir el archivo completo antes de asumir su contenido.

---

## Stack tecnológico

| Herramienta | Versión / Detalle |
|---|---|
| React | 18+ con Vite |
| React Router DOM | v6 |
| Bootstrap | v5.3 (solo CSS, sin JS) |
| Tipografías | Sora (títulos) + Inter (cuerpo) via Google Fonts |
| Imágenes | Locales en `src/assets/images/` |
| Estado persistente | localStorage via hook `useLocalStorage` |
| Gestión de estado global | Context API (Cart, Auth, Toast) |
| Validación de formularios | Hook personalizado `useForm` |

---

## Identidad visual

### Paleta de colores

```css
--bg: #0B0A12;           /* Fondo base, negro con tinte violeta */
--surface: #15121F;      /* Superficie de cards */
--surface-2: #1D1929;    /* Superficie secundaria */
--text: #F1EEFA;         /* Texto principal */
--text-muted: #9B93B5;   /* Texto secundario */
--accent: #8B5CF6;       /* Violeta — acción principal */
--accent-2: #00F5D4;     /* Neón menta — detalles y hover */
--border: rgba(241, 238, 250, 0.08); /* Bordes sutiles */
--radius: 16px;          /* Radio de bordes */
```

### Tipografía

```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

- **Sora**: `h1, h2, h3, h4, .brand, .price` — letter-spacing: -0.02em
- **Inter**: cuerpo general, labels, texto de UI

### Firma visual

- Fondo oscuro con glow radial violeta en el hero
- Cards con hover: elevación, borde violeta y sombra difusa
- Botones: `btn-cart` (violeta sólido → neón al hover), `btn-fav` (fantasma)
- Pills en navbar con blur glassmorphism
- Toasts en esquina inferior derecha con borde izquierdo neón

---

## Estructura de archivos

```
src/
├── assets/
│   └── images/
│       ├── audifonos.png
│       ├── camara.png
│       ├── cargador.png
│       ├── laptop.png
│       ├── mando.png
│       ├── mouse.png
│       ├── parlante.png
│       ├── reloj.png
│       ├── smartphone.png
│       └── teclado.png
├── components/
│   ├── Breadcrumb.jsx
│   ├── Footer.jsx
│   ├── FormField.jsx
│   ├── Hero.jsx
│   ├── ImageGallery.jsx
│   ├── Logo.jsx
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   ├── ProductList.jsx
│   ├── ProtectedRoute.jsx
│   └── SkeletonList.jsx
├── context/
│   ├── AuthContext.jsx
│   ├── CartContext.jsx
│   └── ToastContext.jsx
├── data/
│   └── products.js
├── hooks/
│   ├── useForm.js
│   └── useLocalStorage.js
├── pages/
│   ├── Carrito.jsx
│   ├── Catalogo.jsx
│   ├── Checkout.jsx
│   ├── Contacto.jsx
│   ├── Favoritos.jsx
│   ├── Historial.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── NotFound.jsx
│   ├── Perfil.jsx
│   ├── ProductoDetalle.jsx
│   └── Registro.jsx
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

---

## Rutas

| Ruta | Componente | Protegida |
|---|---|---|
| `/` | Home | No |
| `/catalogo` | Catalogo | No |
| `/producto/:id` | ProductoDetalle | No |
| `/contacto` | Contacto | No |
| `/login` | Login | No |
| `/registro` | Registro | No |
| `/favoritos` | Favoritos | Sí |
| `/carrito` | Carrito | No |
| `/checkout` | Checkout | Sí |
| `/historial` | Historial | Sí |
| `/perfil` | Perfil | Sí |
| `*` | NotFound | No |

Las rutas protegidas usan `<ProtectedRoute>` que redirige a `/login` guardando la ruta de origen en `location.state.from`. Después del login, se redirige automáticamente al destino original.

---

## Context API

### CartContext

**Exporta:** `carrito`, `agregarAlCarrito(producto, cantidad)`, `quitarDelCarrito(id)`, `cambiarCantidad(id, cantidad)`, `vaciarCarrito()`, `confirmarCompra()`, `aplicarCupon(codigo)`, `total`, `totalConDescuento`, `descuento`, `cantidadTotal`, `historial`

**Cupones válidos:** `BIENVENIDO` (10%), `PROMO20` (20%), `NEON50` (50%)

**Depende de:** `ToastContext` (debe estar por encima en el árbol)

### AuthContext

**Exporta:** `usuario`, `registrar(nombre, email, password)`, `iniciarSesion(email, password)`, `cerrarSesion()`, `actualizarPerfil(nombre, email)`, `cambiarPassword(passwordActual, passwordNuevo)`

**Estructura de usuario en localStorage:** `{ id, nombre, email }` (sin password por seguridad)

### ToastContext

**Exporta:** `showToast(mensaje, tipo)` — tipo puede ser `'success'` (default) o `'error'`

**Orden en main.jsx:**
```jsx
<AuthProvider>
  <ToastProvider>
    <CartProvider>
      <App />
    </CartProvider>
  </ToastProvider>
</AuthProvider>
```

---

## Hooks personalizados

### useLocalStorage(key, initialValue)
Persiste estado en localStorage. Se usa en todos los contexts y en App.jsx para favoritos.

### useForm(initialValues, validaciones)
Maneja estado, errores y touched de formularios. Expone: `values`, `errors`, `touched`, `handleChange`, `handleBlur`, `validarTodo()`, `resetForm()`.

Las validaciones son un objeto `{ campo: (value, allValues) => string | undefined }`.

---

## Productos

10 productos locales en `src/data/products.js`. Estructura de cada producto:

```js
{
  id: Number,
  nombre: String,
  descripcion: String,
  precio: Number,          // en pesos (CLP)
  categoria: String,
  stock: Number,
  rating: { rate: Number, count: Number },
  imagenes: [String],      // array de rutas importadas
  imagen: String,          // primera imagen (compatibilidad con carrito)
}
```

Categorías existentes: `Electrónica`, `Fotografía`, `Accesorios`, `Computación`, `Gaming`, `Audio`, `Wearables`, `Telefonía`

---

## Componentes clave

### ProductCard
Muestra imagen con stock overlay, nombre (link a detalle), categoría, rating con estrellas, precio, selector de cantidad (+/-), botón favorito (circular) y botón agregar al carrito (ancho completo). Deshabilita el botón si `stock === 0`.

### Checkout (3 pasos)
1. **PasoEnvio**: nombre, email, dirección, ciudad, código postal, teléfono — todos validados con `useForm`
2. **PasoPago**: selector de método (tarjeta crédito/débito/transferencia), formulario de tarjeta con formato automático (número en grupos de 4, MM/AA), validación con `useForm`, spinner de 2s al confirmar
3. **PasoConfirmacion**: resumen de compra, llama a `confirmarCompra()` del CartContext

### Perfil (3 secciones)
- **Información**: editar nombre y email
- **Contraseña**: cambiar con validación + barra de fuerza visual (5 niveles con colores)
- **Resumen**: stats (pedidos, total gastado, productos comprados) + último pedido

---

## CSS — clases principales

| Clase | Uso |
|---|---|
| `.product-card` | Card de producto con hover y elevación |
| `.btn-cart` | Botón de acción principal (violeta) |
| `.btn-fav` / `.btn-fav-icon` | Botón de favorito (texto o ícono circular) |
| `.nav-pill` / `.nav-pill-accent` | Pills del navbar |
| `.filter-input` | Inputs y selects oscuros |
| `.auth-card` | Contenedor de formularios de auth |
| `.checkout-layout` | Grid 2 columnas (main + sidebar) |
| `.perfil-layout` | Grid sidebar + contenido |
| `.toast-item` / `.toast-stack` | Sistema de notificaciones |
| `.skeleton-pulse` | Animación de loading skeleton |
| `.step-circle` / `.step-line` | Indicador de pasos del checkout |
| `.stock-overlay` | Badge de stock flotante sobre imagen |
| `.password-strength` / `.strength-bar` | Barra de fuerza de contraseña |

---

## Estado actual del proyecto

### Completado ✅
- Catálogo con filtro por categoría, búsqueda en vivo y ordenamiento (precio asc/desc, nombre)
- Cards con selector de cantidad, validación de stock, rating y zoom hover
- Favoritos persistidos en localStorage (solo para usuarios logueados)
- Carrito con cantidades, subtotales, cupones de descuento y checkout
- Sistema de toasts para feedback visual
- 11 rutas con React Router v6, 4 de ellas protegidas
- Diseño oscuro elegante con Bootstrap + CSS custom completo
- Navbar responsive con menú hamburguesa, estado logueado/no logueado
- Logo SVG hexagonal como componente React reutilizable
- Auth simulada completa (registro, login, logout, actualización de perfil, cambio de contraseña)
- Historial de pedidos persistido en localStorage
- Checkout en 3 pasos con validaciones completas
- Perfil de usuario con 3 secciones y barra de fuerza de contraseña
- Validaciones de formularios con hook `useForm` y componente `FormField`
- Página 404 con redirección
- Skeleton loader en catálogo
- Breadcrumbs en catálogo, detalle, carrito y checkout
- Productos relacionados en detalle de producto
- Galería de imágenes en detalle (actualmente con imagen única por producto)
- ProtectedRoute con redirección y preservación de destino

---

## Mejoras programadas — próximos pasos

### Prioridad alta
1. **Animaciones de transición entre páginas** con `framer-motion` (`npm install framer-motion`). Envolver las rutas con `AnimatePresence` y agregar `motion.div` con `initial`, `animate` y `exit` en cada página.
2. **Persistencia de favoritos por usuario** — actualmente los favoritos son globales del navegador. Migrar a `FavoritosContext` que use la clave `favoritos_${usuario.id}` en localStorage.
3. **Múltiples imágenes por producto** — agregar más fotos en `src/assets/images/` y actualizar el array `imagenes` en `products.js`. La galería ya está implementada.

### Prioridad media
4. **Página de perfil — foto de avatar** — permitir subir o elegir un avatar (base64 en localStorage).
5. **Buscador global en navbar** — input que filtra en tiempo real y muestra resultados desplegables.
6. **Filtros avanzados en catálogo** — rango de precio con slider, filtro por rating mínimo.
7. **Modo claro / oscuro** — toggle que cambie las variables CSS del `:root`.
8. **Animaciones de entrada en cards** — fade-in staggered al cargar el catálogo con `framer-motion`.

### Prioridad baja / pulido final
9. **PropTypes o TypeScript** — tipado de props para prevenir errores silenciosos.
10. **Error Boundaries** — capturar errores de renderizado y mostrar fallback elegante.
11. **Meta tags dinámicos** — `<title>` y `<meta description>` por página usando `react-helmet-async`.
12. **Accesibilidad** — roles ARIA en modales, foco gestionado en navegación por teclado, contraste verificado en textos `--text-muted` sobre `--bg`.
13. **Pasarela de pago real** — integrar Stripe o MercadoPago cuando el proyecto pase a producción. El formulario de checkout ya tiene la estructura lista para conectar.
14. **Backend real** — migrar de localStorage a una API REST (Node + Express o Supabase) para multi-dispositivo y seguridad real de passwords.

---

## Convenciones del proyecto

- **Español neutro** en toda la UI — sin regionalismos (no "campera", "remera", "mochila urbana" argentina)
- **Componentes funcionales** con hooks — sin clases
- **Un archivo por componente/página** — sin barrel exports
- **Imports con extensión** en algunos archivos (`.jsx`) — Vite lo maneja
- **CSS en App.css** — un solo archivo de estilos para el proyecto (no CSS modules)
- **Variables CSS** — siempre usar `var(--accent)`, `var(--bg)`, etc. — nunca hardcodear colores
- **Precios en CLP** — formato con `.toLocaleString()` sin decimales
- **Imágenes con fallback** — siempre usar `product.imagenes?.[0] || product.imagen`

---

## Errores frecuentes y soluciones

| Error | Causa | Solución |
|---|---|---|
| `Route` fuera de `Routes` | Route pegado después del `</Routes>` | Moverlo adentro del bloque `<Routes>` |
| `useCart is not exported` | Falta `export function useCart()` al final del context | Agregar la función exportada |
| `Failed to resolve import AuthContext` | Archivo no creado aún | Crear `src/context/AuthContext.jsx` |
| Hook llamado después de return condicional | `useCart()` dentro del JSX | Mover todos los hooks al inicio del componente |
| `const` dentro de `value={{}}` | Declaración dentro del objeto del Provider | Mover declaraciones antes del `return` |

---

## Prompt de inicio para nueva sesión de IA

Cuando se inicie una nueva sesión de asistencia, presentar este contexto:

> Estoy desarrollando **TechNova**, un e-commerce de tecnología con React 18 + Vite + Bootstrap 5 + React Router v6. El estado se maneja con Context API (Cart, Auth, Toast) y localStorage. Tengo implementado: catálogo con filtros, carrito con cupones, checkout en 3 pasos con validaciones, autenticación simulada, historial de pedidos y perfil de usuario. El diseño es oscuro elegante con paleta violeta (#8B5CF6) y neón menta (#00F5D4). Soy principiante en React, por lo que necesito código completo con todos los imports. El siguiente paso es [INDICAR TAREA].

---

*Documento generado como guía de continuidad — TechNova v1.0*
