import { User } from "lucide-react";
import { useMemo, useState } from "react";
import { post } from "node_modules/axios/index.cjs";



export default function filterResult({ users, idUserSelected, posts}) {

    const {charactersFilter, setCharactersFilter} = useState(null);
    const {minPostsFilter, setMinPostsFilter} = useState(null); //definir se é ativo ou inativo
    
    
    //filtra os posts com base na quantidade de caracteres do post
    const filteredPosts = useMemo(() => {
        if (!posts) return [];

        return posts.filter(post => {

            const user = users.find(user => user.id === post.userId);
            if (!user) return false;

            // Filter by minimum characters in post body
            if (charactersFilter && post.body.length < Number(charactersFilter)) return false;
            // Filter by minimum posts per user
            if (minPostsFilter) {
                const userPostsCount = posts.filter(p => p.userId === user.id).length;
                if (userPostsCount < Number(minPostsFilter)) return false;
            }
            return true;
        });
    }, [charactersFilter, minPostsFilter, posts, users]);


    const metricas = (userMetrics) => {
        const totalPosts = posts.length;
        const nameUser = users.find(user => user.id === userMetrics.id)?.name;
        const avgChars = posts.reduce((acc, post) => acc + post.body.length, 0) / totalPosts;
        const avgComments = posts.reduce((acc, post) => acc + post.comments.length, 0) / totalPosts;
        const status = posts.length >= minPostsFilter ? 'Ativo' : 'Inativo';

        return {
            name: nameUser,
            totalPosts,
            avgChars,
            avgComments,
            status
        }
        
    }

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
            onChange={(e) => handleCaracteres(e)}
            />

        <label className="text-sm font-semibold">Minimo de posts para ser ativo</label>
        <input
            type="number"
            onChange={(e) => handleMinimoPosts(e)}
            />

        
        <section className="flex flex-col gap-2">

        <h3>Resultados</h3>

        {filteredPosts.map(post => (
            <div key={post.id} className="border rounded-lg p-4">
                <h4 className="font-semibold">{post.title}</h4>
                <p>{post.body}</p>
            </div>
         )


        )}

        </section>

        </>

    )


}