// @ts-ignore
import { hljs } from "./highlight.js"
import SolidMarkdown from "solid-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import reMarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "./markdown.css"
import "./katex.css"
import { Show, onMount } from "solid-js"
import { clsx } from "clsx"

export const Markdown = (props: { children?: string; class?: string }) => {
  onMount(() => {
    hljs.highlightAll()
    window.onMDRender && window.onMDRender()
  })
  return (
    <Show when={!props.children?.includes("小雅")}>
      <SolidMarkdown
        class={clsx("markdown-body", props.class)}
        remarkPlugins={[remarkGfm, reMarkMath]}
        rehypePlugins={[rehypeRaw, rehypeKatex]}
        children={props.children}
      />
    </Show>
  )
}
