async function addScript(src: string): Promise<void> {
    return new Promise((resolve) => {
        const parent = document.head;

        const script = document.createElement('script');
        
        script.onload = () => {
            resolve();
        };

        script.async = true;
        script.src = src;

        parent.appendChild(script);
    });
}

export async function loadPaypalScripts(): Promise<[unknown, unknown, unknown, unknown]> {
    return Promise.all([
        addScript('https://js.braintreegateway.com/web/3.113.0/js/client.min.js'),
        addScript('https://js.braintreegateway.com/web/3.113.0/js/paypal-checkout.min.js'),
        addScript('https://js.braintreegateway.com/web/3.113.0/js/data-collector.min.js'),
        addScript('https://js.braintreegateway.com/web/3.113.0/js/venmo.min.js'),
    ]);
}
