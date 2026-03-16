import InputField from './InputField'

function ReportForm() {
  return (
    <div className="report-form-shell">
      <h3>Konfigurasjon</h3>

      <InputField
        label="Tittel på sak*"
        id="report-title"
        placeholder="Tittel på sak..."
      />
    </div>
  )
}

export default ReportForm
