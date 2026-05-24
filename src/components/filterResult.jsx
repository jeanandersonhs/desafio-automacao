import { User } from "lucide-react";
import { useMemo, useState } from "react";
import { post } from "node_modules/axios/index.cjs";



export default function filterResult({ users, idUserSelected, posts}) {

    const {charactersFilter, setCharactersFilter} = useState("");
    const {minPostsFilter, setMinPostsFilter} = useState("");

    const filteredPosts = useMemo( ()=> {
        if (!posts) return [];
        return posts.filter(post => {
            const user = users.find(user => user.id === post.userId);
            if (!user) return false;
    }), [charactersFilter, minPostsFilter, posts];

   const handleCaracteres = (e) => {
        const value = e.target.value;

  console.log(value);
   }

   const handleMinimoPosts = (e) => {
        const value = e.target.value;
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

        {filteredPost.map(post => (
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