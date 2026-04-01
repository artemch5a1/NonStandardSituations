import { useState } from "react";
import "../authSt.css";

type Props = {
  onSuccess: () => void;
  onBack: () => void;
};

const Teacher = ({ onSuccess }: Props) => {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // временная проверка пароля
    if (password === "1234") {
      onSuccess();
    } else {
      alert("Неверный пароль");
    }
  };

  return (
    <>
      <div className="overlay"></div>

      <div className="modal">
        <h1>Вход</h1>

        <input
          className="input"
          type="password"
          placeholder="Пароль..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn" onClick={handleLogin}>
          Продолжить
        </button>
      </div>
    </>
  );
};

export default Teacher;