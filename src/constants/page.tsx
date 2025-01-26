import { AutomationDuoToneBlue } from "@/icons/automation-duo-tone-blue"
import { ContactsDuoToneBlue } from "@/icons/contacts-duo-tone-blue"
import { HomeDuoToneBlue } from "@/icons/home-duo-tone-blue"
import { RocketDuoToneBlue } from "@/icons/rocket-duo-tone-blue"
import { SettingsDuoToneWhite } from "@/icons/settings-duo-tone-white"
import { Contact } from "lucide-react"
import React from "react"

export const PAGE_BREAD_CRUMBS: string[] = [
    'contacts',
    'automations',
    'integrations',
    'settings',
]

type Props = {
    [page in string]: React.ReactNode
}

export const PAGE_ICON: Props = {
    AUTOMATIONS: <AutomationDuoToneBlue />,
    INTEGRATIONS: <RocketDuoToneBlue />,
    CONTACTS: <ContactsDuoToneBlue />,
    SETTINGS: <SettingsDuoToneWhite />,
    HOME: <HomeDuoToneBlue />

}