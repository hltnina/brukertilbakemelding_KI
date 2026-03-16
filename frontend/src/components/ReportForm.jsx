import InputField from './InputField'
import TextAreaField from './TextAreaField'

function ReportForm() {
  return (
    <div className="report-form-shell">
      <h3>Konfigurasjon</h3>

      <InputField
        label="Tittel på sak*"
        id="report-title"
        placeholder="Tittel på sak..."
      />

      <TextAreaField
        label="Problembeskrivelse*"
        id="report-description"
        placeholder="Legg inn din beskrivelse..."
      />

      <div className="option-group">
        <p>Eller velg et av følgende alternativ</p>

        <div className="option-buttons">
          <button type="button">Opprett feilmelding</button>
          <button type="button">Foreslå forbedring</button>
          <button type="button">Alvorlighetsgrad</button>
        </div>
      </div>
    </div>
  )
}

export default ReportForm
