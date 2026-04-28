function TextAreaField({ label, id, placeholder, value, onChange, error }) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={error ? 'has-error' : ''}
      ></textarea>
      {error ? <p className="input-field-error">{error}</p> : null}
    </div>
  )
}

export default TextAreaField
