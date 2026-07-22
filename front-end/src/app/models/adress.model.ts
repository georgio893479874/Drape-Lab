export interface Address {
  id: string;
  userId: string;
  recipientName: string;
  recipientPhone: string;
  country: string;
  city: string;
  region?: string;
  postalCode?: string;
  streetAddress: string;
  isDefault: boolean;
}
