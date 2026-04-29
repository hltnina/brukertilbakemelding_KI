import { useState } from 'react'
import AnalysisResult from '../components/AnalysisResult'
import ContactModal from '../components/ContactModal'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ReportForm from '../components/ReportForm'
import SubmissionConfirmation from '../components/SubmissionConfirmation'
import Loader from '../components/Loader'

const createEmptyIssue = (index) => ({
  id: `issue-${index}-${Date.now()}`,
  title: '',
  description: '',
  files: [],
})

function Home() {
  const [view, setView] = useState('form')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [isContactOpen, setIsContactOpen] = useState(false)
  const [issues, setIssues] = useState([createEmptyIssue(1)])
  const [submissionMode, setSubmissionMode] = useState('single')
  const [submittedIssue, setSubmittedIssue] = useState(null)
  const [submittedIssues, setSubmittedIssues] = useState([])
  const [createdGithubIssues, setCreatedGithubIssues] = useState([])

  const scrollToReportSection = () => {
    const reportSection = document.getElementById('report-section')
    reportSection?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleFormSubmit = (submittedIssues) => {
    setLoadingText('Genererer analyse...')
    setIsLoading(true)
    setIssues(submittedIssues)

    setTimeout(() => {
      setView('analysis')
      requestAnimationFrame(() => {
        scrollToReportSection()
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleIssueUpdate = async (issueId, updates) => {
  let updatedIssue = null

  setIssues((currentIssues) =>
    currentIssues.map((issue) => {
      if (issue.id !== issueId) return issue
      updatedIssue = { ...issue, ...updates }
      return updatedIssue
    }),
  )

  if (!updatedIssue) return

  const res = await fetch('/api/gemini-service', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: updatedIssue.title,
      description: updatedIssue.description,
      // files: ... (kun hvis du sender multipart senere)
    }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data?.error || 'Gemini failed')

  setIssues((currentIssues) =>
    currentIssues.map((issue) =>
      issue.id === issueId
        ? {
            ...issue,
            aiResponse: data.message || '',
            wcagLabel: data.wcagLabel || null,
            title: issue.title || data.generatedTitle || issue.title,
          }
        : issue,
    ),
  )
}

  const handleSingleSubmission = (issue) => {
    setSubmissionMode('single')
    setSubmittedIssue(issue)
  }

  const handleAllSubmissions = (allSubmittedIssues) => {
    setLoadingText('Oppretter GitHub issues...')
    setIsLoading(true)

  
    setTimeout(() => {
      setSubmissionMode('all')
      setSubmittedIssue(null)
      setSubmittedIssues(allSubmittedIssues)
      setCreatedGithubIssues(allSubmittedIssues)
      setView('confirmation')
      requestAnimationFrame(() => {
        scrollToReportSection()
      })
      setIsLoading(false)
    }, 1500)
  }

  const handleReset = () => {
    setSubmissionMode('single')
    setSubmittedIssue(null)
    setSubmittedIssues([])
      setCreatedGithubIssues([])
      setIssues([createEmptyIssue(1)])
    setView('form')
    requestAnimationFrame(() => {
      scrollToReportSection()
    })
  }

  return (
    <>
      <Navbar onContactClick={() => setIsContactOpen(true)} />
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
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

       {isLoading ? (
         <Loader text={loadingText} />
      ) : (
        <>
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
                onSaveIssue={handleIssueUpdate}
                onSubmitSingle={handleSingleSubmission}
                onSubmitAll={handleAllSubmissions}
              />
            )}

            {view === 'confirmation' && (
              <SubmissionConfirmation
                onReset={handleReset}
                submissionMode={submissionMode}
                submittedIssue={submittedIssue}
                submittedIssues={submittedIssues}
                createdGithubIssues={createdGithubIssues}
              />
            )}
          </>
        )}

        <Footer />
      </section>
    </>
  )
}

export default Home
