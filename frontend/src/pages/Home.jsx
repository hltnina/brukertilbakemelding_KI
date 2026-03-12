import Footer from '../components/Footer'

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
        <Footer />
      </section>
    </>
  )
}

export default Home
