// App configuration constants

export const APP_NAME = 'My App';
export const APP_DESCRIPTION = 'An amazing web application';

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  PRODUCT_DETAIL: '/products/:id',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ABOUT: '/about',
  CONTACT: '/contact',
  NOT_FOUND: '*',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const SOCIAL_LINKS = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
  linkedin: '#',
} as const;