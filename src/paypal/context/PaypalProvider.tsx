import type { JSX, PropsWithChildren } from 'react';

import { PaypalContext } from '.';
import { usePaypalScriptsLoader } from '../js/usePaypalScriptsLoader';

export function PaypalProvider({ children }: PropsWithChildren): JSX.Element {
	const state = usePaypalScriptsLoader();

	return <PaypalContext.Provider value={state}>{children}</PaypalContext.Provider>;
}
