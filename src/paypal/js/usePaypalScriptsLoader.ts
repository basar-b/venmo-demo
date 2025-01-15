import { useEffect, useState } from 'react';
import { PaypalState } from '../context';
import { loadPaypalScripts } from './loadScripts';
import { CLIENT_TOKEN } from '../clientToken';

export function usePaypalScriptsLoader(): PaypalState {
	const [state, setState] = useState<PaypalState>({ status: 'loading' });
	const PAYPAL_LOAD_TIMEOUT = 8000; // 8 seconds to load paypal sdk

	useEffect(() => {
		(async function initializePaypal() {
			try {
                
                await loadPaypalScripts()
				
                if (!window.braintree?.client) {
					setState({ status: 'error' });
					return;
				}

				const braintreeClientInstance = await window.braintree.client.create({ authorization: CLIENT_TOKEN });
				const venmoInstance = await window.braintree.venmo.create({
					client: braintreeClientInstance,
				});
				const paypalCheckoutInstance = await window.braintree.paypalCheckout.create({
					client: braintreeClientInstance,
				});

				const timeout = async (ms: number) => {
					return new Promise((_resolve, reject) => {
						setTimeout(() => reject(new Error('Failed to load PayPal SDK: Timeout')), ms);
					});
				};
				await Promise.race([paypalCheckoutInstance.loadPayPalSDK({}), timeout(PAYPAL_LOAD_TIMEOUT)]);

				setState({ status: 'loaded', paypalCheckout: paypalCheckoutInstance, venmoInstance });
			} catch {
                // error
			}
		})();
	}, []);

	return state;
}
