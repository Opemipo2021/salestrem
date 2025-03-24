import { useState } from "react";

interface PaymentResponse {
  success: boolean;
  data?: {
    authorizationUrl: string;
    accessCode: string;
    reference: string;
  };
  error?: string;
}

export const useSubscription = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubscribe = async (email: string, amount: number) => {
    try {
      setIsProcessing(true);
      setError(null);

      console.log('Payment Request:', { email, amount });

      const response = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, amount, callback_url: `${window.location.origin}/payment-callback` })
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Payment Error:', errorData);
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data: PaymentResponse = await response.json();
      console.log('Payment Response:', data);

      if (data.success && data.data?.authorizationUrl) {
        window.location.href = data.data.authorizationUrl;
        return;
      }

      throw new Error(data.error || 'Payment initialization failed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsProcessing(false);
    }
  };

  return { onSubscribe, isProcessing, error };
};