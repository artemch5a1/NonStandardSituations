import { useState } from "react";
import "./App.css";

import Teacher from "./pages/teacher";
import Student from "./pages/student";
import Results from "./pages/results";
import Control from "./pages/control";
import Choice from "./pages/choice";
import StudentAuth from "./pages/studentAuth";
import Learn from "./pages/learn";
import ManageTasks from "./pages/manageTasks";
import { api } from "./services/api";

function App() {
  const [mode, setMode] = useState<
    | "menu"
    | "choice"
    | "studentAuth"
    | "teacherAuth"
    | "student"
    | "results"
    | "control"
    | "learn"
    | "manageTasks"
    | "test"
  >("menu");

  // Данные ученика
  const [traineeName, setTraineeName] = useState("");
  const [sessionTitle, setSessionTitle] = useState("");
  const [traineeId, setTraineeId] = useState<number | null>(null);

  const renderContent = () => {
    switch (mode) {
      case "menu":
        return (
          <>
            <div className="app-overlay"></div>
            <div className="app-modal">
              <h1 className="app-title">Пользователь</h1>
              <button
                className="app-btn app-btn-teacher"
                onClick={() => setMode("teacherAuth")}
              >
                Учитель
              </button>
              <button
                className="app-btn app-btn-student"
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
            onLearn={() => setMode("learn")}
            onTest={() => setMode("studentAuth")}
            onBack={() => setMode("student")}
          />
        );

      case "learn":
        return <Learn onBack={() => setMode("choice")} />;

      case "studentAuth":
        return (
          <StudentAuth
            onContinue={async (name, session) => {
              setTraineeName(name);
              setSessionTitle(session);
              
              try {
                const result = await api.saveTrainee(name, session);
                setTraineeId(result.data?.id || null);
                console.log("Ученик сохранен:", result);
                alert(`Добро пожаловать, ${name}!`);
                setMode("test");
              } catch (error) {
                console.error("Ошибка:", error);
                alert("Ошибка при сохранении");
                setMode("student");
              }
            }}
            onBack={() => setMode("choice")}
          />
        );

      case "test":
        return (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '20px',
            boxSizing: 'border-box',
            overflowY: 'auto'
          }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '15px', 
              padding: '30px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              <h2>Тестирование</h2>
              <p><strong>Ученик:</strong> {traineeName}</p>
              <p><strong>Сессия:</strong> {sessionTitle}</p>
              <p>Здесь будет ваш тест...</p>
              <button 
                onClick={async () => {
                  const score = "10/10";
                  const time = new Date().toLocaleTimeString();
                  
                  try {
                    await api.saveResult({
                      trainee_name: traineeName,
                      session_title: sessionTitle,
                      score: score,
                      time: time
                    });
                    alert(`Тест завершен! Результат: ${score}`);
                  } catch (error) {
                    console.error("Ошибка сохранения:", error);
                  }
                  setMode("student");
                }}
                style={{
                  padding: '10px 20px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '20px'
                }}
              >
                Завершить тест
              </button>
              <button 
                onClick={() => setMode("studentAuth")}
                style={{
                  padding: '10px 20px',
                  background: '#555',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  marginTop: '20px',
                  marginLeft: '10px'
                }}
              >
                ← Назад
              </button>
            </div>
          </div>
        );

      case "control":
        return <Control onBack={() => setMode("student")} />;

      case "results":
        return (
          <div>
            <Results onBack={() => setMode("menu")} />
            <div style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              display: 'flex',
              gap: '10px',
              zIndex: 1000
            }}>
              <button 
                onClick={() => setMode("manageTasks")}
                style={{
                  padding: '12px 24px',
                  background: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}
              >
                 Управление заданиями
              </button>
            </div>
          </div>
        );

      case "manageTasks":
        return <ManageTasks onBack={() => setMode("results")} />;

      default:
        return null;
    }
  };

  return <main className="app-main">{renderContent()}</main>;
}

export default App;