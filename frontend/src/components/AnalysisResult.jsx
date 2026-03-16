function AnalysisResult() {
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
    </div>
  )
}

export default AnalysisResult
