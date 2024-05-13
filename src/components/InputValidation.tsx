import { useEffect, useRef, useState } from "react";

const InputValidation = () => {
  const [fromUrl, setFromUrl] = useState<string>("");
  const divRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const blog = `<h3>Injektion</h3><u>Här kan det finnas jobbiga skript.<u>`;
  const [validationMessage, setValidationMessage] = useState<string>("");
  const validateMessage = async () => {
    setValidationMessage(`Invalid code: ${inputRef.current?.value}`);
  };
  useEffect(() => {
    if (divRef?.current) {
      divRef.current.innerHTML = "This could be XSS, or not ¯\\_(ツ)_/¯";
    }
    const queryParams = new URLSearchParams(window.location.search);
    const xss = queryParams.get("xss");
    setFromUrl(xss ?? "");
  }, []);
  return (
    <div>
      <input name="code" ref={inputRef} placeholder="Enter your code" />
      <button onClick={validateMessage}>Submit</button>
      <div dangerouslySetInnerHTML={{ __html: validationMessage }} />

      <div dangerouslySetInnerHTML={{ __html: blog }} />

      <div ref={divRef}></div>
      <span>From url:</span>
      <div id="fromUrl" dangerouslySetInnerHTML={{ __html: fromUrl }} />
    </div>
  );
};

export default InputValidation;
