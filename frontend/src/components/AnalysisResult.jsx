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
    </div>
  )
}

export default AnalysisResult
