import { NextResponse } from 'next/server';
import axios from 'axios';
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    if (!user) return new Response('Unauthorized', { status: 401 });

    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) return new Response('Missing reference', { status: 400 });

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data.data.status === 'success') {
      await db.subscription.update({
        where: { reference },
        data: {
          status: 'ACTIVE',
          updatedAt: new Date()
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully'
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Payment verification failed' },
      { status: 500 }
    );
  }
}