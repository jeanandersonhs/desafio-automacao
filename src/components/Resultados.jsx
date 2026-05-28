export default function Resultados({ filteredPosts, PostItem }) {
  return (
    <div className="grid gap-4 rounded-3xl border border-[rgba(79,221,60,0.14)] bg-white/90 p-4 shadow-sm shadow-slate-900/5 overflow-hidden">
      <div className="grid gap-2 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">Resultados</h3>
          <p className="text-sm text-slate-500">
            {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"}
          </p>
        </div>
      </div>

      <div className="grid gap-2 rounded-3xl border border-slate-200 bg-slate-50 p-3">
        <div className="max-h-[min(60vh,calc(100vh-18rem))] overflow-y-auto pr-2">
          <div className="grid gap-4">
            {filteredPosts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
