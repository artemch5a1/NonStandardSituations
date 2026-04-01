import "../modeSt.css";

type Props = {
  onLearn: () => void;
  onTest: () => void;
  onBack: () => void;
};

const Choice = ({ onLearn, onTest, onBack }: Props) => {
  return (
    <>
      <div className="overlay"></div>

      <div className="modal">
        <h1>Режим</h1>

        <button className="btn learn" onClick={onLearn}>
          Обучение
        </button>

        <button className="btn test" onClick={onTest}>
          Тестирование
        </button>

        <button className="btn back" onClick={onBack}>
          ← Назад
        </button>
      </div>
    </>
  );
};

export default Choice;