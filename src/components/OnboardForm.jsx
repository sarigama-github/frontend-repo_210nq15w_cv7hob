import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function OnboardForm() {
  const [form, setForm] = useState({ name: '', subdomain: '', description: '', logo_url: '', upi_id: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const tenant = await apiPost('/tenants', {
        subdomain: form.subdomain.trim().toLowerCase(),
        name: form.name,
        description: form.description,
        logo_url: form.logo_url,
        payment_details: { upi_id: form.upi_id }
      })
      setResult(tenant)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="onboard" className="py-12">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Create your store</h2>
        <p className="text-gray-600 mt-2">Pick a unique subdomain and basic details. You can manage products right away.</p>
        <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={submit}>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Store name</label>
            <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required />
          </div>
          <div className="md:col-span-1">
            <label className="block text-sm font-medium text-gray-700">Subdomain</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input name="subdomain" value={form.subdomain} onChange={handleChange} placeholder="my-store" className="flex-1 min-w-0 rounded-l-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" required />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">.1minute.shop</span>
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo URL</label>
            <input name="logo_url" value={form.logo_url} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">UPI ID (for manual payments)</label>
            <input name="upi_id" value={form.upi_id} onChange={handleChange} className="mt-1 w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div className="md:col-span-2 flex items-center gap-3">
            <button disabled={loading} className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 disabled:opacity-60">
              {loading ? 'Creating...' : 'Create store'}
            </button>
            {error && <span className="text-sm text-red-600">{error}</span>}
          </div>
        </form>

        {result && (
          <div className="mt-6 rounded-lg border p-4 bg-green-50 text-green-800">
            <p className="font-semibold">Store created!</p>
            <p className="text-sm mt-1">Subdomain: <span className="font-mono">{result.subdomain}</span></p>
            <p className="text-sm">Tenant ID: <span className="font-mono">{result.id}</span></p>
          </div>
        )}
      </div>
    </section>
  )
}
