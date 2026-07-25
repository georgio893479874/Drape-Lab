# 👗 Drape Lab — Premium Women's Fashion E-Commerce Platform

<p align="center">
  <img src="https://img.shields.io/badge/Angular-v21-dd0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Node.js-Express_v5-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Prisma-v7-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="Prisma ORM" />
  <img src="https://img.shields.io/badge/PostgreSQL-latest-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/TypeScript-v5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
</p>

**Drape Lab** is a modern, high-performance e-commerce platform for luxury and high-fashion women's apparel. Built with a full-stack monorepo architecture, it features a reactive Angular SSR frontend with refined UI design and a robust Express + Prisma REST API backend.

---

## 🌟 Key Features

- **🛍️ Catalog & Interactive Filtering**:
  - Filter products by category (Blazers, Dresses, Tops, Accessories), sizes (XS-XXL), and price range.
  - Interactive color palette for precise selection.
  - Real-time product search functionality.

- **📊 Interactive Analytics Dashboard (Style Insights)**:
  - Visual metrics and category momentum tracking.
  - Monitors weekly reach, new arrivals, and customer wishlists.

- **👗 Detailed Product Pages & Gallery**:
  - Comprehensive breakdowns of materials, silhouette, neckline, decoration, and care instructions.
  - High-resolution image galleries and size selectors.

- **🛒 Shopping Cart & Order Summary**:
  - Dynamic cart management with instant total price updates.
  - Quantity control and item management.

- **👤 User Profile & Authentication**:
  - Secure auth system powered by JWT and `bcrypt` password hashing.
  - User dashboard featuring personal info, order history, and saved items.
  - Custom-styled Sign In and Sign Up modal views.

---

## 📸 Interface Screenshots

<div align="center">

### 1. Main Catalog & Navigation
![Main Catalog](docs/assets/catalog.png)

---

### 2. Style Insights Dashboard
<p float="left">
  <img src="docs/assets/dashboard-1.png" width="49%" />
  <img src="docs/assets/dashboard-2.png" width="49%" />
</p>

---

### 3. Product Grid & Featured Moments Gallery
<p float="left">
  <img src="docs/assets/product_grid.png" width="49%" />
  <img src="docs/assets/featured_moments.png" width="49%" />
</p>

---

### 4. Product Detail View
![Product Details](docs/assets/product_detail.png)
![Product Details](docs/assets/product_attributes.png)

---

### 5. Shopping Cart & User Profile
<p float="left">
  <img src="docs/assets/cart.png" width="49%" />
  <img src="docs/assets/profile.png" width="49%" />
</p>

---

### 6. Authentication (Sign In & Sign Up)
<p float="left">
  <img src="docs/assets/signin.png" width="49%" />
  <img src="docs/assets/signup.png" width="49%" />
</p>

</div>

---

## 🛠️ Tech Stack

### **Front-End**
- **Framework**: Angular v21 (Server-Side Rendering / SSR)
- **Styling**: Tailwind CSS v4 (`@tailwindcss/postcss`)
- **Icons**: `@ng-icons/heroicons`, `@ng-icons/core`
- **Testing**: Vitest, JSDOM
- **State & Async**: RxJS

### **Back-End**
- **Runtime & Framework**: Node.js, Express v5, TypeScript
- **Execution**: `tsx` (TypeScript Execute / Watch)
- **Database & ORM**: PostgreSQL, Prisma ORM v7 (`@prisma/adapter-pg`)
- **Security & Auth**: JSON Web Tokens (`jsonwebtoken`), `bcrypt`
- **Middleware**: `cors`

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/drape-lab.git](https://github.com/your-username/drape-lab.git)
cd drape-lab
```

---

### 2. Back-End Setup

1. **Navigate to the back-end folder:**
```bash
cd back-end
```

2. **Install back-end dependencies:**
```bash
npm install
```

3. **Create a `.env` file in the `back-end` directory and configure environment variables:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/drape_lab_db?schema=public"
JWT_SECRET="your_jwt_secret_key"
PORT=5000
```

4. **Sync PostgreSQL database schema and generate Prisma Client:**
```bash
npm run push
npm run generate
```

5. **Start the backend server in development mode:**
```bash
npm run dev
```

---

### 3. Front-End Setup

1. **Navigate to the front-end folder (from root):**
```bash
cd ../front-end
```

2. **Install front-end dependencies:**
```bash
npm install
```

3. **Start the Angular SSR development server:**
```bash
npm start
```

4. **Open your browser and visit:**
```text
http://localhost:4200
```

---

## 📜 Available Scripts

### **Front-End (`front-end/package.json`)**

```bash
npm start      # Run Angular dev server (ng serve)
npm run build  # Build application for production with SSR
npm run test   # Run unit tests via Vitest
```

### **Back-End (`back-end/package.json`)**

```bash
npm run dev     # Run Express server with live reload (tsx watch)
npm run studio  # Launch Prisma Studio GUI database manager
npm run push    # Push Prisma schema state to PostgreSQL database
```

---

## 📝 License

This project was built for educational and portfolio presentation purposes.
