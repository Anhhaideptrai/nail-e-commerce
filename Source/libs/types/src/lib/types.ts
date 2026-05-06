export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export type ProductStatus = 'draft' | 'active' | 'archived';

export type OrderStatus =
  | 'new'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export interface Money {
  amount: number;
  currency: CurrencyCode;
}

export interface ProductSummary {
  id: string;
  slug: string;
  name: string;
  price: Money;
  salePrice?: Money;
  status: ProductStatus;
  imageUrl?: string;
}
