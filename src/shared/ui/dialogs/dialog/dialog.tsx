import { FC } from "react"

import { Button } from "@shared/ui/button"

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogWrapper,
} from "./dialog.config"
import { DialogProps } from "./dialog.types"

const Dialog: FC<DialogProps> = ({
  open,
  handleClose,
  title,
  children,
  okOptions,
  cancelOptions,
}) => {
  return (
    <DialogWrapper open={open} onOpenChange={handleClose}>
      <DialogContent
        className="inset-0 flex h-screen w-full items-center justify-center overflow-y-scroll data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        onClick={handleClose}
        aria-describedby={undefined}
      >
        <div className="m-auto h-fit w-full max-w-[1000px] p-4">
          <div
            className="h-fit w-full space-y-6 overflow-hidden rounded-xl bg-white px-4 py-6"
            onClick={e => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <div className="relative z-[1]">{children}</div>
            <DialogFooter>
              {cancelOptions && (
                <Button variant="secondary" {...cancelOptions}>
                  {cancelOptions.children}
                </Button>
              )}
              {okOptions && <Button {...okOptions}>{okOptions.children}</Button>}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </DialogWrapper>
  )
}
export default Dialog
