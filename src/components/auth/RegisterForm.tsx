import { zodResolver } from "@hookform/resolvers/zod";
import { LockPersonRounded, MailRounded, Person2, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { CircleNotch } from "phosphor-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { api } from "../../utils/services/api";

const schema = z.object({
  name: z.string().min(3, "Mínimo de 3 caracteres"),
  email: z.string().email("Insira um email válido"),
  username: z.string().min(3, "Mínimo de 3 caracteres"),
  password: z.string().min(6, "Mínimo de 6 caracteres"),
  confirmPassword: z.string().min(6, "Mínimo de 6 caracteres"),
}).superRefine(({password, confirmPassword}, ctx) => {
  if(password !== confirmPassword) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "As senhas não coincidem"
    })
  }
})

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const { 
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema)})

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (formData) => {
    const data = schema.parse(formData)

      setLoading(true)
      await api
        .post("user", data)
        .then((s) => {
          toast("Cadastro realizado com sucesso", {type: "success"})
          setTimeout(() => {
            navigate("/login")
          }, 500);
        })
        .catch((err):any => {
          if (err.response.data.message) 
            toast(err.response.data.message, {type: "error"})
          else
            toast("Um erro inesperado aconteceu... Tente novamente mais tarde", {type: "error" })
        })
        .finally(() => setLoading(false))
  }

  return <>
    <form
    className="flex flex-col gap-3 w-[360px] max-w-[100%] p-2"
    onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        id="name"
        type="text"
        placeholder="Digite seu nome"
        variant="outlined"
        {...register("name", { required: true })}
        error={Boolean(errors.name)}
        helperText={
          errors.name ? errors.name.message?.toString() : undefined
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person2 className="text-blue-500" fontSize="medium"/>
            </InputAdornment>
          ),
      }}
      />
      <TextField 
        id="username"
        type="text"
        placeholder="Digite seu username"
        variant="outlined"
        {...register("username", { required: true })}
        error={Boolean(errors.username)}
        helperText={
          errors.username ? errors.username.message?.toString() : undefined
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person2 className="text-blue-500" fontSize="medium"/>
            </InputAdornment>
          ),
      }}
      />
      <TextField 
        id="email"
        type="email"
        placeholder="Digite seu email"
        variant="outlined"
        {...register("email", { required: true })}
        error={Boolean(errors.email)}
        helperText={
          errors.email ? errors.email.message?.toString() : undefined
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailRounded className="text-blue-500" fontSize="medium"/>
            </InputAdornment>
          ),
      }}
      />
      <TextField 
        id="password"
        type={showPassword ? "text" : "password"}
        placeholder="Digite sua senha"
        variant="outlined"
        {...register("password", { required: true })}
        error={Boolean(errors.password)}
        helperText={
          errors.password ? errors.password.message?.toString() : undefined
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockPersonRounded className="text-blue-500" fontSize="medium"/>
            </InputAdornment>
          ), endAdornment: (
            <InputAdornment position="end">
              <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              >
              {showPassword ? <Visibility fontSize='small'/> : <VisibilityOff fontSize='small'/>}
              </IconButton>
            </InputAdornment>
          )
      }}
      />
      <TextField 
        id="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Digite sua senha"
        variant="outlined"
        {...register("confirmPassword", { required: true })}
        error={Boolean(errors.confirmPassword)}
        helperText={
          errors.confirmPassword ? errors.confirmPassword.message?.toString() : undefined
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockPersonRounded className="text-blue-500" fontSize="medium"/>
            </InputAdornment>
          ), endAdornment: (
            <InputAdornment position="end">
              <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowConfirmPassword}
              onMouseDown={handleMouseDownPassword}
              >
              {showConfirmPassword ? <Visibility fontSize='small'/> : <VisibilityOff fontSize='small'/>}
              </IconButton>
            </InputAdornment>
          )
      }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !isValid}
        sx={{mt: 2}}>{loading ? <CircleNotch size={26} className='animate-spin'/> :"Cadastrar"}</Button>
    </form>
  </>
}