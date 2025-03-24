import { Plane } from "@/icons/plane"
import { MaChiKo } from "@/icons/smart-ai"
import { TinyInstagram } from "@/icons/tiny-instagram"
import { v4 } from "uuid"

export type AutomationListenerProps = {
    id: string,
    label: string,
    icon: JSX.Element,
    description: string,
    type: 'SMARTAI' | 'MESSAGE'
}

export type AutomationTriggerProps = {
    id: string,
    label: string,
    icon: JSX.Element,
    description: string,
    type: 'COMMENT' | 'DM'
}

export const AUTOMATION_TRIGGER: AutomationTriggerProps[] = [{
    id: v4(),
    label: 'User comments on my post',
    icon: <TinyInstagram />,
    description: 'Slect if you want to automate the comments on your post',
    type: 'COMMENT'
}, {
    id: v4(),
    label: 'User sends me a dm with a keyword',
    icon: <TinyInstagram />,
    description: 'Slect if you want to automate the DMs on your profile',
    type: 'DM'
}

]

export const AUTOMATION_LISTENER: AutomationListenerProps[] = [{
    id: v4(),
    label: 'Send the user a message',
    icon: <Plane />,
    description: "Enter the message you want to be sent to the user",
    type: 'MESSAGE'
}, 
 {
    id: v4(),
    label: 'Let MaChiKo take over. Sit bqack and relax',
    icon: <MaChiKo />,
    description: "Tell MaChiKo about your project. You have to upgrade to use this feature. ",
    type: 'SMARTAI'
 }


]

