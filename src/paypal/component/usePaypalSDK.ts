import { useEffect, useState } from 'react';
import { usePaypal } from '../context/usePaypal';
import { FlowType, FundingSource } from '../types';

type InitializedFlow = FlowType | undefined;

export function usePaypalSDK(currency: string, flow: FlowType, funding: FundingSource): InitializedFlow {
	const [initialized, setInitialized] = useState<InitializedFlow>(undefined);
	const paypalState = usePaypal();

	useEffect(() => {
		(async () => {
			if (initialized === flow || paypalState.status !== 'loaded') return;
			await paypalState.paypalCheckout.loadPayPalSDK({
				currency,
				vault: flow === 'vault',
				...(funding === 'venmo' ? { 'enable-funding': 'venmo', 'buyer-country': 'US' } : {}),
			});
			setInitialized(flow);
		})();
	}, [currency, flow, initialized, paypalState, funding]);

	return initialized;
}
