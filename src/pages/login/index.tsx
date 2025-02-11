import {
  Image,
  Center,
  Flex,
  Heading,
  Text,
  Input,
  Button,
  useColorModeValue,
  HStack,
  VStack,
  Checkbox,
  InputGroup,
  InputRightElement,
} from "@hope-ui/solid"
import { createMemo, createSignal, Show } from "solid-js"
import { SwitchColorMode, SwitchLanguageWhite } from "~/components"
import { useFetch, useT, useTitle, useRouter } from "~/hooks"
import {} from "solid-icons/ai"
import {
  changeToken,
  r,
  notify,
  handleRespWithoutNotify,
  base_path,
  hashPwd,
} from "~/utils"
import { Resp } from "~/types"
import LoginBg from "./LoginBg"
import { createStorageSignal } from "@solid-primitives/storage"
import { getSetting } from "~/store"
import { SSOLogin } from "./SSOLogin"
import { FiEye, FiEyeOff } from "solid-icons/fi"

const Login = () => {
  const logos = getSetting("logo").split("\n")
  const logo = useColorModeValue(logos[0], logos.pop())
  const t = useT()
  const title = createMemo(() => {
    return `${getSetting("site_title")}`
  })
  useTitle(title)
  const bgColor = useColorModeValue("white", "$neutral1")
  const [username, setUsername] = createSignal(
    localStorage.getItem("username") || "",
  )
  const [password, setPassword] = createSignal(
    localStorage.getItem("password") || "",
  )
  const [opt, setOpt] = createSignal("")
  const [remember, setRemember] = createStorageSignal("remember-pwd", "false")
  const [loading, data] = useFetch(
    async (): Promise<Resp<{ token: string }>> =>
      r.post("/auth/login/hash", {
        username: username(),
        password: hashPwd(password()),
        otp_code: opt(),
      }),
  )
  const { searchParams, to } = useRouter()
  const Login = async () => {
    if (remember() === "true") {
      localStorage.setItem("username", username())
      localStorage.setItem("password", password())
    } else {
      localStorage.removeItem("username")
      localStorage.removeItem("password")
    }
    const resp = await data()
    handleRespWithoutNotify(
      resp,
      (data) => {
        notify.success(t("login.success"))
        changeToken(data.token)
        to(decodeURIComponent(searchParams.redirect || base_path || "/"), true)
      },
      (msg, code) => {
        if (!needOpt() && code === 402) {
          setNeedOpt(true)
        } else {
          notify.error(msg)
        }
      },
    )
  }
  const [needOpt, setNeedOpt] = createSignal(false)
  const [showPwd, setShowPwd] = createSignal(false)

  return (
    <Center zIndex="1" w="$full" h="100vh">
      <VStack
        bgColor={bgColor()}
        userSelect="none"
        rounded="$xl"
        p="24px"
        w={{
          "@initial": "90%",
          "@sm": "364px",
        }}
        spacing="$4"
      >
        <Flex alignItems="center" justifyContent="space-around">
          <Image mr="$2" boxSize="$12" src={logo()} />
          <Heading color="$info9" fontSize="$2xl">
            {title()}
          </Heading>
        </Flex>
        <Show
          when={!needOpt()}
          fallback={
            <Input
              id="totp"
              name="otp"
              placeholder={t("login.otp-tips")}
              value={opt()}
              onInput={(e) => setOpt(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && Login()}
            />
          }
        >
          <Input
            name="username"
            placeholder={t("login.username-tips")}
            value={username()}
            variant="filled"
            onInput={(e) => setUsername(e.currentTarget.value)}
          />
          <InputGroup>
            <Input
              name="password"
              placeholder={t("login.password-tips")}
              type={showPwd() ? "text" : "password"}
              variant="filled"
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
              onKeyDown={(e) => e.key === "Enter" && Login()}
            />
            <InputRightElement
              cursor="pointer"
              onclick={() => setShowPwd(!showPwd())}
            >
              <Show when={showPwd()} fallback={() => <FiEyeOff />}>
                <FiEye />
              </Show>
            </InputRightElement>
          </InputGroup>
          <Flex
            px="$1"
            w="$full"
            fontSize="$sm"
            color="$neutral10"
            justifyContent="space-between"
            alignItems="center"
          >
            <Checkbox
              checked={remember() === "true"}
              onChange={() =>
                setRemember(remember() === "true" ? "false" : "true")
              }
            >
              {t("login.remember")}
            </Checkbox>
            <Text as="a" target="_blank" href={t("login.forget_url")}>
              {t("login.forget")}
            </Text>
          </Flex>
        </Show>
        <HStack w="$full" spacing="$2">
          <Button
            colorScheme="primary"
            w="$full"
            onClick={() => {
              if (needOpt()) {
                setOpt("")
              } else {
                setUsername("")
                setPassword("")
              }
            }}
          >
            {t("login.clear")}
          </Button>
          <Button w="$full" loading={loading()} onClick={Login}>
            {t("login.login")}
          </Button>
        </HStack>
        <Button
          w="$full"
          colorScheme="accent"
          onClick={() => {
            changeToken()
            to(decodeURIComponent(base_path || "/"), true)
          }}
        >
          {t("login.use_guest")}
        </Button>
        <Flex
          mt="$2"
          justifyContent="space-evenly"
          alignItems="center"
          color="$neutral10"
          w="$full"
        >
          <SwitchLanguageWhite />
          <SwitchColorMode />
          <SSOLogin />
        </Flex>
      </VStack>
      <LoginBg />
    </Center>
  )
}

export default Login
