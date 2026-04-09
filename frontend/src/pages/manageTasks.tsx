import { useState, useEffect } from "react";
import { api, Task } from "../services/api";
import "../manageTasks.css";

type Props = {
  onBack: () => void;
};

const ManageTasks = ({ onBack }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  // Состояния для добавления нового задания
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await api.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Удаление задания
  const handleDelete = async (id: number) => {
    if (confirm("Вы уверены, что хотите удалить это задание?")) {
      try {
        await api.deleteTask(id);
        await loadTasks();
        alert("Задание удалено");
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Ошибка при удалении");
      }
    }
  };

  // Редактирование - начало
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  // Редактирование - сохранение
  const handleUpdate = async () => {
    if (!editingTask) return;
    
    try {
      await api.updateTask(editingTask.id, {
        title: editTitle,
        description: editDescription
      });
      await loadTasks();
      setEditingTask(null);
      alert("Задание обновлено");
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Ошибка при обновлении");
    }
  };

  // Редактирование - отмена
  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Добавление нового задания
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTitle.trim()) {
      setMessage("Введите название задания");
      return;
    }
    
    setAddLoading(true);
    setMessage("");
    
    try {
      await api.createTask({
        title: newTitle,
        description: newDescription
      });
      
      setMessage("Задание успешно добавлено!");
      setNewTitle("");
      setNewDescription("");
      setShowAddForm(false);
      await loadTasks();
      
      setTimeout(() => setMessage(""), 2000);
      
    } catch (error) {
      console.error("Ошибка:", error);
      setMessage("Ошибка при добавлении задания");
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="managetasks-container">
      <div className="managetasks-header-wrapper">
        <button className="managetasks-back-arrow" onClick={onBack}>
          ←
        </button>
        <h1 className="managetasks-header">Управление заданиями</h1>
      </div>

      {/* Кнопка показа/скрытия формы добавления */}
      <div className="managetasks-add-btn">
        <button onClick={() => setShowAddForm(!showAddForm)}>
          {showAddForm ? "− Скрыть форму" : "+ Добавить новое задание"}
        </button>
      </div>

      {/* Форма добавления нового задания */}
      {showAddForm && (
        <div className="addtask-form">
          <h3>Новое задание</h3>
          <form onSubmit={handleAddTask}>
            <div className="addtask-field">
              <label>Название задания *</label>
              <input
                type="text"
                placeholder="Введите название задания..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                disabled={addLoading}
              />
            </div>
            
            {message && (
              <div className={`addtask-message ${message.includes("") ? "success" : "error"}`}>
                {message}
              </div>
            )}
            
            <div className="addtask-buttons">
              <button type="submit" className="addtask-btn-save" disabled={addLoading}>
                {addLoading ? "Сохранение..." : " Добавить"}
              </button>
              <button 
                type="button" 
                className="addtask-btn-cancel" 
                onClick={() => setShowAddForm(false)}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Таблица заданий */}
      <div className="managetasks-table-wrapper">
        <div className="managetasks-table-header">
          <div className="header-num">№</div>
          <div className="header-title">Название задания</div>
          <div className="header-actions">Действия</div>
        </div>

        <div className="managetasks-table-body">
          {loading ? (
            <div className="managetasks-row">
              <div className="cell-num">...</div>
              <div className="cell-title">Загрузка...</div>
              <div className="cell-description"></div>
              <div className="cell-actions"></div>
            </div>
          ) : tasks.length === 0 ? (
            <div className="managetasks-row">
              <div className="cell-num">-</div>
              <div className="cell-title">Нет заданий</div>
              <div className="cell-description"></div>
              <div className="cell-actions"></div>
            </div>
          ) : (
            tasks.map((task, index) => (
              <div className="managetasks-row" key={task.id}>
                {editingTask?.id === task.id ? (
                  // Режим редактирования
                  <>
                    <div className="cell-num">{index + 1}</div>
                    <div className="cell-edit-title">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Название"
                      />
                    </div>
                    <div className="cell-actions">
                      <button className="save-btn" onClick={handleUpdate}> Сохранить</button>
                      <button className="cancel-btn" onClick={handleCancelEdit}>✖ Отмена</button>
                    </div>
                  </>
                ) : (
                  // Режим просмотра
                  <>
                    <div className="cell-num">{index + 1}</div>
                    <div className="cell-title">{task.title}</div>
                    <div className="cell-actions">
                      <button className="edit-btn" onClick={() => handleEdit(task)}> Ред.</button>
                      <button className="delete-btn" onClick={() => handleDelete(task.id)}> Удалить</button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageTasks;