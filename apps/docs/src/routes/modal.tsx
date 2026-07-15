import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Trash2 } from 'lucide-react'

import { Modal, Button, Input  } from '@avara/react'
import type {ModalProps} from '@avara/react';
import { DemoPage } from '../components/DemoPage'
import { DemoRow } from '../components/DemoRow'
import { Section } from '../components/Section'

export const Route = createFileRoute('/modal')({ component: ModalPage })

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
const animations = ['fade', 'scale', 'slideUp', 'slideDown', 'slideLeft', 'slideRight'] as const
const radii = ['sm', 'md', 'lg', 'xl'] as const
const backdrops = ['transparent', 'opaque', 'blur'] as const
const placements = ['center', 'top', 'auto'] as const

function DemoModal({
  id,
  openKey,
  onClose,
  title,
  description,
  children,
  footer,
  ...props
}: {
  id: string
  openKey: string | null
  onClose: () => void
  title: string
  description?: string
  children?: React.ReactNode
  footer?: React.ReactNode
} & Omit<ModalProps, 'isOpen' | 'onOpenChange' | 'children'>) {
  return (
    <Modal isOpen={openKey === id} onOpenChange={(open) => !open && onClose()} {...props}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        {description ? <Modal.Description>{description}</Modal.Description> : null}
      </Modal.Header>
      {children != null ? <Modal.Body>{children}</Modal.Body> : null}
      {footer != null ? <Modal.Footer>{footer}</Modal.Footer> : null}
    </Modal>
  )
}

function ModalPage() {
  const [openKey, setOpenKey] = useState<string | null>(null)

  const open = (key: string) => setOpenKey(key)
  const close = () => setOpenKey(null)

  const done = (
    <Button onClick={close}>Done</Button>
  )

  return (
    <DemoPage
      title="Modal"
      description="Dialog overlay — sizes, animations, backdrop, placement, dismiss rules, and composed forms. Turn on Glass (try Premium) to test translucency."
    >
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

      <Section title="Placement" description="Resize your browser narrow to test the mobile sheet.">
        <DemoRow>
          {placements.map((placement) => (
            <Button key={placement} size="sm" onClick={() => open(`placement-${placement}`)}>
              {placement === 'auto' ? 'auto (try mobile width)' : placement}
            </Button>
          ))}
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

      <Section title="Composed example" description="Form + footer actions (Button + Input).">
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

      {animations.map((animation) => (
        <DemoModal
          key={animation}
          id={`animation-${animation}`}
          openKey={openKey}
          onClose={close}
          title={`Animation: ${animation}`}
          description="Watch both the entrance and the exit closely."
          animation={animation}
        >
          <p className="text-sm">
            Close with ×, Escape, and backdrop click — exit should play identically every time.
          </p>
        </DemoModal>
      ))}

      {sizes.map((size) => (
        <DemoModal
          key={size}
          id={`size-${size}`}
          openKey={openKey}
          onClose={close}
          title={`Size: ${size}`}
          description={`max-width for the ${size} size token.`}
          size={size}
          footer={
            <>
              <Button variant="ghost" color="neutral" onClick={close}>
                Close
              </Button>
              <Button onClick={close}>Confirm</Button>
            </>
          }
        >
          <p className="text-sm">Body content for the {size} modal.</p>
        </DemoModal>
      ))}

      {radii.map((radius) => (
        <DemoModal
          key={radius}
          id={`radius-${radius}`}
          openKey={openKey}
          onClose={close}
          title={`Radius: ${radius}`}
          radius={radius}
          footer={done}
        >
          <p className="text-sm">Popup corners use radius={radius}.</p>
        </DemoModal>
      ))}

      {backdrops.map((backdrop) => (
        <DemoModal
          key={backdrop}
          id={`backdrop-${backdrop}`}
          openKey={openKey}
          onClose={close}
          title={`Backdrop: ${backdrop}`}
          description="Click outside to dismiss (opaque/blur should be easy to see)."
          backdrop={backdrop}
          footer={done}
        >
          <p className="text-sm">Scrim style is {backdrop}.</p>
        </DemoModal>
      ))}

      {placements.map((placement) => (
        <DemoModal
          key={placement}
          id={`placement-${placement}`}
          openKey={openKey}
          onClose={close}
          title={`Placement: ${placement}`}
          description={
            placement === 'auto'
              ? 'Bottom sheet on mobile, centered on sm+.'
              : `Pinned toward ${placement}.`
          }
          placement={placement}
          footer={done}
        >
          <p className="text-sm">Try a narrow viewport for the auto sheet behavior.</p>
        </DemoModal>
      ))}

      <DemoModal
        id="not-dismissable"
        openKey={openKey}
        onClose={close}
        title="Not dismissable"
        description="Outside click should not close this modal."
        isDismissable={false}
        footer={<Button onClick={close}>Close</Button>}
      >
        <p className="text-sm">Use the close button or the action below.</p>
      </DemoModal>

      <DemoModal
        id="no-keyboard"
        openKey={openKey}
        onClose={close}
        title="Keyboard dismiss disabled"
        description="Escape should not close this modal."
        isKeyboardDismissDisabled
        footer={<Button onClick={close}>Close</Button>}
      >
        <p className="text-sm">Outside click still works; Escape does not.</p>
      </DemoModal>

      <DemoModal
        id="no-close-button"
        openKey={openKey}
        onClose={close}
        title="No close button"
        description="Corner X is hidden — dismiss via outside click or action."
        showCloseButton={false}
        footer={<Button onClick={close}>Close</Button>}
      >
        <p className="text-sm">showCloseButton is false.</p>
      </DemoModal>

      <DemoModal
        id="scroll-inside"
        openKey={openKey}
        onClose={close}
        title="Scroll inside"
        description="Header and footer stay put while the body scrolls."
        scrollBehavior="inside"
        size="lg"
        footer={
          <>
            <Button variant="ghost" color="neutral" onClick={close}>
              Cancel
            </Button>
            <Button onClick={close}>Got it</Button>
          </>
        }
      >
        <div className="flex flex-col gap-3">
          {Array.from({ length: 24 }, (_, i) => (
            <p key={i} className="text-sm text-muted">
              Paragraph {i + 1} — long content to force an internal scroll region.
            </p>
          ))}
        </div>
      </DemoModal>

      <DemoModal
        id="confirm-delete"
        openKey={openKey}
        onClose={close}
        title="Delete account"
        description="This action cannot be undone. Type DELETE to confirm."
        size="sm"
        footer={
          <>
            <Button variant="ghost" color="neutral" onClick={close}>
              Cancel
            </Button>
            <Button color="danger" startContent={<Trash2 />} onClick={close}>
              Delete
            </Button>
          </>
        }
      >
        <Input label="Confirmation" placeholder="DELETE" />
      </DemoModal>
    </DemoPage>
  )
}
