import { InputHTMLAttributes, ReactNode } from "react";

interface CustomCheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label: ReactNode;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  labelStyle?: React.CSSProperties;
}

export default function CustomCheckbox({
  label,
  checked,
  onChange,
  labelStyle,
  style,
  ...props
}: CustomCheckboxProps) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        ...labelStyle,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{
          appearance: "none",
          WebkitAppearance: "none",
          width: "16px",
          height: "16px",
          flexShrink: 0,
          marginTop: "1px",
          borderRadius: "3px",
          border: checked ? "1px solid #5C00DD" : "1.5px solid #BBC4D9",
          backgroundColor: checked ? "#5C00DD" : "white",
          backgroundImage: checked
            ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M3.5 8.2l2.8 2.8 6.2-6.2' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")"
            : "none",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          cursor: "pointer",
          ...style,
        }}
        {...props}
      />
      <span style={{ display: "block" }}>{label}</span>
    </label>
  );
}
