import { useState } from 'react'

function AnalysisResult({ issues, onEdit, onSubmitSingle, onSubmitAll }) {
  const [submittedIssues, setSubmittedIssues] = useState([])

  const handleSingleSubmit = (issue) => {
    setSubmittedIssues((currentSubmittedIssues) => {
      if (
        currentSubmittedIssues.some(
          (submittedIssue) => submittedIssue.id === issue.id,
        )
      ) {
        return currentSubmittedIssues
      }

      return [...currentSubmittedIssues, issue]
    })

    onSubmitSingle(issue)
  }

  const getOriginalIssueNumber = (issueId) =>
    issues.findIndex((issue) => issue.id === issueId) + 1

  const visibleIssues = issues.filter(
    (issue) =>
      !submittedIssues.some((submittedIssue) => submittedIssue.id === issue.id),
  )

  return (
    <div className="analysis-shell">
      <h3>Generert analyse</h3>

      {visibleIssues.length > 0 ? (
        <div className="analysis-list">
          {visibleIssues.map((issue) => (
            <article key={issue.id} className="analysis-card">
              <div className="analysis-card-header">
                <h4>Problem {getOriginalIssueNumber(issue.id)}</h4>
              </div>

              <div className="analysis-field">
                <label>Tittel på sak</label>
                <div className="analysis-value-box">
                  {issue.title || `Problem ${getOriginalIssueNumber(issue.id)}`}
                </div>
              </div>

              <div className="analysis-field">
                <label>Issue Labels</label>
                <div className="analysis-tags">
                  <div className="analysis-tag">Label</div>
                  <div className="analysis-tag">WCAG-nivå</div>
                </div>
              </div>

              <div className="analysis-field">
                <label>Analyse</label>
                <div className="analysis-text-box">
                  <p>
                    Denne seksjonen presenterer en intelligent analyse generert
                    av KI-tjenesten, som ser sammenhengen mellom beskrivelsen av{' '}
                    <strong>
                      {issue.title ||
                        `problem ${getOriginalIssueNumber(issue.id)}`}
                    </strong>{' '}
                    og innholdet i vedlagte filer, bilder eller videoer.
                  </p>
                  <p>
                    Systemet kategoriserer automatisk tilbakemeldingen etter
                    relevant tema og vurderer alvorlighetsgraden i henhold til
                    WCAG-nivaer for universell utforming.
                  </p>
                </div>
              </div>

              <div className="analysis-field">
                <label>Foreslått utbedring</label>
                <div className="analysis-text-box">
                  <p>
                    I denne seksjonen genereres spesifikke og tekniske
                    utbedringsforslag basert pa de identifiserte problemene i
                    innsendt materiale.
                  </p>
                  <p>
                    Systemet omgjor komplekse tilbakemeldinger til konkrete
                    losninger som er skreddersydd for din tjeneste, slik at du
                    far en ferdig oppskrift pa hvordan feilene kan rettes.
                  </p>
                </div>
              </div>

              <div className="analysis-actions">
                <button
                  type="button"
                  className="analysis-edit-button"
                  onClick={onEdit}
                >
                  Rediger
                </button>
                <button
                  type="button"
                  className="analysis-submit-button"
                  onClick={() => handleSingleSubmit(issue)}
                >
                  Send inn
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="analysis-empty-state">
          Alle problemene er markert som sendt inn. Du kan bruke{' '}
          <strong>Send inn alle</strong> for å gå videre til bekreftelsen.
        </div>
      )}

      {submittedIssues.length > 0 ? (
        <div className="analysis-submitted-list">
          <h4>Sendte problemer</h4>
          {submittedIssues.map((issue) => (
            <div key={issue.id} className="analysis-inline-confirmation">
              <span className="analysis-inline-confirmation-badge">Sendt</span>
              <span>
                Problem {getOriginalIssueNumber(issue.id)}:{' '}
                <strong>{issue.title || 'Uten tittel'}</strong> er markert som
                sendt inn.
              </span>
            </div>
          ))}
        </div>
      ) : null}

      {issues.length > 1 ? (
        <div className="analysis-submit-all">
          <button
            type="button"
            className="analysis-submit-button"
            onClick={onSubmitAll}
          >
            Send inn alle
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default AnalysisResult
