import { useMemo, useState } from "react";
import { useCommentsQuery } from "../hooks/queries/useComentsQuery";



// Sub-componente que busca os comentários do post individualmente
function PostItem({ post }) {
    const { data: comments = [], isLoading } = useCommentsQuery(post.id);
    return (
        <div className="border rounded-lg p-4">
            <h4 className="font-semibold">{post.title}</h4>
            <p>{post.body}</p>
            <p className="mt-2 text-sm text-gray-500">
                Caracteres: {post.body.length} | Comentários: {comments.length}
            </p>
            {isLoading ? (
                <p>Carregando comentários...</p>
            ) : (
                <ul className="list-disc list-inside mt-2">
                    {comments.map(comment => (
                        <li key={comment.id}>
                            <strong>{comment.name}:</strong> {comment.body}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}




export default function FilterResult({ users, idUserSelected, posts }) {

    const [charactersFilter, setCharactersFilter] = useState('');
    const [minPostsFilter, setMinPostsFilter] = useState(''); //definir se é ativo ou inativo

    const selectedUser = useMemo(
        () => users.find(u => u.id === idUserSelected),
        [users, idUserSelected]
    );


    
    //filtra os posts com base na quantidade de caracteres do post
    const filteredPosts = useMemo(() => {
        if (!posts) return [];

        return posts.filter(post => {

            // Filter by minimum characters in post body
            if (charactersFilter && post.body.length < Number(charactersFilter)) return false;
            // Filter by minimum posts per user
            // if (minPostsFilter) {
            //     const userPostsCount = posts.filter(p => p.userId === user.id).length;
            //     if (userPostsCount < Number(minPostsFilter)) return false;
            // }
            return true;
        });
        
    }, [charactersFilter, minPostsFilter, posts]);


    const metricas = useMemo(() => {
        if (!posts.length) return null;
        const avgChars = posts.reduce((acc, p) => acc + p.body.length, 0) / posts.length;
        const isActive = posts.length >= Number(minPostsFilter || 0);
        return {
            totalPosts: posts.length,
            avgChars,
            status: minPostsFilter ? (isActive ? 'Ativo' : 'Inativo') : '—',
        };
    }, [posts, minPostsFilter]);

   const handleCaracteres = (e) => {
        const value = e.target.value;
        setCharactersFilter(value);

  console.log(value);
   }

   const handleMinimoPosts = (e) => {
        const value = e.target.value;
        setMinPostsFilter(value);
        console.log(value);
   }

    return(
        <>
        <label className="text-sm font-semibold text-amber-300">Minimo de caracteres</label>
        <input
            type="number"
            value={charactersFilter}
            onChange={(e) => handleCaracteres(e)}
            />

        <label className="text-sm font-semibold">Minimo de posts para ser ativo</label>
        <input
            type="number"
            value={minPostsFilter}
            onChange={(e) => handleMinimoPosts(e)}
            />

        
        <section className="flex flex-col gap-2">

            {metricas && (
                <div className="border rounded-lg p-4">
                    <h4>Métricas de {selectedUser?.name}</h4>
                    <p>Total de Posts: {metricas.totalPosts}</p>
                    <p>Média de Caracteres por Post: {metricas.avgChars.toFixed(2)}</p>
                    <p>Status: {metricas.status}</p>
                </div>
            )}

            <h3>Resultados ({filteredPosts.length} posts)</h3>
            {filteredPosts.map(post => (
                <PostItem key={post.id} post={post} />
            ))}

        </section>

        </>

    )


}