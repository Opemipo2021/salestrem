'use client';

import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { useUser } from '@clerk/nextjs'
import { CreditCardIcon, Loader2 } from 'lucide-react'
import React from 'react'

const PaymentButton = () => {
  const { onSubscribe, isProcessing } = useSubscription()
  const { user, isLoaded, isSignedIn } = useUser()

  const handleSubscribe = () => {
    if (!isLoaded || !isSignedIn || !user?.emailAddresses?.[0]?.emailAddress) {
      return
    }
    onSubscribe(user.emailAddresses[0].emailAddress, 5000)
  }

  return (
    <Button
      disabled={isProcessing || !isLoaded || !isSignedIn}
      onClick={handleSubscribe}
      className="bg-gradient-to-br text-white rounded-full from-[#6d60a3] via-[#9434E6] font-bold to-[#CC3BD4]"
    >
      {isProcessing ? <Loader2 className="animate-spin" /> : <CreditCardIcon />}
      Upgrade
    </Button>
  )
}

export default PaymentButton  