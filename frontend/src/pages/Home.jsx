import { useState } from 'react'
import AnalysisResult from '../components/AnalysisResult'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ReportForm from '../components/ReportForm'

function Home() {
  const [showAnalysis, setShowAnalysis] = useState(false)

  const scrollToReportSection = () => {
    const reportSection = document.getElementById('report-section')
    reportSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Navbar />

      <section className="home-hero">
        <div className="hero-inner">
          <h1>Velkommen</h1>
          <p>
            Fra tilbakemelding til ferdig GitHub-Issue! Vi analyserer dine filer og
            foreslår konkrete utbedringer.
          </p>
          <button
            type="button"
            className="hero-button"
            onClick={scrollToReportSection}
          >
            Start nå
          </button>
        </div>
      </section>

      <section id="report-section" className="report-section">
        <div className="report-intro">
          <h2>Send inn din rapport</h2>
          <p>
            Beskriv problemet eller velg en prompt-mal. Last opp vedlegg og send
            inn for umiddelbare svar. Se gjennom og send deretter direkte til
            Github issues.
          </p>
        </div>

        {showAnalysis ? (
          <AnalysisResult onEdit={() => setShowAnalysis(false)} />
        ) : (
          <ReportForm onSubmit={() => setShowAnalysis(true)} />
        )}

        <Footer />
      </section>
    </>
  )
}

export default Home
