function SubmissionConfirmation() {
  return (
    <div className="confirmation-shell">
      <h3>Bekreftelse på innsending</h3>

      <div className="confirmation-message-box">
        <p>
          Din innsending er nå sendt inn til Github Issues, og har{' '}
          <strong>saksnummeret #1.</strong>
        </p>

        <p>
          Se saken i Github Issues ved å trykke på{' '}
          <strong>“Se Github Issue #1”</strong>, eller generer en analyse av en
          ny sak ved å trykke på <strong>“Ny sak”</strong>.
        </p>
      </div>

      <div className="confirmation-actions">
        <button type="button" className="confirmation-home-button">
          Ny sak/Hjem
        </button>
        <button type="button" className="confirmation-issue-button">
          Se Github Issue #1
        </button>
      </div>
    </div>
  )
}

export default SubmissionConfirmation
