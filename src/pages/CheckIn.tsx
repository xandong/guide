import React, { useContext } from "react"
import { LocationContext } from "../utils/contexts/Location";
import { useNavigate } from "react-router-dom";
import beach from "../assets/beach3.gif"

const CheckIn: React.FC = () => {
  document.title = "Check In"

  const { name, setName } = useContext(LocationContext);
  const navigate = useNavigate();

  function handle(e: any) {
    setName(e.target.value)
    console.log(e.target.value)
  }

  function onSubmit(e: any) {
    e.preventDefault();

    if (name !== "") return navigate("/");
  }

  return (
    <React.Fragment>
      <div className={`w-screen h-screen  bg-blue-500 text-white relative`}>
        <img src="/beach3.gif"className="absolute top-0 left-0 z-10 card opacity-25 h-full w-full"/>
        <div className="z-10 w-full h-full flex flex-col gap-4 justify-center items-center">

          <h1 className="font-bold text-5xl p-2 rounded">Bem vindo(a) ao Guide</h1>
          <label className="font-medium text-xl">Selecione seu destino turístico</label>
          <form className="flex flex-col items-center gap-4 z-10"
          onSubmit={onSubmit}>
            <fieldset>
            {/* <h2>Encontre os locais que mais agradam você</h2> */}
              <select name="locales" id="locales" className="rounded p-1 text-black font-medium text-lg"
              onChange={handle}
              >
                <option value="" placeholder="Clique aqui" className="placeholder:text-zinc-500"></option>
                <option value="Canoa Quebrada">Canoa Quebrada</option>
                <option value="Majorlandia">Majorlândia</option>
                <option value="Quixaba">Quixaba</option>
                <option value="Lagoa do Mago">Lagoa do Mato</option>
                <option  value="Retirinho">Retirinho</option>
              </select>
            </fieldset>
            <button 
            type="submit"
            className="w-full py-2 font-medium border border-white hover:bg-white hover:text-blue-500 rounded transition-all z-10">Acessar</button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CheckIn;