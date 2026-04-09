import { useState, useEffect, useCallback } from "react";
import "../resultSt.css";
import { api, Result } from "../services/api";

type Props = {
  onBack: () => void;
};

const Results = ({ onBack }: Props) => {
  const [results, setResults] = useState<Result[]>([]);
  const [allResults, setAllResults] = useState<Result[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Загружаем все результаты один раз
  useEffect(() => {
    loadAllResults();
  }, []);

  const loadAllResults = async () => {
    setLoading(true);
    try {
      const data = await api.getResults();
      setAllResults(data);
      setResults(data);
    } catch (error) {
      console.error("Error loading results:", error);
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация при изменении search
  const filterResults = useCallback(() => {
    if (!search.trim()) {
      setResults(allResults);
    } else {
      const filtered = allResults.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    }
  }, [search, allResults]);

  // Запускаем фильтрацию при каждом изменении search
  useEffect(() => {
    filterResults();
  }, [filterResults]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="results-container">
      <div className="results-header-wrapper">
        <button className="results-back-arrow" onClick={onBack}>
          ←
        </button>
        <h1 className="results-header">Результаты</h1>
      </div>
      
      <div className="results-search">
        <input
          type="text"
          placeholder="Поиск по ФИО..."
          value={search}
          onChange={handleSearchChange}
          autoFocus
        />
        {search && (
          <button onClick={() => setSearch("")}style={{ marginLeft: 10, padding: 10, background: '#666' }}>
             Очистить
          </button>
        )}
      </div>
      
      <div className="results-table-header">
        <div>ФИО ученика</div>
        <div>Название сессии</div>
        <div>Время начала сессии</div>
        <div>Баллы</div>
        <div>Бланки</div>
      </div>
      
      <div className="results-table-body">
        {loading ? (
          <div className="results-row">
            <div>Загрузка...</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : results.length === 0 ? (
          <div className="results-row">
            <div>Нет данных</div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          results.map((item, index) => (
            <div className="results-row" key={item.id || index}>
              <div>{item.name}</div>
              <div>{item.session}</div>
              <div>{item.time}</div>
              <div>{item.score}</div>
              <div className="results-icon">{item.doc}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Results;