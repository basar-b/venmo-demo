import { PaypalButton } from './paypal/component/PaypalButton'
import { PaypalProvider } from './paypal/context/PaypalProvider'

function App() {
  
  return (
    <div style={{ padding: '20px' }}>
      <PaypalProvider>
        <PaypalButton fundingSource="venmo" flow="checkout"/>
      </PaypalProvider>
    </div>
  )
}

export default App
