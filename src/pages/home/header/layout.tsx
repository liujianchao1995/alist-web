import { IconButton } from "@hope-ui/solid"
import { BsGridFill, BsCardImage } from "solid-icons/bs"
import { FaSolidListUl } from "solid-icons/fa"
import { Switch, Match, For } from "solid-js"
import { layout, setLayout } from "~/store"

const layouts = ["list", "grid", "image"] as const

const switchLaout = () => {
  const layoutIndex = layouts.indexOf(layout())
  if (layoutIndex >= 0) {
    layoutIndex < 2
      ? setLayout(layouts[layoutIndex + 1])
      : setLayout(layouts[0])
  }
}

export const Layout = () => {
  return (
    <IconButton
      aria-label=""
      onclick={() => switchLaout()}
      icon={
        <Switch>
          <Match when={layout() === "list"}>
            <FaSolidListUl />
          </Match>
          <Match when={layout() === "grid"}>
            <BsGridFill />
          </Match>
          <Match when={layout() === "image"}>
            <BsCardImage />
          </Match>
        </Switch>
      }
    />
  )
}
