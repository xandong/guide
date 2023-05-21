import { CircleNotch } from "phosphor-react"
import { WrapperFull } from "../Layout/WrapperFull"

export const Redirect = () => {
  return (
    <WrapperFull>
      <CircleNotch className="animate-spin" size={36}/>
      <h1 className="text-xl font-semibold">Redirecionando...</h1>
    </WrapperFull>
  )
}