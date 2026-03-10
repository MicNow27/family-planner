import "./FormField.scss";
import type { UseFormRegisterReturn } from "react-hook-form";

type FormFieldProps = {
  id: string;
  label: string;
  type: "email" | "password";
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: string | undefined;
};

const FormField = ({
  id,
  label,
  type,
  placeholder,
  register,
  error,
}: FormFieldProps) => (
  <div>
    <label htmlFor={id}>{label}</label>

    <input id={id} type={type} placeholder={placeholder} {...register} />

    {error && <p>{error}</p>}
  </div>
);

export default FormField;
