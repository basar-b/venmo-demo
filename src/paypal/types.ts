import type * as _braintree from 'braintree-web';

export type PaypalCheckout = _braintree.PayPalCheckout;
export type VenmoCreate = _braintree.Venmo;


declare global {
	interface Window {
		braintree: typeof _braintree;
	}
}

export type FundingSource = 'venmo' | 'paypal';
export type FlowType = 'checkout' | 'vault';