/**
 * ToggleSwitch.jsx - Toggle Switch Component
 */
import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({
  label,
  checked,
  onChange,
  name,
  disabled = false,
  description,
}) => {
  return (
    <div className={`toggle-switch-container ${disabled ? "disabled" : ""}`}>
      <div className="toggle-info">
        <span className="toggle-label">{label}</span>
        {description && (
          <span className="toggle-description">{description}</span>
        )}
      </div>
      <label className="toggle-switch">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span className="toggle-slider"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
