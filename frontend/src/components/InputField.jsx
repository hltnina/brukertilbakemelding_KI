function InputField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        className={error ? 'has-error' : ''}
      />
      {error ? <p className="input-field-error">{error}</p> : null}
    </div>
  )
}

export default InputField
