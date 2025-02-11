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

export const PLANS = [
    {
      name: 'Free Plan',
      description: 'Perfect for getting started',
      price: '$0',
      features: [
        'Boost engagement with target responses',
        'Automate comment replies to enhance audience interaction',
        'Turn followers into customers with targeted messaging',
      ],
      cta: 'Get Started',
    },
    {
      name: 'MachiKo AI Plan',
      description: 'Advanced features for power users',
      price: '$10',
      features: [
        'All features from Free Plan',
        'AI-powered response generation',
        'Advanced analytics and insights',
        'Priority customer support',
        'Custom branding options',
      ],
      cta: 'Upgrade Now',
    },
  ]