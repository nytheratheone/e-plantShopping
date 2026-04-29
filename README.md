# Paradise Nursery 🌿

**Paradise Nursery** is a dynamic e-commerce web application for browsing and purchasing houseplants. Built with React, Redux Toolkit, and Vite.

## Project Overview

This shopping cart application allows users to:

- Browse plants organized across multiple categories
- View plant details including thumbnail, name, description, and price
- Add plants to a shopping cart with real-time cart count updates
- Manage cart items: increase/decrease quantity, remove items
- View per-item totals and overall cart total
- Navigate seamlessly between the landing page, product listing, and cart

## Tech Stack

- **React 18** component-based UI
- **Redux Toolkit** global state management for cart
- **React Router DOM** client-side routing
- **Vite** fast development and build tooling
- **CSS Modules / App.css** styling and layout

## Project Structure

```
paradise-nursery/
├── public/
├── src/
│   ├── components/
│   │   ├── AboutUs.jsx
│   │   ├── CartItem.jsx
│   │   └── ProductList.jsx
│   ├── store/
│   │   └── CartSlice.jsx
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── README.md
└── package.json
```

## Getting Started

```bash
npm install
npm run dev
```

## Features

- Responsive navbar with live cart count badge
- At least 3 plant categories with 6+ plants each
- Add to Cart with button disable after addition
- Cart page with quantity controls, delete, checkout prompt, and continue shopping
- Landing page with company name and Get Started CTA

## Author

Built as a final capstone project for the React/Redux front-end development curriculum.
