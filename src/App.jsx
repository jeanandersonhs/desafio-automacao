
import { useState } from 'react';

import SelectUser from './components/selectUser';
import { useUserQuery } from './hooks/queries/useUserQuery';
import { usePostQuery } from './hooks/queries/usePostQuery';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data: users = [], isLoading : loadingUsers, isError : erroUser } = useUserQuery();
  const { data: posts = [] } = usePostQuery(selectedUserId, {
    skip: !selectedUserId,});

  if (loadingUsers) return <p>Carregando usuários...</p>
  if (erroUser) return <p>Erro ao carregar usuários</p>

  const onSelect = (e) => {
    const userId = e.target.value;
    setSelectedUserId(userId);
    console.log('Usuário selecionado:', userId);
  };
  return (
    <>
      <div>
        <SelectUser users={users} onSelect={onSelect}/>
        <filterResult users={users} idUserSelected={selectedUserId} posts={posts}/>
      </div>
    </>
  )
}

export default App
