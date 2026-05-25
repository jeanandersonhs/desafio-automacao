import { useState } from 'react';

import SelectUser from './components/selectUser';
import FilterResult from './components/filterResult';
import { useUserQuery } from './hooks/queries/useUserQuery';
import { usePostQuery } from './hooks/queries/usePostQuery';

function App() {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const { data: users = [], isLoading: loadingUsers, isError: erroUser } = useUserQuery();
  const { data: posts = [] } = usePostQuery(selectedUserId);


  if (loadingUsers)
    return (
      <p className="mx-auto mt-24 max-w-xl rounded-4xl border border-[rgba(79,221,60,0.18)] bg-white/90 px-8 py-6 text-center text-stone-700 shadow-[0_24px_64px_rgba(31,58,30,0.12)]">
        Carregando usuários...
      </p>
    );

  if (erroUser)
    return (
      <p className="mx-auto mt-24 max-w-xl rounded-4xl border border-[rgba(221,79,79,0.18)] bg-white/90 px-8 py-6 text-center text-stone-700 shadow-[0_24px_64px_rgba(31,58,30,0.12)]">
        Erro ao carregar usuários
      </p>
    );

  const onSelect = (e) => {
    const userId = Number(e.target.value);
    setSelectedUserId(userId);
    console.log('Usuário selecionado:', userId);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-stone-50 text-stone-900 antialiased">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(30,226,0,0.14),transparent_22%),radial-gradient(circle_at_84%_12%,rgba(199,233,194,0.35),transparent_24%),radial-gradient(circle_at_50%_105%,rgba(116,161,112,0.14),transparent_36%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_26%,rgba(79,221,60,0.18),transparent_26%),radial-gradient(circle_at_72%_78%,rgba(21,17,21,0.08),transparent_20%),repeating-radial-gradient(circle_at_90%_12%,rgba(255,255,255,0.09)_0_1px,transparent_1px_12px)]" />

      <section className="relative z-10 mx-auto flex min-h-screen max-w-[1120px] flex-col px-6 py-16 sm:px-8 lg:px-10">
        <div className="mx-auto w-full rounded-4xl border border-[rgba(53,108,47,0.16)] bg-white/80 p-6 shadow-[0_36px_92px_rgba(31,58,30,0.12)] backdrop-blur-xl sm:p-10 lg:p-12">
          <header className="max-w-4xl">
            <h1 className="mt-8 text-4xl font-semibold leading-[0.98] tracking-tighter text-stone-900 sm:text-5xl">
              Análise de Usuários
            </h1>
          </header>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.95fr]">
            <section className="rounded-[1.75rem] border border-[rgba(79,221,60,0.14)] bg-white/90 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.44),0_18px_40px_rgba(34,58,29,0.08)] sm:p-8">
              <SelectUser users={users} onSelect={onSelect} />
            </section>

            <section className="rounded-[1.75rem] border border-[rgba(79,221,60,0.14)] bg-white/90 p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.44),0_18px_40px_rgba(34,58,29,0.08)] sm:p-8">
              <FilterResult 
              users={users} 
              idUserSelected={selectedUserId} 
              posts={posts} />
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
