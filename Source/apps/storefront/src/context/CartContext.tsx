import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product, DISCOUNT_CODES } from '../MOCK_DATAS/products';

export interface CartItem {
  product: Product;
  size: string;
  shape: string;
  length: string;
  quantity: number;
}

export interface MockOrder {
  id: string;
  phone: string;
  email: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
  createdAt: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
}

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  discountRate: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string; shape: string; length: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; shape: string; length: string; quantity: number } }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; rate: number } }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  discountCode: null,
  discountRate: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.findIndex(
        i =>
          i.product.id === action.payload.product.id &&
          i.size === action.payload.size &&
          i.shape === action.payload.shape &&
          i.length === action.payload.length
      );
      if (existing !== -1) {
        const updated = [...state.items];
        updated[existing] = { ...updated[existing], quantity: updated[existing].quantity + action.payload.quantity };
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i =>
            !(
              i.product.id === action.payload.productId &&
              i.size === action.payload.size &&
              i.shape === action.payload.shape &&
              i.length === action.payload.length
            )
        ),
      };
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            i =>
              !(
                i.product.id === action.payload.productId &&
                i.size === action.payload.size &&
                i.shape === action.payload.shape &&
                i.length === action.payload.length
              )
          ),
        };
      }
      return {
        ...state,
        items: state.items.map(i =>
          i.product.id === action.payload.productId &&
          i.size === action.payload.size &&
          i.shape === action.payload.shape &&
          i.length === action.payload.length
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    }
    case 'APPLY_DISCOUNT':
      return { ...state, discountCode: action.payload.code, discountRate: action.payload.rate };
    case 'REMOVE_DISCOUNT':
      return { ...state, discountCode: null, discountRate: 0 };
    case 'CLEAR_CART':
      return { ...initialState };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  applyDiscount: (code: string) => boolean;
  addOrder: (order: MockOrder) => void;
  getOrder: (orderId: string, phone: string) => MockOrder | null;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, () => {
    try {
      const saved = localStorage.getItem('lunelle_cart');
      return saved ? JSON.parse(saved) : initialState;
    } catch {
      return initialState;
    }
  });

  useEffect(() => {
    localStorage.setItem('lunelle_cart', JSON.stringify(state));
  }, [state]);

  const cartCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => {
    const price = i.product.salePrice ?? i.product.price;
    return sum + price * i.quantity;
  }, 0);
  const discountAmount = subtotal * state.discountRate;
  const total = subtotal - discountAmount;

  const applyDiscount = (code: string): boolean => {
    const upper = code.toUpperCase();
    if (DISCOUNT_CODES[upper]) {
      dispatch({ type: 'APPLY_DISCOUNT', payload: { code: upper, rate: DISCOUNT_CODES[upper] } });
      return true;
    }
    return false;
  };

  const addOrder = (order: MockOrder) => {
    try {
      const existing = JSON.parse(localStorage.getItem('lunelle_orders') || '[]');
      localStorage.setItem('lunelle_orders', JSON.stringify([...existing, order]));
    } catch {
      return;
    }
  };

  const getOrder = (orderId: string, phone: string): MockOrder | null => {
    try {
      const orders: MockOrder[] = JSON.parse(localStorage.getItem('lunelle_orders') || '[]');
      return orders.find(o => o.id === orderId && o.phone === phone) || null;
    } catch {
      return null;
    }
  };

  return (
    <CartContext.Provider value={{ state, dispatch, cartCount, subtotal, discountAmount, total, applyDiscount, addOrder, getOrder }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
