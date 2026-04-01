import "../controlSt.css";

type Props = {
  onBack: () => void;
};

const Control = ({ onBack }: Props) => {
  return (
    <div className="container">
      <div className="header">Настройки</div>

      <button className="btn back" onClick={onBack}>
        ← Назад
      </button>

      <div className="grid">
        <div className="section-title">Управление</div>
        <div className="section-help">Помощь</div>

        <div className="cell">Вперед</div>
        <div className="cell key">W</div>

        <div className="cell">Назад</div>
        <div className="cell key">A</div>

        <div className="cell">Влево</div>
        <div className="cell key">S</div>

        <div className="cell">Вправо</div>
        <div className="cell key">D</div>

        <div className="cell">Взаимодействие</div>
        <div className="cell key">E / ПКМ</div>

        <div className="cell">Справка</div>
        <div className="cell key">Q</div>

        <div className="cell">Управление</div>
        <div className="cell key">F1</div>

        <div className="cell">Телефон</div>
        <div className="cell key">F</div>

        <div className="cell">
          Чувствительность мыши
          <input type="range" min="0" max="100" defaultValue="80" />
        </div>
        <div className="cell value">80%</div>
      </div>
    </div>
  );
};

export default Control;