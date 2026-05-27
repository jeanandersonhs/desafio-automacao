
export default function Metricas({name, metricas }) {
    return (    
    <div className="space-y-2 rounded-lg border border-[rgba(79,221,60,0.14)] bg-white/90 p-4">
      <h3 className="text-lg font-semibold text-stone-900">Métricas</h3> 
       <h4 className="text-lg font-semibold text-emerald-900">
            Métricas de {name || 'usuário selecionado'}
          </h4>
      <p className="text-stone-700">Total de posts: {metricas.totalPosts}</p>
      <p className="text-stone-700">Média de caracteres por post: {metricas.avgChars.toFixed(2)}</p>
      <p className="text-stone-700">Média de comentários por post: {metricas.avgCommentsByPost.toFixed(2)}</p>
      <p className="text-stone-700">Status: {metricas.status}</p>
    </div>
  );

}