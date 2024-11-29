import { Controller, useFormContext } from "react-hook-form"

import { UserSchema, useRelationsQuery } from "@services/users-service"

import { Button } from "@shared/ui/button"
import { Input, Label, PhoneInput, Select, Switch, TgUsernameInput } from "@shared/ui/fields"
import { generatePassword } from "@shared/utils/generate-password"

const SetUserForm = () => {
  const { data, isLoading } = useRelationsQuery()

  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<UserSchema>()

  const handleGeneratePassword = () => {
    const password = generatePassword()
    setValue("password", password)
  }

  return (
    <form className="w-full max-w-[500px] space-y-5">
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          {...register("email")}
          placeholder="olivia@gmail.com"
          error={!!errors.email || !!errors.root}
          helpText={errors.email?.message || errors.root?.message}
        />
      </div>
      <div className="space-y-2">
        <Label>Телеграм username</Label>
        <Controller
          name="tg_username"
          control={control}
          render={({ field }) => (
            <TgUsernameInput
              {...field}
              error={!!errors.tg_username || !!errors.root}
              helpText={errors.tg_username?.message || errors.root?.message}
            />
          )}
        />
      </div>
      <div className="space-y-2">
        <Label>Iм`я</Label>
        <Input
          {...register("fullName")}
          placeholder="Олівія"
          error={!!errors.fullName || !!errors.root}
        />
      </div>
      <div className="space-y-2">
        <Label>Телефон</Label>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <PhoneInput {...field} error={!!errors?.phone} />}
        />
      </div>
      <Controller
        name="isVerifiedEmail"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Switch>
            <Switch.Input
              id="is-verified-user"
              type="checkbox"
              checked={value ?? false}
              onChange={onChange}
            />
            <Switch.Label htmlFor="is-verified-user" className="ml-3">
              Користувач веріфікований
            </Switch.Label>
          </Switch>
        )}
      />
      <div className="space-y-2">
        <Label>Телефон</Label>
        <Controller
          name="saleChannels"
          control={control}
          render={({ field: { name, value, onChange } }) => (
            <Select
              name={name}
              placeholder="OLX, Facebook, інше"
              isLoading={isLoading}
              options={data?.saleChannels}
              value={data?.saleChannels?.filter(c => value?.includes(c.value)) ?? []}
              onChange={options => onChange(options?.map(option => option.value))}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              isMulti
              error={!!errors.saleChannels || !!errors.root}
            />
          )}
        />
      </div>
      <Controller
        name="weeklySales"
        control={control}
        render={({ field: { name, value, onChange } }) => (
          <Select
            name={name}
            placeholder="Виберіть з переліку"
            isLoading={isLoading}
            options={data?.weeklySales}
            value={data?.weeklySales.find(c => c.value === value)}
            onChange={option => onChange(option?.value)}
            error={!!errors.weeklySales || !!errors.root}
            helpText={errors.root?.message}
          />
        )}
      />
      <div className="space-y-2">
        <Label>Пароль</Label>
        <div className="flex items-start gap-x-2">
          <div className="flex-1">
            <Input
              {...register("password")}
              placeholder="********"
              error={!!errors.password || !!errors.root}
              helpText={errors.password?.message}
            />
          </div>
          <Button
            type="button"
            variant="primary"
            size="sm"
            className="mt-1"
            onClick={handleGeneratePassword}
          >
            Згенерувати пароль
          </Button>
        </div>
      </div>
    </form>
  )
}
export default SetUserForm
