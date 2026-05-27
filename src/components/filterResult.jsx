import { useMemo, useState } from "react";
import { useCommentsQuery, usePostsWithComments } from "../hooks/queries/useComentsQuery";
import { Button } from "./ui/button";
import RelatorioService from "../services/relatorioService";
import Metricas from "./Metricas";
import Resultados from "./Resultados";

// Sub-componente que busca os comentários do post individualmente
function PostItem({ post }) {
  const { data: comments = [] } = useCommentsQuery(post.id);

  return (
    <article className="rounded-[1.6rem] border border-[rgba(79,221,60,0.14)] bg-white/90 p-6 shadow-[0_24px_56px_rgba(31,60,29,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:border-[rgba(79,221,60,0.26)]">
      <h4 className="text-sm font-semibold text-stone-900">{post.title}</h4>
      <p className="mt-1 text-stone-700">{post.body}</p>
      <p className="mt-2 text-sm text-stone-500">
        Caracteres: {post.body.length} | Comentários: {comments.length}
      </p>
    </article>
  );
}

export default function FilterResult({ users, idUserSelected, posts }) {
  const [charactersFilter, setCharactersFilter] = useState('');
  const [minPostsFilter, setMinPostsFilter] = useState('');
  const { data: postsWithComments = []} = usePostsWithComments(posts);


  const selectedUser = useMemo(
    () => users.find((u) => u.id === idUserSelected),
    [users, idUserSelected]
  );

  const filteredPosts = useMemo(() => {
    if (!posts) return [];

    return posts.filter((post) => {
      if (charactersFilter && post.body.length < Number(charactersFilter)) return false;
      return true;
    });
  }, [charactersFilter, posts]);

  const filteredPostsWithComments = useMemo(() => {
    if (!postsWithComments.length || !filteredPosts.length) return [];

    const filteredPostIds = new Set(filteredPosts.map((post) => post.id));
    return postsWithComments.filter((post) => filteredPostIds.has(post.id));
  }, [filteredPosts, postsWithComments]);

  const metricas = useMemo(() => {
    if (!filteredPosts.length) return null;
    const avgCommentsByPost = filteredPostsWithComments.reduce((acc, p) => acc + (p.comments?.length || 0), 0) / filteredPostsWithComments.length || 0;
    const avgChars = filteredPosts.reduce((acc, p) => acc + p.body.length, 0) / filteredPosts.length || 1;
    const isActive = filteredPosts.length >= Number(minPostsFilter || 0);
    return {
      totalPosts: filteredPosts.length,
      avgChars,
      avgCommentsByPost,
      status: minPostsFilter ? (isActive ? 'Ativo' : 'Inativo') : 'Ativo',
    };
  }, [minPostsFilter, filteredPosts, filteredPostsWithComments]);

  const handleCaracteres = (e) => {
    setCharactersFilter(e.target.value);
  };

  const handleMinimoPosts = (e) => {
    setMinPostsFilter(e.target.value);
  };

  const handleRelatorio = (metricas) => {
    return RelatorioService.gerarRelatorio(metricas)  ;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-3">
          <label htmlFor="characters-filter" className="text-sm font-semibold text-stone-700">
            Mínimo de caracteres
          </label>
          <input
            id="characters-filter"
            className="min-h-[3.35rem] w-full rounded-2xl border border-[rgba(79,221,60,0.18)] bg-white/90 px-4 text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition duration-200 focus:border-emerald-700 focus:ring-4 focus:ring-[rgba(79,221,60,0.14)]"
            type="number"
            value={charactersFilter}
            onChange={handleCaracteres}
            placeholder="Ex: 80"
          />
        </div>

        <div className="grid gap-3">
          <label htmlFor="min-posts-filter" className="text-sm font-semibold text-stone-700">
            Mínimo de posts para ser ativo
          </label>
          <input
            id="min-posts-filter"
            className="min-h-[3.35rem] w-full rounded-2xl border border-[rgba(79,221,60,0.18)] bg-white/90 px-4 text-stone-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] outline-none transition duration-200 focus:border-emerald-700 focus:ring-4 focus:ring-[rgba(79,221,60,0.14)]"
            type="number"
            value={minPostsFilter}
            onChange={handleMinimoPosts}
            placeholder="Ex: 5"
          />
        </div>
      </div>

      {metricas && (

        
        <div className="rounded-[1.6rem] border border-[rgba(79,221,60,0.14)] bg-white/90 p-6 shadow-[0_24px_56px_rgba(31,60,29,0.08)]">
          <Metricas name={selectedUser?.name} metricas={metricas} />
          <Button 
            className="mt-4" 
            onClick={handleRelatorio}>
              Gerar Relatório
          
          </Button>
        </div>
      )}

      {/* <h3 className="text-xl font-semibold text-stone-900">
        Resultados ({filteredPosts.length} posts)
      </h3>
      <div className="grid gap-4">
        {filteredPosts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div> */}

      {filteredPosts.length > 0 && (
        <Resultados 
          filteredPosts={filteredPosts} 
          PostItem={PostItem} />
      )}
    </div>
  );
}
