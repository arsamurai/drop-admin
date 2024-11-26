import { FC } from "react"

import { Button } from "@shared/ui/button"

import { SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetWrapper } from "./sheet.config"
import { SheetProps } from "./sheet.types"

const Sheet: FC<SheetProps> = ({
  open,
  handleClose,
  title,
  children,
  okOptions,
  cancelOptions,
}) => {
  return (
    <SheetWrapper open={open} onOpenChange={handleClose}>
      <SheetContent
        className="flex items-center justify-center overflow-y-auto"
        onClick={handleClose}
        aria-describedby={undefined}
      >
        <div className="m-auto h-fit space-y-6" onClick={e => e.stopPropagation()}>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          {children}
          <SheetFooter>
            {cancelOptions && (
              <Button variant="secondary" {...cancelOptions}>
                {cancelOptions.children}
              </Button>
            )}
            {okOptions && <Button {...okOptions}>{okOptions.children}</Button>}
          </SheetFooter>
        </div>
      </SheetContent>
    </SheetWrapper>
  )
}
export default Sheet
