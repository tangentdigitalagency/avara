import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Moon, Sun, Volume2, VolumeX, Check, X } from 'lucide-react'

import { Switch } from '@avara/react'
import { DemoPage } from '../components/DemoPage'
import { DemoGrid, DemoRow, DemoStack, VariantLabel } from '../components/DemoRow'
import { Section } from '../components/Section'
import { colors, sizes, variants } from '../lib/demo'

export const Route = createFileRoute('/switch')({ component: SwitchPage })

function SwitchPage() {
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <DemoPage
      title="Switch"
      description="On/off toggle — variants, colors, sizes, thumb icons, start/end content, validation, and loading. Toggle switches to verify thumb travel and checked styles."
    >
      <Section title="Variant × color" description="Every variant against every semantic color — defaultChecked so the on state is visible.">
        <DemoStack>
          {variants.map((variant) => (
            <div key={variant} className="flex flex-col gap-3">
              <VariantLabel>{variant}</VariantLabel>
              <DemoGrid>
                {colors.map((color) => (
                  <Switch
                    key={color}
                    variant={variant}
                    color={color}
                    label={color}
                    defaultChecked
                  />
                ))}
              </DemoGrid>
            </div>
          ))}
        </DemoStack>
      </Section>

      <Section title="Off state" description="Same matrix, unchecked — track/focus should still look right.">
        <DemoStack>
          {variants.map((variant) => (
            <DemoRow key={variant} label={variant}>
              {colors.map((color) => (
                <Switch key={color} variant={variant} color={color} aria-label={color} />
              ))}
            </DemoRow>
          ))}
        </DemoStack>
      </Section>

      <Section title="Sizes">
        <DemoRow>
          {sizes.map((size) => (
            <Switch key={size} size={size} label={size.toUpperCase()} defaultChecked />
          ))}
        </DemoRow>
      </Section>

      <Section title="Label & description">
        <DemoStack>
          <Switch
            label="Push notifications"
            description="Get alerts when something important happens."
            defaultChecked
          />
          <Switch label="Enable 2FA" isRequired />
        </DemoStack>
      </Section>

      <Section
        title="Invalid"
        description="Error replaces description. Invalid always renders danger, regardless of color."
      >
        <DemoStack>
          <Switch
            label="Share usage data"
            description="This won't show while invalid"
            isInvalid
            errorMessage="You must opt in or out before continuing."
          />
          <DemoRow>
            {colors.map((color) => (
              <Switch key={color} color={color} isInvalid label={color} />
            ))}
          </DemoRow>
        </DemoStack>
      </Section>

      <Section
        title="Thumb icon"
        description="Static icon, or a function of checked state (use controlled for the function form)."
      >
        <DemoStack>
          <Switch label="Static check" defaultChecked thumbIcon={<Check />} />
          <Switch
            label="Theme"
            checked={darkMode}
            onCheckedChange={setDarkMode}
            thumbIcon={(on) => (on ? <Moon /> : <Sun />)}
          />
        </DemoStack>
      </Section>

      <Section
        title="Start / end content"
        description="Icons in the track — visible on the opposite side of the thumb."
      >
        <DemoStack>
          <Switch
            label="Mute"
            defaultChecked
            startContent={<VolumeX />}
            endContent={<Volume2 />}
          />
          <Switch
            label="On / off glyphs"
            defaultChecked
            startContent={<X />}
            endContent={<Check />}
          />
        </DemoStack>
      </Section>

      <Section title="States">
        <DemoStack>
          <Switch label="Disabled off" isDisabled />
          <Switch label="Disabled on" isDisabled defaultChecked />
          <Switch label="Read only" isReadOnly defaultChecked />
          <Switch label="Loading" isLoading defaultChecked />
          <Switch
            label="Notifications"
            description={notifications ? 'Alerts are on.' : 'Alerts are off.'}
            checked={notifications}
            onCheckedChange={setNotifications}
          />
        </DemoStack>
      </Section>

      <Section title="Focus ring" description="Tab through — ring color should match each switch.">
        <DemoRow>
          {colors.map((color) => (
            <Switch key={color} color={color} label={color} defaultChecked />
          ))}
        </DemoRow>
      </Section>
    </DemoPage>
  )
}
