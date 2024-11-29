import { NavigateFunction } from "react-router-dom"

import { slideDown, slideUp } from "@shared/utils/helpers"

import { FormattedMenu, Menu, MenuLocation } from "./menu.types"

// Setup side menu
const findActiveMenu = (subMenu: Menu[], location: MenuLocation): boolean => {
  let match = false
  subMenu.forEach(item => {
    if (
      (location.forceActiveMenu !== undefined && item.pathname === location.forceActiveMenu) ||
      (location.forceActiveMenu === undefined &&
        (location.pathname + location.search).includes(item.pathname ?? ""))
    ) {
      match = true
    } else if (!match && item.subMenu) {
      match = findActiveMenu(item.subMenu, location)
    }
  })
  return match
}

const nestedMenu = (menu: Array<Menu | string>, location: MenuLocation) => {
  const formattedMenu: Array<FormattedMenu | string> = []
  menu.forEach(item => {
    if (typeof item !== "string") {
      const menuItem: FormattedMenu = {
        icon: item.icon,
        title: item.title,
        pathname: item.pathname,
        subMenu: item.subMenu,
      }
      menuItem.active =
        (location.forceActiveMenu !== undefined &&
          location.forceActiveMenu.includes(menuItem.pathname ?? "")) ||
        (location.forceActiveMenu === undefined &&
          (location.pathname + location.search).includes(menuItem.pathname ?? "")) ||
        (menuItem.subMenu && findActiveMenu(menuItem.subMenu, location))

      if (menuItem.subMenu) {
        menuItem.activeDropdown = findActiveMenu(menuItem.subMenu, location)

        // Nested menu
        const subMenu: Array<FormattedMenu> = []
        nestedMenu(menuItem.subMenu, location).map(
          menu => typeof menu !== "string" && subMenu.push(menu),
        )
        menuItem.subMenu = subMenu
      }

      formattedMenu.push(menuItem)
    } else {
      formattedMenu.push(item)
    }
  })

  return formattedMenu
}

const linkTo = (menu: FormattedMenu, navigate: NavigateFunction) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown
  } else {
    if (menu.pathname !== undefined) {
      navigate(menu.pathname)
    }
  }
}

const enter = (el: HTMLElement) => {
  slideDown(el, 300)
}

const leave = (el: HTMLElement) => {
  slideUp(el, 300)
}

export { nestedMenu, linkTo, enter, leave }
