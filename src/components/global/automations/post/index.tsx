import { useAutomationPosts } from '@/hooks/use-automations'
import { useQueryAutomationPosts } from '@/hooks/user-queries'
import React from 'react'
import TriggerButton from '../trigger-button'
import { InstagramPostProps } from '@/types/post.type'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Loader from '../../loader'

type Props = {
  id: string
}

const PostButton = ({ id }: Props) => {
  const { data } = useQueryAutomationPosts()
  const {posts, onSelectPost, isPending, mutate} = useAutomationPosts(id)

  return (
    <TriggerButton label='Attach a post'>
      {data?.status === 200 ? (
        <div className='flex flex-col gap-y-3 w-full'>
          <div className='flex flex-wrap w-full gap-3'>
            {data.data.data.map((post: InstagramPostProps) => {
              <div className='relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden' key={post.id} onClick={() => onSelectPost({
                postid: post.id,
                caption: post.caption,
                media: post.media_url,
                mediaType: post.media_type
              })}>
                {posts.find((p) => p.postid === post.id) && (
                  <CheckCircle 
                    fill='white'
                    stroke='black'
                  />
                )}
                <Image 
                  fill
                  sizes='100vw'
                  src={post.media_url}
                  alt='post images'
                  className={cn('hover:opacity-75 transition duration-100',
                    posts.find((p) => p.postid === post.id) && 'opacity-75'
                  )}
                />
              </div>
            })}
          </div>
          <Button
            onClick={mutate}
            disabled={posts.length === 0 }
            className='bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]'
          >
            <Loader state={isPending}>Attach Post</Loader>
          </Button>
        </div>
      ) : (
        <p className='text-text-secondary text-center'>No posts found!</p>
      )}
    </TriggerButton>
  )
}

export default PostButton