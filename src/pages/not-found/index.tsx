import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

const NotFoundPage = () => {
  return (
    <div className="relative">
      <div className="relative h-screen w-full bg-gradient-to-b from-theme-1/95 to-theme-2/95">
        <div
          className={cn([
            "relative h-full w-full overflow-hidden",
            "before:absolute before:inset-0 before:-mt-[50rem] before:bg-texture-white before:content-['']",
            "after:absolute after:inset-0 after:-mt-[50rem] after:bg-texture-white after:content-['']",
          ])}
        ></div>
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 p-2 text-center">
        <Typography as="h1" variant="pageTitle" className="leading-8 text-white">
          Упс... Сторінку не знайдено 😕
        </Typography>
      </div>
    </div>
  )
}
export default NotFoundPage
