import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { LockPersonRounded, MailRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from 'phosphor-react';

import { AuthContext } from '../../utils/contexts/AuthProvider';

const schema = z.object({
  email: z.string().email("Insira um email válido").nonempty("Campo obrigatório"),
  password: z.string().min(6, "Senha mínima de 6 caracteres")
}).required()

export function LoginForm() {
  const { login, loading } = useContext(AuthContext)
  const { 
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema)})

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (formData) => {
    const data = schema.parse(formData)
    login(data)
  }

  return <>
    <form
    className="flex flex-col gap-3 w-[360px] max-w-[100%] p-2"
    onSubmit={handleSubmit(onSubmit)}>
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
      <Button
        type="submit"
        variant="contained"
        disabled={loading || !isValid}
        sx={{mt: 2}}>{loading ? <CircleNotch size={26} className='animate-spin'/> :"Entrar"}</Button>
    </form>
  </>
}