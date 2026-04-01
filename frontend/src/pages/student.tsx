import "../stud.css";

type Props = {
  onStart: () => void;
  onSettings: () => void;
  onHelp: () => void;
  onExit: () => void;
};

const Student = ({ onStart, onSettings, onHelp, onExit }: Props) => {
  return (
    <>
      <div className="overlay"></div>

      <div className="modal">
        <h1>Режим ученика</h1>

        <button className="btn" onClick={onStart}>
          Начать
        </button>

        <button className="btn" onClick={onSettings}>
          Настройки
        </button>

        <button className="btn" onClick={onHelp}>
          Справка
        </button>

        <button className="btn" onClick={onExit}>
          ← Выход
        </button>
      </div>
    </>
  );
};

export default Student;