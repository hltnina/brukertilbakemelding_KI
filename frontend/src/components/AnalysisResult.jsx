function AnalysisResult({ onEdit, onSubmit }) {
  return (
    <div className="analysis-shell">
      <h3>Generert analyse</h3>

      <div className="analysis-field">
        <label>Tittel på sak</label>
        <div className="analysis-value-box">Tittel</div>
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
            KI-tjenesten, som ser sammenhengen mellom din beskrivelse og
            innholdet i vedlagte filer, bilder eller videoer.
          </p>
          <p>
            Systemet kategoriserer automatisk tilbakemeldingen etter relevant
            tema og vurderer alvorlighetsgraden i henhold til WCAG-nivaer for
            universell utforming. Basert pa denne dypdykken peker analysen pa de
            viktigste punktene og gir en kort, ryddig forklaring.
          </p>
        </div>
      </div>

      <div className="analysis-field">
        <label>Foreslått utbedring</label>
        <div className="analysis-text-box">
          <p>
            I denne seksjonen genereres spesifikke og tekniske
            utbedringsforslag basert pa de identifiserte problemene i innsendt
            materiale.
          </p>
          <p>
            Systemet omgjor komplekse tilbakemeldinger til konkrete losninger
            som er skreddersydd for din tjeneste, slik at du far en ferdig
            oppskrift pa hvordan feilene kan rettes.
          </p>
        </div>
      </div>

      <div className="analysis-actions">
        <button type="button" className="analysis-edit-button" onClick={onEdit}>
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
    </div>
  )
}

export default AnalysisResult
