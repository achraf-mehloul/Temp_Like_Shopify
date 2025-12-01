# Luxury Watches E-Commerce

A beautiful, mobile-first e-commerce website for selling luxury watches, designed specifically for the Algerian market.

[live the demo](https://temp-like-shopify.onrender.com)

## Features

- **Modern Design**: Premium black and gold color scheme with smooth animations
- **Mobile-First**: Fully responsive design optimized for mobile devices
- **Shopping Cart**: Add, remove, and adjust quantities with an elegant sliding cart
- **Algerian Checkout**: Custom order form with:
  - Full name input
  - Phone number with fixed +213 prefix (9 digits required)
  - Wilaya (Province) selector with all 58 Algerian wilayas
  - البلدية (Commune) input with suggestions
- **Success Animation**: Beautiful confirmation message after order placement
- **No Backend Required**: Pure frontend application - orders logged to console

## Technologies Used

- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool
- **Lucide React** - Beautiful icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open your browser and navigate to the local development URL shown in the terminal.

### Build for Production

```bash
npm run build
```

The production files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Top navigation with logo and cart
│   ├── ProductCard.tsx     # Individual product display
│   ├── Cart.tsx            # Sliding cart panel
│   ├── CheckoutModal.tsx   # Order form with Algerian fields
│   └── SuccessModal.tsx    # Order confirmation message
├── data/
│   ├── products.ts         # Product catalog
│   └── locations.ts        # Algerian wilayas and communes
├── types/
│   └── index.ts            # TypeScript interfaces
├── App.tsx                 # Main application component
└── index.css               # Global styles and animations

public/
├── photo_2025-11-28_23-48-29.jpg  # Store logo
└── products/
    ├── watch3.jpg          # Product images
    ├── watch4.jpg
    ├── watch5.jpg
    └── watch6.jpg
```

## Customization

### Adding Products

Edit `src/data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 1,
    name: 'Your Watch Name',
    price: 15000,
    image: '/products/your-image.jpg',
    description: 'Your description'
  }
];
```

### Modifying Colors

The design uses a black and gold theme. To change colors, update the Tailwind classes in components:

- Primary gold: `from-yellow-400 to-yellow-600`
- Background: `from-gray-900 to-black`
- Accents: `border-yellow-600/30`

### Handling Orders

Currently, orders are logged to the browser console. To integrate with a backend:

1. Open `src/App.tsx`
2. Find the `handleSubmitOrder` function
3. Add your API call:

```typescript
const handleSubmitOrder = async (formData: OrderForm) => {
  try {
    await fetch('your-api-endpoint', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ formData, items: cartItems })
    });
    // ... rest of the code
  } catch (error) {
    console.error('Order submission failed:', error);
  }
};
```

## Mobile Optimization

The site is optimized for mobile devices:

- Touch-friendly buttons and inputs
- Responsive grid layouts
- Mobile-first responsive design
- Optimized image loading
- Smooth animations and transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is private and proprietary.

## Support

For questions or support, please contact the development team.
