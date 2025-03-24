'use server'

import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { createUser, findUser } from "./queries"
import { refreshToken } from "@/lib/fetch"
import { updateIntegration } from "../integrations/queries"

interface SubscribeResponse {
  success: boolean;
  data?: {
      authorizationUrl?: string;
      reference?: string;
  };
  error?: string;
}

export const onCurrentUser = async () => {
    const user = await currentUser()
    if(!user) return redirect('/sign-in')

    return user
}

export const onBoardUser = async () => {
    const user = await onCurrentUser()
    try {
      const found = await findUser(user.id)
      if (found) {
          if (found.integrations.length > 0) {
            const today = new Date()
            const time_left = found.integrations[0].expiresAt?.getTime()! - today.getTime()

            const days = Math.round(time_left / ( 1000 * 3600 * 24 ))

            if (days < 5) {
              console.log('refresh')

              const refresh = await refreshToken(found.integrations[0].token)

              const today = new Date()
              const expire_date = today.setDate(today.getDate() + 60)

              const updateToken = await updateIntegration(
                refresh.access_token,
                new Date(expire_date),
                found.integrations[0].id
              )

              if (!updateToken) {
                console.log('Update Token Failed')
              }
            }
          }

          return {
            status: 200,
            data: {
              firstname: found.firstname,
              lastname: found.lastname,
            },
          }
      }

      const created = await createUser(
        user.id,
        user.firstName!,
        user.lastName!,
        user.emailAddresses[0].emailAddress,
      )
      return { staus: 201, data: created }
    } catch (error) {
        console.log(error)
        return{ status: 500 }
    }
}

export const onUserInfo = async() => {
  const user =await onCurrentUser()
  try {
    const profile = await findUser(user.id)
    if (profile) return { status: 200, data: profile }

    return { status: 404 }
  } catch (error) {
    return { status: 500 }
  }
}

export const onSubscribe = async (): Promise<SubscribeResponse> => {
  try {
      const user = await onCurrentUser();

      if (!user?.emailAddresses[0]?.emailAddress) {
          return {
              success: false,
              error: 'User email not found'
          };
      }

      // Call your existing payment API route
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/payment`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: user.emailAddresses[0].emailAddress,
              amount: 1000 // Amount in Naira
          })
      });

      const data = await response.json();

      if (!data.success) {
          return {
              success: false,
              error: data.error || 'Payment initialization failed'
          };
      }

      return {
          success: true,
          data: {
              authorizationUrl: data.data.authorizationUrl,
              reference: data.data.reference
          }
      };

  } catch (error) {
      console.error('Subscription error:', error);
      return {
          success: false,
          error: 'Failed to initialize subscription'
      };
  }
}

