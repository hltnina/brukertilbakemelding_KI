function AnalysisResult({ issues, onEdit, onSubmit }) {
  return (
    <div className="analysis-shell">
      <h3>Generert analyse</h3>

      <div className="analysis-list">
        {issues.map((issue, index) => (
          <article key={issue.id} className="analysis-card">
            <div className="analysis-card-header">
              <h4>Problem {index + 1}</h4>
            </div>

            <div className="analysis-field">
              <label>Tittel på sak</label>
              <div className="analysis-value-box">
                {issue.title || `Problem ${index + 1}`}
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
                  Denne seksjonen presenterer en intelligent analyse generert av
                  KI-tjenesten, som ser sammenhengen mellom beskrivelsen av{' '}
                  <strong>{issue.title || `problem ${index + 1}`}</strong> og
                  innholdet i vedlagte filer, bilder eller videoer.
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
                  losninger som er skreddersydd for din tjeneste, slik at du far
                  en ferdig oppskrift pa hvordan feilene kan rettes.
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
                onClick={onSubmit}
              >
                Send inn
              </button>
            </div>
          </article>
        ))}
      </div>

      {issues.length > 1 ? (
        <div className="analysis-submit-all">
          <button
            type="button"
            className="analysis-submit-button"
            onClick={onSubmit}
          >
            Send inn alle
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default AnalysisResult
