import {
  Box,
  Button,
  CloseButton,
  IconButton,
  // Alert,
  // AlertDescription,
  // AlertIcon,
  // AlertTitle,
  // CloseButton,
  notificationService,
} from "@hope-ui/solid"
import { JSXElement } from "solid-js"
import { alphaBgColor, firstUpperCase } from "."
import { AiOutlineCloseCircle } from "solid-icons/ai"

const notify = {
  render: (element: JSXElement) => {
    notificationService.show({
      render: (props) => {
        return (
          <Box
            class="notify-render"
            css={{
              backdropFilter: "blur(8px)",
            }}
            bgColor={alphaBgColor()}
            shadow="$md"
            rounded="$lg"
            p="$3"
            pr="$8"
          >
            <IconButton
              aria-label="close"
              variant="ghost"
              pos="absolute"
              right="$2"
              size="xs"
              icon={<AiOutlineCloseCircle />}
              onClick={props.close}
            />
            {element}
          </Box>
        )
      },
    })
  },
  success: (message: string) => {
    notificationService.show({
      status: "success",
      title: firstUpperCase(message),
      // render: (props) => (
      //   <Alert status="success" shadow="$md">
      //     <AlertIcon mr="$2_5" />
      //     <AlertDescription mr="$2_5">{message}</AlertDescription>
      //     <CloseButton size="sm" onClick={props.close} />
      //   </Alert>
      // ),
    })
  },
  error: (message: string) => {
    notificationService.show({
      status: "danger",
      title: firstUpperCase(message),
      // render: (props) => (
      //   <Alert status="danger" shadow="$md">
      //     <AlertIcon mr="$2_5" />
      //     <AlertDescription mr="$2_5">{message}</AlertDescription>
      //     <CloseButton size="sm" onClick={props.close} />
      //   </Alert>
      // ),
    })
  },
  info: (message: string) => {
    notificationService.show({
      status: "info",
      title: firstUpperCase(message),
      // render: (props) => (
      //   <Alert status="info" shadow="$md">
      //     <AlertIcon mr="$2_5" />
      //     <AlertDescription mr="$2_5">{message}</AlertDescription>
      //     <CloseButton size="sm" onClick={props.close} />
      //   </Alert>
      // ),
    })
  },
  warning: (message: string) => {
    notificationService.show({
      status: "warning",
      title: firstUpperCase(message),
      // render: (props) => (
      //   <Alert status="warning" shadow="$md">
      //     <AlertIcon mr="$2_5" />
      //     <AlertDescription mr="$2_5">{message}</AlertDescription>
      //     <CloseButton size="sm" onClick={props.close} />
      //   </Alert>
      // ),
    })
  },
}

export { notify }
