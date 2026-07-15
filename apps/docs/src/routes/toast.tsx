import { createFileRoute } from '@tanstack/react-router'

import { toast, Button } from '@avara/react'
import { DemoPage } from '../components/DemoPage'
import { DemoRow } from '../components/DemoRow'
import { Section } from '../components/Section'

export const Route = createFileRoute('/toast')({ component: ToastPage })

function ToastPage() {
  return (
    <DemoPage
      title="Toast"
      description="Transient notifications — colors, descriptions, actions, duration, promises, and stack behavior. Turn on Glass to test translucent toast cards."
    >
      <Section title="Colors" description="Imperative API via toast() / toast.success / etc.">
        <DemoRow>
          <Button size="sm" onClick={() => toast('Update saved')}>
            Default
          </Button>
          <Button size="sm" onClick={() => toast('Synced', { color: 'primary' })}>
            Primary
          </Button>
          <Button size="sm" onClick={() => toast.success('File uploaded')}>
            Success
          </Button>
          <Button size="sm" onClick={() => toast.warning('Storage almost full')}>
            Warning
          </Button>
          <Button size="sm" onClick={() => toast.danger('Something went wrong')}>
            Danger
          </Button>
          <Button size="sm" onClick={() => toast.info('New version available')}>
            Info
          </Button>
        </DemoRow>
      </Section>

      <Section title="With description">
        <DemoRow>
          <Button
            size="sm"
            onClick={() =>
              toast.success('Event created', {
                description: 'Sunday, December 3rd at 9:00 AM',
              })
            }
          >
            Success + description
          </Button>
          <Button
            size="sm"
            onClick={() =>
              toast.danger('Deploy failed', {
                description: 'Build exited with code 1 on main.',
              })
            }
          >
            Danger + description
          </Button>
        </DemoRow>
      </Section>

      <Section title="With action" description="Action fires, then you can chain another toast.">
        <DemoRow>
          <Button
            size="sm"
            onClick={() =>
              toast('File deleted', {
                action: {
                  label: 'Undo',
                  onClick: () => toast.info('Restored'),
                },
              })
            }
          >
            Delete with undo
          </Button>
        </DemoRow>
      </Section>

      <Section title="Duration" description="Number in ms, or infinite for manual dismiss only.">
        <DemoRow>
          <Button size="sm" onClick={() => toast('Short — 2s', { duration: 2000 })}>
            2 seconds
          </Button>
          <Button size="sm" onClick={() => toast('Default timeout', { duration: 5000 })}>
            5 seconds
          </Button>
          <Button
            size="sm"
            onClick={() => toast('This stays until closed', { duration: 'infinite' })}
          >
            Infinite
          </Button>
        </DemoRow>
      </Section>

      <Section title="Promise" description="Loading → success or error from a real Promise.">
        <DemoRow>
          <Button
            size="sm"
            onClick={() =>
              toast.promise(
                new Promise<string>((resolve, reject) => {
                  setTimeout(() => {
                    if (Math.random() > 0.3) resolve('done')
                    else reject(new Error('failed'))
                  }, 2000)
                }),
                {
                  loading: 'Uploading file…',
                  success: 'File uploaded',
                  error: 'Upload failed',
                },
              )
            }
          >
            Fire promise
          </Button>
        </DemoRow>
      </Section>

      <Section
        title="Stress test"
        description="Stacking, swipe dismiss, and spring entrance — fire several quickly."
      >
        <DemoRow>
          <Button
            size="sm"
            onClick={() => {
              for (let i = 1; i <= 5; i++) {
                setTimeout(() => toast(`Update ${i} saved`), i * 150)
              }
            }}
          >
            Fire 5 rapidly
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              toast.success('A — saved')
              toast.warning('B — almost full', { description: '12% free' })
              toast.danger('C — failed')
              toast.info('D — tip')
            }}
          >
            Mixed colors at once
          </Button>
        </DemoRow>
      </Section>
    </DemoPage>
  )
}
