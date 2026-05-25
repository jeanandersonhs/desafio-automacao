
import { useState } from 'react';

import SelectUser from './components/selectUser';
import FilterResult from './components/filterResult';
import { useUserQuery } from './hooks/queries/useUserQuery';
import { usePostQuery } from './hooks/queries/usePostQuery';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data: users = [], isLoading : loadingUsers, isError : erroUser } = useUserQuery();

  const { data: posts = [] } = usePostQuery(selectedUserId);
  

  if (loadingUsers) return <p>Carregando usuários...</p>
  if (erroUser) return <p>Erro ao carregar usuários</p>

  const onSelect =  (e) => {
    const userId = Number(e.target.value);

    setSelectedUserId(userId);
    console.log('Usuário selecionado:', userId);
  };

  return (
    <>
      <div>
        <SelectUser users={users} onSelect={onSelect}/>
        {<FilterResult users={users} idUserSelected={selectedUserId} posts={posts}/>}
      </div>
    </>
  )
}

export default App
