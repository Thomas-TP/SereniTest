import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MentalTest from './components/MentalTest'
import Dashboard from './components/Dashboard'
import WellnessCenter from './components/WellnessCenter'
import ProfessionalSearch from './components/ProfessionalSearch'
import ChatBubble from './components/ChatBubble' // Import ChatBubble
import ChatWindow from './components/ChatWindow' // Import ChatWindow

function App() {
  const [showTest, setShowTest] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showWellnessCenter, setShowWellnessCenter] = useState(false)
  const [showProfessionalSearch, setShowProfessionalSearch] = useState(false)
  const [testResults, setTestResults] = useState(null)
  const [isChatOpen, setIsChatOpen] = useState(false) // State for chat window

  const handleTestComplete = (results) => {
    setTestResults(results)
    setShowTest(false)
    setShowDashboard(true)
  }

  const handleGoHome = () => {
    setShowTest(false)
    setShowDashboard(false)
    setShowWellnessCenter(false)
    setShowProfessionalSearch(false)
    setTestResults(null)
  }

  const handleOpenWellnessCenter = () => {
    setShowTest(false)
    setShowDashboard(false)
    setShowWellnessCenter(true)
    setShowProfessionalSearch(false)
  }

  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen);
  }

  return (
    <div className="app dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header 
        onStartTest={() => setShowTest(true)} 
        onGoHome={handleGoHome}
        onOpenWellnessCenter={handleOpenWellnessCenter}
      />
      
      {!showTest && !showDashboard && !showWellnessCenter && !showProfessionalSearch && (
        <>
          <Hero onStartTest={() => setShowTest(true)} />
          <Features />
          <Testimonials />
          <Contact />
          <ProfessionalSearch 
            isFullPage={false}
            onViewFullPage={() => setShowProfessionalSearch(true)}
          />
        </>
      )}

      {showTest && (
        <MentalTest onComplete={handleTestComplete} />
      )}

      {showDashboard && testResults && (
        <Dashboard 
          results={testResults} 
          onClose={() => {
            setShowDashboard(false)
            setTestResults(null)
          }}
          onOpenWellnessCenter={handleOpenWellnessCenter}
        />
      )}

      {showWellnessCenter && (
        <WellnessCenter 
          onClose={() => {
            setShowWellnessCenter(false)
            if (testResults) {
              setShowDashboard(true)
            } else {
              handleGoHome()
            }
          }} 
          directAccess={!testResults}
        />
      )}

      {showProfessionalSearch && (
        <ProfessionalSearch 
          isFullPage={true}
          onClose={() => setShowProfessionalSearch(false)}
        />
      )}

    {/* Chat Components */}
    <ChatBubble onClick={toggleChatWindow} />
    <ChatWindow isOpen={isChatOpen} onClose={toggleChatWindow} />
      <Footer />
    </div>
  )
}

export default App
