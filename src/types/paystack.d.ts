export interface PaystackInitializeResponse {
  authorizationUrl: string;
  accessCode: string;
  reference: string;
}

export interface PaymentResponse {
  success: boolean;
  data?: PaystackInitializeResponse;
  error?: string;
}