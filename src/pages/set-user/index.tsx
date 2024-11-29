import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import {
  UserSchema,
  useCreateUserMutation,
  useEditUserMutation,
  useUserQuery,
  userSchema,
} from "@services/users-service"

import { ROUTES } from "@shared/constants"
import { Button } from "@shared/ui/button"
import { Loading } from "@shared/ui/loading"
import { showToast } from "@shared/ui/toastify"
import { Typography } from "@shared/ui/typography"
import { isAxiosError } from "@shared/utils/error-handler"

import SetUserForm from "./components/set-user-form"

const SetUserPage = () => {
  const { id } = useParams()
  const { state, pathname } = useLocation()
  const navigate = useNavigate()
  const createUser = useCreateUserMutation()
  const editUser = useEditUserMutation()
  const { data, isLoading } = useUserQuery(Number(id), state?.user)

  const pageTitle = id ? "Edit user" : " Create user"
  const btnContinueTitle = id ? "Save and continue edit" : "Create and add another"
  const btnTitle = id ? "Save" : "Create"

  const methods = useForm<UserSchema>({
    resolver: zodResolver(userSchema(Number(id))),
  })
  const {
    handleSubmit,
    setError,
    reset,
    formState: { isSubmitting },
  } = methods

  const onSubmit: SubmitHandler<UserSchema> = async data => {
    try {
      if (id) {
        await editUser.mutateAsync({
          ...data,
          id: Number(id),
          password: data.password?.trim() ? data.password : undefined,
        })
        showToast("Користувача відредаговано", { type: "success" })
      } else await createUser.mutateAsync(data)
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        setError("root", { message: e.response?.data?.message })
      }
    } finally {
      if (id) reset()
    }
  }

  const submitWithRedirect = handleSubmit(async data => {
    await onSubmit(data)
    navigate(ROUTES.USERS.path, { replace: true })
  })

  useEffect(() => {
    if (!state?.user) {
      return
    }
    navigate(pathname, {
      replace: true,
      state: {
        ...state,
        user: null,
      },
    })
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (data) {
      reset({
        email: data.email,
        tg_username: data.tg_username,
        fullName: data.fullName,
        phone: data.phone,
        isVerifiedEmail: data.isVerifiedEmail,
        saleChannels: data?.saleChannels.map(option => option.id.toString()),
        weeklySales: data.weeklySales,
      })
    }
  }, [data, reset])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="w-full space-y-6 sm:space-y-10">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Typography as="h1" variant="pageTitle">
          {pageTitle}
        </Typography>
        <div className="flex gap-x-2">
          <Button variant="dark" size="sm" disabled={isSubmitting} onClick={handleSubmit(onSubmit)}>
            {btnContinueTitle}
          </Button>
          <Button variant="primary" size="sm" disabled={isSubmitting} onClick={submitWithRedirect}>
            {btnTitle}
          </Button>
        </div>
      </div>
      <FormProvider {...methods}>
        <SetUserForm />
      </FormProvider>
    </div>
  )
}
export default SetUserPage
