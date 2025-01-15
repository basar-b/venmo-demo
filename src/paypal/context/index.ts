import { createContext } from 'react';
import { PaypalCheckout, VenmoCreate } from '../types';

export type PaypalState = { status: 'loading' | 'error'} | { status: 'loaded';  paypalCheckout: PaypalCheckout; venmoInstance: VenmoCreate };

export const PaypalContext = createContext<PaypalState>({ status: 'loading' });
