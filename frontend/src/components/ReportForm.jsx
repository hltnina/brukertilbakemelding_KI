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
    </div>
  )
}

export default ReportForm
