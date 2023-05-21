import { CircleNotch } from "phosphor-react"
import { WrapperFull } from "../Layout/WrapperFull"

export const Loading = () => {
  return (
    <WrapperFull>
      <CircleNotch className="animate-spin" size={36}/>
      <h1 className="text-xl font-semibold">Carregando...</h1>
    </WrapperFull>
  )
}