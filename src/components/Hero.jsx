import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-3xl px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            1MinuteShop
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700">
            Spin up a fully featured, multi-tenant storefront in under a minute.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="#onboard" className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-white font-semibold shadow hover:bg-blue-700 transition-colors">
              Create your store
            </a>
            <a href="/test" className="inline-flex items-center justify-center rounded-md border border-gray-300 px-5 py-3 text-gray-700 font-semibold bg-white/80 hover:bg-white transition-colors">
              Check backend
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white via-white/30 to-transparent" />
    </section>
  )
}
