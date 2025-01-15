import { useContext } from 'react';

import { PaypalContext } from '.';
import type { PaypalState } from '.';

export function usePaypal(): PaypalState {
	return useContext(PaypalContext);
}
