import { InstagramBlue } from '@/icons/instagram-blue'
import { InstagramDuoToneBlue } from '@/icons/instagram-duo-tone-blue'
import { Plane } from '@/icons/plane'
import React from 'react'

type Props = {
    type: string
    keyword: {
        id: string
        word: string
        automationId: string | null
    }[]
}

const ActiveTrigger = ({type, keyword}: Props) => {
  return (
    <div className='bg-background-80 p-3 rounded-xl w-full'>
        <div className='flex gap-x-2 items-center'>
            {type === 'COMMENT' ? <InstagramBlue/> : <Plane />}
            <p className='text-lg'>
                {type === 'COMMENT' ? 'Users comment on my post' : 'User sends me a Dm'}
            </p>
        </div>
        <p className='text-text-secondary'>
        {type === 'COMMENT' ? 'If user comment on a video post, that is setup to listen for keywords, this automation will fire.' 
        : 'If the user sends you a message that contains a keyword, the automation shall fire.'}

        </p>
        <div className='flex gap-2 mt-5 flex-wrap'>
            {keyword.map((word) => (
                <div className='bg-gradient-to-br from-[#3352CC] to-[#1C2D70] flex items-center gap-x-2 capitalize text-white font-light py-1 px-4 rounded-full'>
                    <p>{word.word}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ActiveTrigger