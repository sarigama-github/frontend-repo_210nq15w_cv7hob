import { useEffect, useState } from 'react'
import { apiGet } from '../lib/api'

export default function Showcase() {
  const [tenantId, setTenantId] = useState('')
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  const loadProducts = async () => {
    setError('')
    try {
      if (!tenantId) return
      const list = await apiGet(`/products?tenant_id=${encodeURIComponent(tenantId)}&only_active=true`)
      setProducts(list)
    } catch (e) {
      setError(e.message)
    }
  }

  useEffect(() => {
    if (tenantId) loadProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantId])

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Try a tenant</h2>
            <p className="text-gray-600 mt-1">Enter a tenant id or subdomain to preview their products.</p>
          </div>
          <div className="flex items-center gap-2">
            <input placeholder="tenant id or subdomain" value={tenantId} onChange={(e) => setTenantId(e.target.value)} className="rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
            <button onClick={loadProducts} className="rounded-md bg-gray-900 text-white px-4 py-2 font-semibold">Load</button>
          </div>
        </div>

        {error && <p className="mt-4 text-red-600">{error}</p>}

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div key={p.id} className="rounded-lg border bg-white overflow-hidden">
              {p.image_urls?.[0] ? (
                <img src={p.image_urls[0]} alt={p.name} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{p.name}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold">${p.price}</span>
                  <span className="text-xs text-gray-500">Stock: {p.inventory}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
