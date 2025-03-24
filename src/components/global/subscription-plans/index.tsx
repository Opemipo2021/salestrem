import { useQueryUser } from '@/hooks/user-queries'

type Props = {
  type: 'FREE' | 'PRO'
  children: React.ReactNode
}

export const SubscriptionPlan = ({ children, type }: Props) => {
  const { data } = useQueryUser()
  console.log('Subscription data:', data?.data?.subscription?.plan);
  console.log('Expected type:', type);
  return data?.data?.subscription?.plan === type && children
}