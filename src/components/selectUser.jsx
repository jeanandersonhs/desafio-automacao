// ideia ter a selação dos usuarios para mostrar os posts relacionados a ele, 
// ou seja, ao selecionar um usuário, mostrar os posts relacionados a ele
import UserList from "./userList"

export default function SelectUser({ users, onSelect }) {
  return (
    <div>
      <select onChange={onSelect}>
        <option value="">Selecione um usuário</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>

      <UserList users={users} />
    </div>
  )
}