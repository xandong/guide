import { useContext } from "react";
import PageWrapper from "../components/Layout"
import { AuthContext } from "../utils/contexts/AuthProvider";
import { Person, UserCircle } from "phosphor-react";

function Li({title, field}:{title: string, field: string}) {
  return <>
    <li className="flex gap-2 justify-start items-baseline">
      <span className="font-semibold text-blue-500">{title}:</span>
      <span className="text-zinc-500">{field}</span>
    </li>
  </>
}

const Profile = () => {
  const { user } = useContext(AuthContext)
  console.log(user.photoUrl)
  return <>
    <PageWrapper searchBar={false}>
      <h1 className="text-3xl font-bold text-blue-500 mt-10">Perfil</h1>

      <div className="flex flex-col items-center gap-4 mt-6">
        {
          user.photoUrl ? (
            <img loading="lazy" src={user.photoUrl} alt="avatar" className="aspect-square w-40 h-40 rounded-full border-zinc-300 border-2"/>
          ) : (
            <UserCircle size={160} weight="fill" className="text-blue-500" />
          )
        }
        

        <ul>
        <Li title="Nome" field={user.name}/>
        <Li title="Email" field={user.email}/>
        </ul>
      </div>
    </PageWrapper>
  </>
}

export default Profile;