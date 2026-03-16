function InputField({ label, id, type = 'text', placeholder }) {
  return (
    <div className="input-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} placeholder={placeholder} />
    </div>
  )
}

export default InputField
