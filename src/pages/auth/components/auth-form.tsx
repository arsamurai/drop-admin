import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { useSearchParams } from "react-router-dom"

import { LoginSchema, loginSchema, useLoginMutation } from "@services/auth-service"

import { useLocalStorage } from "@shared/hooks"
import { Button } from "@shared/ui/button"
import { Check, Input, Label, PasswordInput } from "@shared/ui/fields"
import { isAxiosError } from "@shared/utils/error-handler"

const AuthForm = () => {
  const [params] = useSearchParams()
  const [rememberMe, setRememberMe] = useLocalStorage("remember-me", false)

  const toggleRememberMe = () => setRememberMe(prev => !prev)

  const loginUser = useLoginMutation({
    searchParams: params,
    saveRefresh: rememberMe,
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit: SubmitHandler<LoginSchema> = async data => {
    try {
      await loginUser.mutateAsync(data)
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 401) {
        setError("root", { message: e.response?.data?.message })
      }
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label>Login*</Label>
        <Input
          {...register("email")}
          placeholder="Enter login"
          className="px-4 py-3.5"
          error={!!errors.email || !!errors.root}
          helpText={errors.email?.message}
        />
      </div>
      <div className="space-y-2">
        <Label>Password*</Label>
        <PasswordInput
          {...register("password")}
          className="px-4 py-3.5"
          error={!!errors.password || !!errors.root}
          helpText={errors.email?.message}
        />
      </div>
      <div className="flex text-xs text-slate-500 sm:text-sm">
        <div className="mr-auto flex items-center">
          <Check.Input
            id="remember-me"
            type="checkbox"
            className="mr-2.5 border"
            onChange={toggleRememberMe}
          />
          <label className="cursor-pointer select-none" htmlFor="remember-me">
            Remember me
          </label>
        </div>
      </div>
      <div className="text-center xl:mt-8 xl:text-left">
        <Button
          type="submit"
          variant="primary"
          rounded
          className="w-full bg-gradient-to-r from-theme-1/70 to-theme-2/70 py-3.5 xl:mr-3"
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </div>
    </form>
  )
}
export default AuthForm
