import { NextResponse } from 'next/server';
import axios from 'axios';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { email, amount } = await req.json();

    const paystackResponse = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount: amount * 100,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-callback`,
        metadata: {
          userId: user.id,
          plan_type: 'PRO'
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Create subscription record without explicitly setting id
    const subscription = await db.subscription.create({
      data: {
        userId: user.id,
        plan: 'PRO',
        customerId: paystackResponse.data.data.reference,
        reference: paystackResponse.data.data.reference,
        status: 'PENDING',
      }
    });

    return NextResponse.json({
      success: true,
      data: paystackResponse.data.data
    });

  } catch (error) {
    console.error('Payment Error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment initialization failed' },
      { status: 500 }
    );
  }
}