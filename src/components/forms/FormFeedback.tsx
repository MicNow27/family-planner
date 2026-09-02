type FormFeedbackProps = {
  text: string;
  type?: "info" | "error";
  condition: boolean;
};

const FormFeedback = ({ text, type = "info", condition }: FormFeedbackProps) => {
  const color = type === "error" ? "text-error" : "text-tertiary-text";

  return (
    <p
      className={`absolute ${color} text-sm transition-opacity duration-1000 ${
        condition ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {text}
    </p>
  );
};

export default FormFeedback;
