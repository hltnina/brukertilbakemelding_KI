import Footer from '../components/Footer'
import ReportForm from '../components/ReportForm'

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="hero-inner">
          <h1>Velkommen</h1>
          <p>
            Fra tilbakemelding til ferdig GitHub-Issue! Vi analyserer dine filer og
            foreslår konkrete utbedringer.
          </p>
          <button type="button" className="hero-button">
            Start nå
          </button>
        </div>
      </section>

      <section className="report-section">
        <div className="report-intro">
          <h2>Send inn din rapport</h2>
          <p>
            Beskriv problemet eller velg en prompt-mal. Last opp vedlegg og send
            inn for umiddelbare svar. Se gjennom og send deretter direkte til
            Github issues.
          </p>
        </div>

        <ReportForm />

        <Footer />
      </section>
    </>
  )
}

export default Home
