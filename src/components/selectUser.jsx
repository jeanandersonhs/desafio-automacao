// ideia ter a selação dos usuarios para mostrar os posts relacionados a ele, 
// ou seja, ao selecionar um usuário, mostrar os posts relacionados a ele


export default function SelectUser({ users, onSelect }) {
  return (
    <select onChange={onSelect}>
      <option value="">Selecione um usuário</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>{user.name}</option>
      ))}
    </select>
  );
}