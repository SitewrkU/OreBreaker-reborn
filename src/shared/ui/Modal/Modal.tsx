import * as Dialog from '@radix-ui/react-dialog'
import type { ReactNode } from 'react'
import './Modal.css'
import clsx from 'clsx'
import { X } from 'lucide-react'

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  description?: string
  className?: string
  children: ReactNode
}

export function Modal({ 
    open, 
    onClose, 
    title, 
    description, 
    className, 
    children, 
  }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />

        <Dialog.Content 
          className={clsx('modal-content', className)}
          aria-describedby={description ? undefined : undefined}
        >
          <Dialog.Title className="modal-title">
            {title}
          </Dialog.Title>

          {description && (
            <Dialog.Description className="modal-description">
              {description}
            </Dialog.Description>
          )}

          {children}

          <Dialog.Close asChild>
            <button className="modal-close"><X/></button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}