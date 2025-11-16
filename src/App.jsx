import Hero from './components/Hero'
import OnboardForm from './components/OnboardForm'
import Showcase from './components/Showcase'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <OnboardForm />
      <Showcase />
      <footer className="py-8 text-center text-sm text-gray-500">© 1MinuteShop</footer>
    </div>
  )
}

export default App
