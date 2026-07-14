import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Trash2 } from 'lucide-react'

import { Modal, Button, Input } from '@avara/react'
import { DemoRow } from '../components/DemoRow'
import { PageHeader } from '../components/PageHeader'
import { PageShell } from '../components/PageShell'
import { Section } from '../components/Section'
import { useTheme } from '../hooks/use-theme'

export const Route = createFileRoute('/modal')({ component: ModalPage })

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
const animations = ['fade', 'scale', 'slideUp', 'slideDown', 'slideLeft', 'slideRight'] as const
const radii = ['sm', 'md', 'lg', 'xl'] as const
const backdrops = ['transparent', 'opaque', 'blur'] as const
const placements = ['center', 'top'] as const

function ModalPage() {
  const { mode, setMode, theme, setTheme } = useTheme()
  const [openKey, setOpenKey] = useState<string | null>(null)

  const open = (key: string) => setOpenKey(key)
  const close = () => setOpenKey(null)
  const is = (key: string) => openKey === key

  return (
    <PageShell>
      <PageHeader
        title="Modal"
        description="Dialog overlay — sizes, radius, backdrop, placement, dismiss rules, and composed forms."
        mode={mode}
        onModeChange={setMode}
        themeVariant={theme}
        onThemeVariantChange={setTheme}
      />

      <Section title="Sizes">
        <DemoRow>
          {sizes.map((size) => (
            <Button key={size} size="sm" onClick={() => open(`size-${size}`)}>
              {size}
            </Button>
          ))}
        </DemoRow>
      </Section>

      <Section
        title="Animation types"
        description="Open, then close via × / Escape / backdrop — exit should match entrance every time."
      >
        <DemoRow>
          {animations.map((animation) => (
            <Button key={animation} size="sm" onClick={() => open(`animation-${animation}`)}>
              {animation}
            </Button>
          ))}
        </DemoRow>
      </Section>

      <Section title="Radius">
        <DemoRow>
          {radii.map((radius) => (
            <Button key={radius} size="sm" onClick={() => open(`radius-${radius}`)}>
              {radius}
            </Button>
          ))}
        </DemoRow>
      </Section>

      <Section title="Backdrop">
        <DemoRow>
          {backdrops.map((backdrop) => (
            <Button key={backdrop} size="sm" onClick={() => open(`backdrop-${backdrop}`)}>
              {backdrop}
            </Button>
          ))}
        </DemoRow>
      </Section>

      <Section
        title="Placement"
        description="Resize your browser narrow to test the mobile sheet."
      >
        <DemoRow>
          {placements.map((placement) => (
            <Button key={placement} size="sm" onClick={() => open(`placement-${placement}`)}>
              {placement}
            </Button>
          ))}
          <Button size="sm" onClick={() => open('placement-auto')}>
            auto (default — try mobile width)
          </Button>
        </DemoRow>
      </Section>

      <Section title="Dismiss behavior">
        <DemoRow>
          <Button size="sm" onClick={() => open('not-dismissable')}>
            Not dismissable
          </Button>
          <Button size="sm" onClick={() => open('no-keyboard')}>
            Keyboard dismiss disabled
          </Button>
        </DemoRow>
      </Section>

      <Section title="showCloseButton">
        <DemoRow>
          <Button size="sm" onClick={() => open('no-close-button')}>
            No close button
          </Button>
        </DemoRow>
      </Section>

      <Section title="scrollBehavior: inside" description="Long content scrolls inside the popup.">
        <DemoRow>
          <Button size="sm" onClick={() => open('scroll-inside')}>
            Open
          </Button>
        </DemoRow>
      </Section>

      <Section title="Composed example" description="Form + footer actions.">
        <DemoRow>
          <Button
            color="danger"
            size="sm"
            startContent={<Trash2 />}
            onClick={() => open('confirm-delete')}
          >
            Delete account
          </Button>
        </DemoRow>
      </Section>

      {/* Animation modals */}
      {animations.map((animation) => (
        <Modal
          key={`animation-${animation}`}
          isOpen={is(`animation-${animation}`)}
          onOpenChange={(next) => !next && close()}
          animation={animation}
        >
          <Modal.Header>
            <Modal.Title>Animation: {animation}</Modal.Title>
            <Modal.Description>Watch both the entrance and the exit closely.</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm">
              Close this with the × button, Escape, and a backdrop click — the exit animation should
              play identically every time.
            </p>
          </Modal.Body>
        </Modal>
      ))}

      {/* Size modals */}
      {sizes.map((size) => (
        <Modal
          key={`size-${size}`}
          isOpen={is(`size-${size}`)}
          onOpenChange={(next) => !next && close()}
          size={size}
        >
          <Modal.Header>
            <Modal.Title>Size: {size}</Modal.Title>
            <Modal.Description>max-width for the {size} size token.</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm">Body content for the {size} modal.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" color="neutral" onClick={close}>
              Close
            </Button>
            <Button onClick={close}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      ))}

      {/* Radius modals */}
      {radii.map((radius) => (
        <Modal
          key={`radius-${radius}`}
          isOpen={is(`radius-${radius}`)}
          onOpenChange={(next) => !next && close()}
          radius={radius}
        >
          <Modal.Header>
            <Modal.Title>Radius: {radius}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm">Popup corners use radius={radius}.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Done</Button>
          </Modal.Footer>
        </Modal>
      ))}

      {/* Backdrop modals */}
      {backdrops.map((backdrop) => (
        <Modal
          key={`backdrop-${backdrop}`}
          isOpen={is(`backdrop-${backdrop}`)}
          onOpenChange={(next) => !next && close()}
          backdrop={backdrop}
        >
          <Modal.Header>
            <Modal.Title>Backdrop: {backdrop}</Modal.Title>
            <Modal.Description>Click outside to dismiss (opaque/blur should be easy to see).</Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm">Scrim style is {backdrop}.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Done</Button>
          </Modal.Footer>
        </Modal>
      ))}

      {/* Placement modals */}
      {([...placements, 'auto'] as const).map((placement) => (
        <Modal
          key={`placement-${placement}`}
          isOpen={is(`placement-${placement}`)}
          onOpenChange={(next) => !next && close()}
          placement={placement}
        >
          <Modal.Header>
            <Modal.Title>Placement: {placement}</Modal.Title>
            <Modal.Description>
              {placement === 'auto'
                ? 'Bottom sheet on mobile, centered on sm+.'
                : `Pinned toward ${placement}.`}
            </Modal.Description>
          </Modal.Header>
          <Modal.Body>
            <p className="text-sm">Try a narrow viewport for the auto sheet behavior.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={close}>Done</Button>
          </Modal.Footer>
        </Modal>
      ))}

      <Modal
        isOpen={is('not-dismissable')}
        onOpenChange={(next) => !next && close()}
        isDismissable={false}
      >
        <Modal.Header>
          <Modal.Title>Not dismissable</Modal.Title>
          <Modal.Description>Outside click should not close this modal.</Modal.Description>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm">Use the close button or the action below.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        isOpen={is('no-keyboard')}
        onOpenChange={(next) => !next && close()}
        isKeyboardDismissDisabled
      >
        <Modal.Header>
          <Modal.Title>Keyboard dismiss disabled</Modal.Title>
          <Modal.Description>Escape should not close this modal.</Modal.Description>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm">Outside click still works; Escape does not.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        isOpen={is('no-close-button')}
        onOpenChange={(next) => !next && close()}
        showCloseButton={false}
      >
        <Modal.Header>
          <Modal.Title>No close button</Modal.Title>
          <Modal.Description>Corner X is hidden — dismiss via outside click or action.</Modal.Description>
        </Modal.Header>
        <Modal.Body>
          <p className="text-sm">showCloseButton is false.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        isOpen={is('scroll-inside')}
        onOpenChange={(next) => !next && close()}
        scrollBehavior="inside"
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Scroll inside</Modal.Title>
          <Modal.Description>Header and footer stay put while the body scrolls.</Modal.Description>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-3">
            {Array.from({ length: 24 }, (_, i) => (
              <p key={i} className="text-sm text-muted">
                Paragraph {i + 1} — long content to force an internal scroll region.
              </p>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" color="neutral" onClick={close}>
            Cancel
          </Button>
          <Button onClick={close}>Got it</Button>
        </Modal.Footer>
      </Modal>

      <Modal
        isOpen={is('confirm-delete')}
        onOpenChange={(next) => !next && close()}
        size="sm"
      >
        <Modal.Header>
          <Modal.Title>Delete account</Modal.Title>
          <Modal.Description>
            This action cannot be undone. Type DELETE to confirm.
          </Modal.Description>
        </Modal.Header>
        <Modal.Body>
          <Input label="Confirmation" placeholder="DELETE" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="ghost" color="neutral" onClick={close}>
            Cancel
          </Button>
          <Button color="danger" startContent={<Trash2 />} onClick={close}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </PageShell>
  )
}
