'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function PaymentCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!reference) {
          router.push('/404')
          return
        }

        const response = await fetch(`/api/payment?reference=${reference}`, {
          method: 'GET',
        })

        const data = await response.json()

        if (data.success) {
          // Payment successful, redirect to dashboard
          router.push('/dashboard')
        } else {
          // Payment failed, redirect to 404
          router.push('/404')
        }
      } catch (error) {
        console.error('Payment verification failed:', error)
        router.push('/404')
      }
    }

    verifyPayment()
  }, [reference, router])

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h4 className='text-5xl font-bold'>404</h4>
      <p className="text-xl font-bold">Oops, something went wrong!</p>
    </div>
  )
}