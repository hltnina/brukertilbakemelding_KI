function TextAreaField({ label, id, placeholder }) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <textarea id={id} placeholder={placeholder}></textarea>
    </div>
  )
}

export default TextAreaField
