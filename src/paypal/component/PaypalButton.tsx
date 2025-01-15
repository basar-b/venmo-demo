import React from "react";
import ReactDOM from 'react-dom';
import { usePaypal } from "../context/usePaypal";
import { usePaypalSDK } from "./usePaypalSDK";
import type { PayPalButtons, PayPalButtonsComponentProps } from '@paypal/react-paypal-js';
import { FlowType, FundingSource } from "../types";

type Props = {
    fundingSource: FundingSource,
    flow: FlowType
}

const PaypalButtonStyle: PayPalButtonsComponentProps['style'] = {
    shape: 'rect',
    color: 'blue',
}

export function PaypalButton({ fundingSource, flow }: Props){
    const paypalState = usePaypal()
    const initializedSdk = usePaypalSDK('USD', flow, fundingSource);
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 
    const PaypalDriverButton: typeof PayPalButtons = window.paypal?.Buttons?.driver('react', { React, ReactDOM });

    if(paypalState.status !== 'loaded' || !initializedSdk) return <span>{`loading... ${fundingSource} button`}</span>

    const props: PayPalButtonsComponentProps = {
        fundingSource,
        style: PaypalButtonStyle,
    } 

    return <PaypalDriverButton {...props}/>
}   