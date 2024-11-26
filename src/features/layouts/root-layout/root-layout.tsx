import { useState } from "react"
import { Outlet } from "react-router-dom"

import { logout } from "@services/user-service"

import { ROUTES } from "@shared/constants"
import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

import HomeIcon from "@assets/icons/home.svg"
import ZoomIcon from "@assets/icons/zoom.svg"

import { SideMenu } from "./side-menu"

const RootLayout = () => {
  const [compactMenuOnHover, setCompactMenuOnHover] = useState(false)
  const [activeMobileMenu, setActiveMobileMenu] = useState(false)

  const requestFullscreen = () => {
    const el = document.documentElement
    if (el.requestFullscreen) {
      el.requestFullscreen()
    }
  }

  return (
    <>
      <div
        className={cn([
          "before:fixed before:top-0 before:h-screen before:w-full before:bg-gradient-to-b before:from-slate-100 before:to-slate-50 before:content-['']",
        ])}
      >
        <div
          className={cn([
            "side-menu side-menu--collapsed group fixed left-0 top-0 z-50 h-screen",
            { "side-menu--on-hover": compactMenuOnHover },
          ])}
        >
          <div className="box fixed inset-x-0 top-0 z-10 flex h-[65px] rounded-none border-x-0 border-t-0 border-transparent bg-gradient-to-r from-theme-1 to-theme-2 shadow-lg">
            <div
              className={cn([
                "relative z-10 hidden h-full flex-none items-center overflow-hidden bg-white px-5 duration-300 xl:flex xl:w-[275px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000001f]",
                "before:absolute before:right-0 before:hidden before:h-4/6 before:border-r before:border-dashed before:border-white/[0.15] before:content-[''] before:xl:block before:group-[.side-menu--collapsed.side-menu--on-hover]:xl:hidden",
                "hidden after:absolute after:left-[-1.25rem] after:z-[-1] after:h-full after:w-screen after:bg-gradient-to-r after:from-theme-1 after:to-theme-2 after:bg-[length:100vw_65px] after:bg-[1.25rem_top] after:content-['']",
              ])}
              onMouseOver={event => {
                event.preventDefault()
                setCompactMenuOnHover(true)
              }}
              onMouseLeave={event => {
                event.preventDefault()
                setCompactMenuOnHover(false)
              }}
            >
              <a
                href={ROUTES.ROOT.path}
                className="flex items-center transition-[margin] group-[.side-menu--collapsed.side-menu--on-hover]:xl:ml-0 group-[.side-menu--collapsed]:xl:ml-2"
              >
                <div className="flex h-[34px] w-[34px] items-center justify-center rounded-lg bg-white/10 transition-transform ease-in-out group-[.side-menu--collapsed.side-menu--on-hover]:xl:-rotate-180">
                  <div className="relative h-[16px] w-[16px] -rotate-45 [&_div]:bg-white">
                    <div className="absolute inset-y-0 left-0 my-auto h-[75%] w-[21%] rounded-full opacity-50"></div>
                    <div className="absolute inset-0 m-auto h-[120%] w-[21%] rounded-full"></div>
                    <div className="absolute inset-y-0 right-0 my-auto h-[75%] w-[21%] rounded-full opacity-50"></div>
                  </div>
                </div>
                <div className="ml-3.5 font-medium text-white transition-opacity group-[.side-menu--collapsed.side-menu--on-hover]:xl:opacity-100 group-[.side-menu--collapsed]:xl:opacity-0">
                  ADMIN
                </div>
              </a>
            </div>
            <div className="absolute inset-x-0 h-full transition-[padding] duration-100 xl:pl-[275px] group-[.side-menu--collapsed]:xl:pl-[91px]">
              <div className="flex h-full w-full items-center px-5">
                <a
                  href=""
                  onClick={event => {
                    event.preventDefault()
                    setActiveMobileMenu(true)
                  }}
                  className="rounded-full p-2 hover:bg-white/5 xl:hidden"
                >
                  <span className="*:size-6 *:fill-white">
                    <HomeIcon />
                  </span>
                </a>
                <Typography as="span" className="px-3 text-white xl:px-0">
                  ProfitSale
                </Typography>
                <div className="ml-auto flex items-center gap-2 text-white">
                  <Typography onClick={logout} className="cursor-pointer px-4 py-2.5">
                    Вихід
                  </Typography>
                  <a
                    href=""
                    className="rounded-full p-2 *:fill-white hover:bg-white/5"
                    onClick={e => {
                      e.preventDefault()
                      requestFullscreen()
                    }}
                  >
                    <ZoomIcon />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <SideMenu
            activeMobileMenu={activeMobileMenu}
            setActiveMobileMenu={setActiveMobileMenu}
            setCompactMenuOnHover={setCompactMenuOnHover}
          />
        </div>
        <div
          className={cn([
            "relative z-10 mt-[65px] px-5 pb-16 pt-[31px] transition-[margin,width] duration-100 xl:ml-[91px]",
          ])}
        >
          <div className="container">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default RootLayout
