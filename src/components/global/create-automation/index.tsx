import { Button } from '@/components/ui/button'
import React from 'react'
import Loader from '../loader'
import { AutomationDuoToneWhite } from '@/icons/automation-duo-tone-white'

type Props = {}

const CreateAutomation = (props: Props) => {
  return (
    <Button className='lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]'>
        <Loader state={false} className={''}>
            <AutomationDuoToneWhite />
            <p className='lg:inline hidden '>
                Create Automation
            </p>
        </Loader>
    </Button>
  )
}

export default CreateAutomation