import { useEffect, useRef, useState } from "react";

const DateTime = () => {
  const [dateTime, setDateTime] = useState(Date.now());
  const timeoutRef = useRef();

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setDateTime(Date.now())
    }, 1000 * 10); // 10 seconds

    return () => clearTimeout(timeoutRef.current);
  }, []);

  return (
    <p>
      {new Date(dateTime).toLocaleTimeString('pt-BR', {
        hour: 'numeric',
        minute: 'numeric'
      })}
      &middot;
      {new Date(dateTime).toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </p>
  );
}

export default DateTime;