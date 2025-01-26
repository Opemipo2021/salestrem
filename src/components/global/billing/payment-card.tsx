import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
    label: string
    current: 'PRO' | 'FREE'
    landing?: boolean
}

const PaymentCard = ({label, current, landing}: Props) => {
  return (
    <div className={cn(
        label !== current ? 'bg-in-active' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500', 'p-[2px] rounded-xl overflow-hidden'
    )}>
        <div className={cn(
            landing && 'radial--gradient--pink',
            'flex flex-col rounded-xl pl-5 py-5 pr-10 bg-background-90'
        )}>
            {landing ? (
                <h2 className='text-2xl'>
                    {label === 'PRO' && 'Premium Plan'}
                    {label === 'FREE' && 'Free Plan'}
                </h2>
            ) : (
                <h2 className='text-2xl'>
                    {label === current
                    ? 'Your Current Plan'
                    : current === 'PRO'
                    ? 'Downgrade'
                    : 'Upgrade'}
                </h2>
            )}
            <p className='text-text-secondary text-sm mb-2'>
               This is what your current plan covers for AI and automations.
            </p>
            {label === 'PRO' ? (
                <span className='bg-gradient-to-r text-3xl from-indigo-500 via-purple-500 to-pink-500 text-white py-2 px-4 rounded-xl bg-clip-text font-bold text-transparent'>
                    {label}
                    Trizzy AI
                </span>
            ) : (
                <p className='font-bold text-3xl text-text-secondary'>
                    Standard
                </p>
            )}
        </div>
    </div>
  )
}

export default PaymentCard