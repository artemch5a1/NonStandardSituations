import "../resultSt.css";

type Props = {
  onBack: () => void;
};

const Results = ({ onBack }: Props) => {
  // пока тестовые данные (потом подключим БД)
  const data = [
    {
      name: "Соколов В.А.",
      session: "Оформление проезда безбилетным физическим лицам",
      time: "13:00",
      score: "13/15",
      doc: "📄",
    },
  ];

  return (
    <div className="container">
      <div className="header">Результаты</div>

      <div className="search">
        <input type="text" placeholder="Поиск..." />
      </div>

      <div className="table-header">
        <div>ФИО ученика</div>
        <div>Название сессии</div>
        <div>Время начала сессии</div>
        <div>Баллы</div>
        <div>Бланки</div>
      </div>

      <div className="table-body">
        {data.map((item, index) => (
          <div className="row" key={index}>
            <div>{item.name}</div>
            <div>{item.session}</div>
            <div>{item.time}</div>
            <div>{item.score}</div>
            <div className="icon">{item.doc}</div>
          </div>
        ))}

        {/* пустые строки для вида */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="row" key={`empty-${i}`}>
            <div>&nbsp;</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ))}
      </div>

      <button onClick={onBack}>Назад</button>
    </div>
  );
};

export default Results;