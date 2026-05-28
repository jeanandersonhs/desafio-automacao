// ideia ter a selação dos usuarios para mostrar os posts relacionados a ele, 
// ou seja, ao selecionar um usuário, mostrar os posts relacionados a ele
import UserList from "./userList"

export default function SelectUser({ users, onSelect }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-3">
        <label htmlFor="user-select" className="text-sm font-semibold text-stone-700">
          Selecione um usuário
        </label>
        <select
          id="user-select"
          className="min-h-[3.35rem] w-full rounded-2xl border border-[rgba(79,221,60,0.18)] bg-white/90 px-4 text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition duration-200 focus:border-emerald-700 focus:ring-4 focus:ring-[rgba(79,221,60,0.14)]"
          onChange={onSelect}
        >
          <option value="">Selecione um usuário</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-[1.6rem] border border-[rgba(79,221,60,0.14)] bg-white/90 shadow-[0_24px_56px_rgba(31,60,29,0.08)]">
        <UserList users={users} />
      </div>
    </div>
  );
}