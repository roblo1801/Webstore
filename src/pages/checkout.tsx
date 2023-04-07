import React, { ChangeEvent, useState } from "react";
import {
  PaymentMethod,
  StripeCardElementChangeEvent,
  StripeError,
  loadStripe,
} from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Box } from "@mantine/core";

// import "../styles/common.css";
// import "../styles/2-Card-Detailed.css";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField = ({
  onChange,
}: {
  onChange: (event: StripeCardElementChangeEvent) => void;
}) => (
  <div className="FormRow">
    <CardElement
      options={{
        ...CARD_OPTIONS,
        iconStyle: "solid", // or "default", or undefined
      }}
      onChange={onChange}
    />
  </div>
);

interface FormFieldProps {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  required: boolean;
  autoComplete: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

interface SubmitButtonProps {
  processing: boolean;
  error: StripeError | null;
  children: React.ReactNode;
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  processing,
  error,
  children,
  disabled,
}) => (
  <button
    className={`SubmitButton ${error ? "SubmitButton--error" : ""}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

interface ErrorMessageProps {
  children: React.ReactNode;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => (
  <div className="ErrorMessage" role="alert">
    <svg width="16" height="16" viewBox="0 0 17 17">
      <path
        fill="#FFF"
        d="M8.5,17 C3.80557963,17 0,13.1944204 0,8.5 C0,3.80557963 3.80557963,0 8.5,0 C13.1944204,0 17,3.80557963 17,8.5 C17,13.1944204 13.1944204,17 8.5,17 Z"
      />
      <path
        fill="#6772e5"
        d="M8.5,7.29791847 L6.12604076,4.92395924 C5.79409512,4.59201359 5.25590488,4.59201359 4.92395924,4.92395924 C4.59201359,5.25590488 4.59201359,5.79409512 4.92395924,6.12604076 L7.29791847,8.5 L4.92395924,10.8739592 C4.59201359,11.2059049 4.59201359,11.7440951 4.92395924,12.0760408 C5.25590488,12.4079864 5.79409512,12.4079864 6.12604076,12.0760408 L8.5,9.70208153 L10.8739592,12.0760408 C11.2059049,12.4079864 11.7440951,12.4079864 12.0760408,12.0760408 C12.4079864,11.7440951 12.4079864,11.2059049 12.0760408,10.8739592 L9.70208153,8.5 L12.0760408,6.12604076 C12.4079864,5.79409512 12.4079864,5.25590488 12.0760408,4.92395924 C11.7440951,4.59201359 11.2059049,4.59201359 10.8739592,4.92395924 L8.5,7.29791847 L8.5,7.29791847 Z"
      />
    </svg>
    {children}
  </div>
);

type ResetButtonProps = {
  onClick: () => void; // Specify the type of onClick prop as a function that takes no arguments and returns void
};

const ResetButton: React.FC<ResetButtonProps> = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    Reset
  </button>
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<StripeError | null>(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
    address: {
      city: "",
      line1: "",
      line2: "",
      postal_code: "",
      state: "",
    },
  });

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    if (error) {
      card.focus();
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: billingDetails,
    });

    setProcessing(false);
    if (payload.error) {
      setError(payload.error || null); // Update to pass the error message
    } else {
      setError(null); // Update to pass null for no error
      setPaymentMethod(payload.paymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
      address: {
        city: "",
        line1: "",
        line2: "",
        postal_code: "",
        state: "",
      },
    });
  };

  return paymentMethod ? (
    <div className="Result">
      <div className="ResultTitle" role="alert">
        Payment successful
      </div>
      <div className="ResultMessage">
        Thanks for trying Stripe Elements. No money was charged, but we
        generated a PaymentMethod: {paymentMethod.id}
      </div>
      <ResetButton onClick={reset} />
    </div>
  ) : (
    <form className="Form" onSubmit={handleSubmit}>
      <fieldset className="checkoutaddress">
        <h2>Shipping Address</h2>
        <Field
          label="Line1"
          id="line1"
          type="text"
          placeholder="123 Grady Ln"
          required
          autoComplete="line1"
          value={billingDetails.address.line1}
          onChange={(e) => {
            setBillingDetails({
              ...billingDetails,
              address: { ...billingDetails.address, line1: e.target.value },
            });
          }}
        />
        <Field
          label="Line2"
          id="line2"
          type="text"
          placeholder="Apt 1"
          required={false}
          autoComplete="line2"
          value={billingDetails.address.line2}
          onChange={(e) => {
            setBillingDetails({
              ...billingDetails,
              address: { ...billingDetails.address, line2: e.target.value },
            });
          }}
        />
        <Field
          label="City"
          id="city"
          type="text"
          placeholder="San Francisco"
          required
          autoComplete="city"
          value={billingDetails.address.city}
          onChange={(e) => {
            setBillingDetails({
              ...billingDetails,
              address: { ...billingDetails.address, city: e.target.value },
            });
          }}
        />
        <Field
          label="State"
          id="state"
          type="text"
          placeholder="CA"
          required
          autoComplete="state"
          value={billingDetails.address.state}
          onChange={(e) => {
            setBillingDetails({
              ...billingDetails,
              address: { ...billingDetails.address, state: e.target.value },
            });
          }}
        />
        <Field
          label="Postal Code"
          id="postal_code"
          type="text"
          placeholder="94107"
          required
          autoComplete="postal_code"
          value={billingDetails.address.postal_code}
          onChange={(e) => {
            setBillingDetails({
              ...billingDetails,
              address: {
                ...billingDetails.address,
                postal_code: e.target.value,
              },
            });
          }}
        />
      </fieldset>
      <fieldset className="FormGroup">
        <Field
          label="Name"
          id="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder="janedoe@gmail.com"
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </fieldset>

      <fieldset className="FormGroup">
        <CardField
          onChange={(e) => {
            setError(e.error || null);
            setCardComplete(e.complete);
          }}
        />
      </fieldset>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <SubmitButton processing={processing} error={error} disabled={!stripe}>
        Pay $25
      </SubmitButton>
    </form>
  );
};

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51MtJkJEDfdTgXOlgWulFEdC1JMMNOVdqhw6h26KcUG4lBYg7ooc1uHhIEGpxLzMWWptZShleJuouvAmrlMmegSXR00EEsvf0iU"
);

const App = () => {
  return (
    <Box py={10} className="AppWrapper">
      <Elements stripe={stripePromise} options={ELEMENTS_OPTIONS}>
        <CheckoutForm />
      </Elements>
    </Box>
  );
};

export default App;
