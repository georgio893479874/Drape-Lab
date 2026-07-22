export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  provider: 'LIQPAY' | 'PORTMONE' | 'STRIPE' | 'CASH_ON_DELIVERY';
  transactionId?: string;
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  updatedAt: Date;
}
