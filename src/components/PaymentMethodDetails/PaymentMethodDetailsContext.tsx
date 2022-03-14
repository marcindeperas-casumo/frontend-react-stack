import * as React from "react";

export type TPaymentMethod = {
  name: string;
  identifier: string;
  minDepositAmount: number;
  maxDepositAmount: number;
};

type TPaymentMethodContextType = {
  selectedPaymentMethod: Partial<TPaymentMethod>;
  setSelectedPaymentMethod: (method: Partial<TPaymentMethod>) => void;
};

type TPaymentMethodContextProviderProps = {
  children: React.ReactNode;
};

export const PaymentMethodContext = React.createContext<TPaymentMethodContextType>(
  {
    selectedPaymentMethod: {},
    setSelectedPaymentMethod: (method: Partial<TPaymentMethod>) => {},
  }
);

export const PaymentMethodContextProvider = ({
  children,
}: TPaymentMethodContextProviderProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState<
    Partial<TPaymentMethod>
  >({});

  React.useEffect(() => {
    const paymentMinDepositAmount = window.sessionStorage.getItem(
      "paymentMinDepositAmount"
    );

    if (paymentMinDepositAmount) {
      const minDepositAmount = parseInt(paymentMinDepositAmount);
      setSelectedPaymentMethod({ minDepositAmount });
    }
  }, [setSelectedPaymentMethod]);

  return (
    <PaymentMethodContext.Provider
      value={{ selectedPaymentMethod, setSelectedPaymentMethod }}
    >
      {children}
    </PaymentMethodContext.Provider>
  );
};

export const usePaymentMethodContext = () => {
  return React.useContext(PaymentMethodContext);
};
