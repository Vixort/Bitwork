/**
 * InputField.jsx - Reusable Input Field Component
 */
import React from "react";
import "./InputField.css";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  error,
  helperText,
  required = false,
}) => {
  return (
    <div className="input-field">
      {label && (
        <label className="input-label" htmlFor={name}>
          {label}
          {required && <span className="required-star">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`input-control ${error ? "input-error" : ""} ${
          disabled ? "input-disabled" : ""
        }`}
      />
      {error && <span className="error-text">{error}</span>}
      {helperText && !error && (
        <span className="helper-text">{helperText}</span>
      )}
    </div>
  );
};

export default InputField;
