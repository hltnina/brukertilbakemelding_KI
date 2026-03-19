import { useState } from 'react'
import AnalysisResult from '../components/AnalysisResult'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ReportForm from '../components/ReportForm'
import SubmissionConfirmation from '../components/SubmissionConfirmation'

const createEmptyIssue = (index) => ({
  id: `issue-${index}-${Date.now()}`,
  title: '',
  description: '',
})

function Home() {
  const [view, setView] = useState('form')
  const [issues, setIssues] = useState([createEmptyIssue(1)])
  const [submissionMode, setSubmissionMode] = useState('single')
  const [submittedIssue, setSubmittedIssue] = useState(null)

  const scrollToReportSection = () => {
    const reportSection = document.getElementById('report-section')
    reportSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleFormSubmit = (submittedIssues) => {
    setIssues(submittedIssues)
    setView('analysis')
  }

  const handleSingleSubmission = (issue) => {
    setSubmissionMode('single')
    setSubmittedIssue(issue)
  }

  const handleAllSubmissions = () => {
    setSubmissionMode('all')
    setSubmittedIssue(null)
    setView('confirmation')
  }

  const handleReset = () => {
    setSubmissionMode('single')
    setSubmittedIssue(null)
    setView('form')
  }

  return (
    <>
      <Navbar />

      <section className="home-hero">
        <div className="hero-inner">
          <h1>Velkommen</h1>
          <p>
            Fra tilbakemelding til ferdig GitHub Issue! Vi analyserer dine filer og
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

        {view === 'form' && (
          <ReportForm
            issues={issues}
            setIssues={setIssues}
            onSubmit={handleFormSubmit}
          />
        )}

        {view === 'analysis' && (
          <AnalysisResult
            issues={issues}
            onEdit={() => setView('form')}
            onSubmitSingle={handleSingleSubmission}
            onSubmitAll={handleAllSubmissions}
          />
        )}

        {view === 'confirmation' && (
          <SubmissionConfirmation
            onReset={handleReset}
            submissionMode={submissionMode}
            submittedIssue={submittedIssue}
          />
        )}

        <Footer />
      </section>
    </>
  )
}

export default Home
