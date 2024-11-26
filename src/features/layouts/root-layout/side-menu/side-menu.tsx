import { FC, createRef, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Transition } from "react-transition-group"
import SimpleBar from "simplebar"

import { cn } from "@shared/utils/cn"

import ChevronIcon from "@assets/icons/chevron.svg"
import CloseIcon from "@assets/icons/close.svg"

import { menuLinks } from "./menu-links"
import { enter, leave, linkTo, nestedMenu } from "./menu.config"
import { FormattedMenu } from "./menu.types"

const Menu: FC<{
  activeMobileMenu: boolean
  setActiveMobileMenu: (value: boolean) => void
  setCompactMenuOnHover: (value: boolean) => void
}> = ({ activeMobileMenu, setActiveMobileMenu, setCompactMenuOnHover }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [formattedMenu, setFormattedMenu] = useState<Array<FormattedMenu | string>>([])
  const sideMenu = () => nestedMenu(menuLinks, location)
  const scrollableRef = createRef<HTMLDivElement>()

  useEffect(() => {
    if (scrollableRef.current) {
      new SimpleBar(scrollableRef.current)
    }

    setFormattedMenu(sideMenu())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <div
      className="absolute inset-y-0 z-10 xl:top-[65px] xl:z-0"
      onMouseOver={event => {
        event.preventDefault()
        setCompactMenuOnHover(true)
      }}
      onMouseLeave={event => {
        event.preventDefault()
        setCompactMenuOnHover(false)
      }}
    >
      <div
        className={cn([
          "relative flex h-full w-[275px] flex-col overflow-hidden rounded-none border-r border-dashed border-slate-300/70 bg-gradient-to-b from-slate-100 to-slate-50 transition-[width,margin] duration-300 xl:ml-0 group-[.side-menu--collapsed.side-menu--on-hover]:xl:w-[275px] group-[.side-menu--collapsed]:xl:w-[91px] group-[.side-menu--collapsed.side-menu--on-hover]:xl:border-solid group-[.side-menu--collapsed.side-menu--on-hover]:xl:shadow-[6px_0_12px_-4px_#0000000f]",
          "after:fixed after:inset-0 after:z-[-1] after:bg-black/80 after:content-[''] after:xl:hidden",
          { "ml-0 after:block": activeMobileMenu },
          { "-ml-[275px] after:hidden": !activeMobileMenu },
        ])}
      >
        <div
          className={cn([
            "fixed ml-[275px] h-10 w-10 items-center justify-center xl:hidden",
            { flex: activeMobileMenu },
            { hidden: !activeMobileMenu },
          ])}
        >
          <a
            href=""
            onClick={event => {
              event.preventDefault()
              setActiveMobileMenu(false)
            }}
            className="ml-5 mt-5"
          >
            <span className="text-white *:size-4 *:fill-white">
              <CloseIcon />
            </span>
          </a>
        </div>
        <div
          ref={scrollableRef}
          className={cn([
            "z-20 h-full w-full overflow-y-auto overflow-x-hidden px-5 pb-3 [-webkit-mask-image:-webkit-linear-gradient(top,rgba(0,0,0,0),black_30px)] [&:-webkit-scrollbar]:w-0 [&:-webkit-scrollbar]:bg-transparent",
            "[&_.simplebar-content]:p-0 [&_.simplebar-track.simplebar-vertical]:mr-0.5 [&_.simplebar-track.simplebar-vertical]:w-[10px] [&_.simplebar-track.simplebar-vertical_.simplebar-scrollbar]:before:bg-slate-400/30",
          ])}
        >
          <ul className="scrollable">
            {/* BEGIN: First Child */}
            {formattedMenu.map((menu, menuKey) =>
              typeof menu == "string" ? (
                <li className="side-menu__divider" key={menuKey}>
                  {menu}
                </li>
              ) : (
                <li key={menuKey}>
                  <a
                    href=""
                    className={cn([
                      "side-menu__link",
                      { "side-menu__link--active": menu.active },
                      {
                        "side-menu__link--active-dropdown": menu.activeDropdown,
                      },
                    ])}
                    onClick={(event: React.MouseEvent) => {
                      event.preventDefault()
                      linkTo(menu, navigate)
                      setFormattedMenu([...formattedMenu])
                    }}
                  >
                    <span className="side-menu__link__icon *:size-5">{menu.icon}</span>
                    <div className="side-menu__link__title">{menu.title}</div>
                    {!!menu.subMenu && (
                      <span className="side-menu__link__chevron *:size-5 *:fill-black/70">
                        <ChevronIcon />
                      </span>
                    )}
                  </a>
                  {/* BEGIN: Second Child */}
                  {menu.subMenu && (
                    <Transition
                      in={menu.activeDropdown}
                      onEnter={enter}
                      onExit={leave}
                      timeout={300}
                    >
                      <ul
                        className={cn([
                          "",
                          { block: menu.activeDropdown },
                          { hidden: !menu.activeDropdown },
                        ])}
                      >
                        {menu.subMenu.map((subMenu, subMenuKey) => (
                          <li key={subMenuKey}>
                            <a
                              href=""
                              className={cn([
                                "side-menu__link",
                                {
                                  "side-menu__link--active": subMenu.active,
                                },
                                {
                                  "side-menu__link--active-dropdown": subMenu.activeDropdown,
                                },
                              ])}
                              onClick={(event: React.MouseEvent) => {
                                event.preventDefault()
                                linkTo(subMenu, navigate)
                                setFormattedMenu([...formattedMenu])
                              }}
                            >
                              <span className="side-menu__link__icon *:size-5">{subMenu.icon}</span>
                              <div className="side-menu__link__title">{subMenu.title}</div>
                              {subMenu.subMenu && (
                                <span className="side-menu__link__chevron *:size-5 *:fill-black/70">
                                  <ChevronIcon />
                                </span>
                              )}
                            </a>
                            {/* BEGIN: Third Child */}
                            {subMenu.subMenu && (
                              <Transition
                                in={subMenu.activeDropdown}
                                onEnter={enter}
                                onExit={leave}
                                timeout={300}
                              >
                                <ul
                                  className={cn([
                                    "",
                                    {
                                      block: subMenu.activeDropdown,
                                    },
                                    { hidden: !subMenu.activeDropdown },
                                  ])}
                                >
                                  {subMenu.subMenu.map((lastSubMenu, lastSubMenuKey) => (
                                    <li key={lastSubMenuKey}>
                                      <a
                                        href=""
                                        className={cn([
                                          "side-menu__link",
                                          {
                                            "side-menu__link--active": lastSubMenu.active,
                                          },
                                          {
                                            "side-menu__link--active-dropdown":
                                              lastSubMenu.activeDropdown,
                                          },
                                        ])}
                                        onClick={(event: React.MouseEvent) => {
                                          event.preventDefault()
                                          linkTo(lastSubMenu, navigate)
                                          setFormattedMenu([...formattedMenu])
                                        }}
                                      >
                                        <span className="side-menu__link__icon *:size-5">
                                          {lastSubMenu.icon}
                                        </span>
                                        <div className="side-menu__link__title">
                                          {lastSubMenu.title}
                                        </div>
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </Transition>
                            )}
                            {/* END: Third Child */}
                          </li>
                        ))}
                      </ul>
                    </Transition>
                  )}
                  {/* END: Second Child */}
                </li>
              ),
            )}
            {/* END: First Child */}
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Menu
