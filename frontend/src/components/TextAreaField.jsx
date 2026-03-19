function TextAreaField({ label, id, placeholder, value, onChange }) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  )
}

export default TextAreaField
