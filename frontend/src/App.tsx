import { useState } from "react";
import "./App.css";
import "./modeSt.css";

import Teacher from "./pages/teacher";
import Student from "./pages/student";
import Results from "./pages/results";
import Control from "./pages/control";
import Choice from "./pages/choice";

function App() {
  const [mode, setMode] = useState<
  "menu" | "choice" | "teacherAuth" | "student" | "results" | "control"
>("menu");

  const renderContent = () => {
    switch (mode) {
      case "menu":
        return (
          <>
            <div className="overlay"></div>

            <div className="modal">
              <h1>Пользователь</h1>

              <button
                className="btn learn"
                onClick={() => setMode("teacherAuth")}
              >
                Учитель
              </button>

              <button
                className="btn test"
                onClick={() => setMode("student")}
              >
                Ученик
              </button>
            </div>
          </>
        );

      case "teacherAuth":
        return (
          <Teacher
            onSuccess={() => setMode("results")}
            onBack={() => setMode("menu")}
          />
        );

      case "student":
        return (
          <Student
            onStart={() => setMode("choice")}
            onSettings={() => setMode("control")}
            onHelp={() => alert("Справка")}
            onExit={() => setMode("menu")}
          />
        );
        case "choice":
  return (
    <Choice
      onLearn={() => alert("Обучение")}
      onTest={() => alert("Тестирование")}
      onBack={() => setMode("student")}
    />
  );

      case "control":
        return <Control onBack={() => setMode("student")} />;
        

      case "results":
        return <Results onBack={() => setMode("menu")} />;

      default:
        return null;
    }
  };

  return <main className="container">{renderContent()}</main>;
}

export default App;