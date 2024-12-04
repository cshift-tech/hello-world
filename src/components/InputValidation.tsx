import { useEffect, useRef, useState } from "react";

const InputValidation = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const blog = `<h3>Injektion</h3><u>Här kan det finnas jobbiga skript.<u>`;
  const [validationMessage, setValidationMessage] = useState<string>("");
  const validateMessage = async () => {
    setValidationMessage("Invalid code");
  };
  useEffect(() => {
    if (divRef?.current) {
      divRef.current.innerHTML = "This could be XSS, or not ¯\\_(ツ)_/¯";
    }
  }, []);
  return (
    <div>
      <input placeholder="Enter your code" />
      <button onClick={validateMessage}>Submit</button>
      <div>{validationMessage}</div>

      <div dangerouslySetInnerHTML={{ __html: blog }} />

      <div ref={divRef}></div>
    </div>
  );
};

export default InputValidation;
