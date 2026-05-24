
import {useState} from 'react';
import {SelectUser} from './components/selectUser';

function App() {


  const users = [
    { id: 1, name: 'Usuário 1' },
    { id: 2, name: 'Usuário 2' },
    { id: 3, name: 'Usuário 3' },
  ];

  return (
    <>
      <div>
        <SelectUser 
          users={users}
          
          />
      </div>
    </>
  )
}

export default App
