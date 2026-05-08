import React, { useState, useEffect, useCallback } from 'react';
import MascotOverlay from '../components/MascotOverlay';
import { CIPHER_DATA, CIPHER_ORDER, MORSE_TABLE, RUSSIAN_ALPHABET } from '../data/ciphersData';

const Tasks = ({ onBack, goToLogin }) => {
  // Данные из БД
  const [tasks, setTasks] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  // Навигация по экранам: 'menu' | 'prologue' | 'task' | 'final'
  const [screen, setScreen] = useState('menu');
  const [currentCipher, setCurrentCipher] = useState(null);
  const [currentTaskIdx, setCurrentTaskIdx] = useState(0);

  // UI состояние
  const [openCipher, setOpenCipher] = useState(null);
  const [showMascot, setShowMascot] = useState(false);
  const [mascotLines, setMascotLines] = useState([]);
  const [mascotCallback, setMascotCallback] = useState(null);
  const [showPrologueCard, setShowPrologueCard] = useState(false);

  // Задание
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null
  const [showNextBtn, setShowNextBtn] = useState(false);

  const username = localStorage.getItem('user');

  useEffect(() => {
    fetchTasks();
    if (username) fetchProgress();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/tasks/');
      if (res.ok) setTasks(await res.json());
    } catch (e) {
      console.error('Ошибка загрузки заданий', e);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/tasks/progress', {
        credentials: 'include'
      });
      if (res.ok) setProgress(await res.json());
    } catch (e) {
      console.error('Ошибка загрузки прогресса', e);
    }
  };

  const isTaskCompleted = (taskId) => {
    return progress.some(p => p.completed_task_ids.includes(taskId));
  };

  const getTasksForCipher = (cipherType) => {
    return tasks.filter(t => t.cipher_type === cipherType).sort((a, b) => a.order - b.order);
  };

  const getCipherProgress = (cipherType) => {
    const prog = progress.find(p => p.cipher_type === cipherType);
    return prog || { completed_tasks: 0, total_tasks: 0, completed_task_ids: [] };
  };

  // ─── Маскот ───
  const triggerMascot = (lines, callback) => {
    setMascotLines(lines);
    setMascotCallback(() => callback);
    setShowMascot(true);
  };

  const handleMascotComplete = () => {
    setShowMascot(false);
    if (mascotCallback) mascotCallback();
  };

  // ─── Открыть пролог ───
  const openPrologue = (cipherType) => {
    setCurrentCipher(cipherType);
    setScreen('prologue');
    setShowPrologueCard(false);
    const data = CIPHER_DATA[cipherType];
    if (data && data.prologue) {
      triggerMascot(data.prologue.mascotLines, () => {
        setShowPrologueCard(true);
      });
    } else {
      setShowPrologueCard(true);
    }
  };

  // ─── Открыть задание ───
  const openTask = (cipherType, taskIdx) => {
    setCurrentCipher(cipherType);
    setCurrentTaskIdx(taskIdx);
    setScreen('task');
    setAnswer('');
    setFeedback(null);
    setShowNextBtn(false);

    const data = CIPHER_DATA[cipherType];
    const hintData = data && data.taskHints && data.taskHints[taskIdx + 1];
    if (hintData) {
      triggerMascot([hintData], () => {});
    }
  };

  // ─── Проверка ответа ───
  const checkAnswer = async () => {
    if (!answer.trim()) return;
    const cipherTasks = getTasksForCipher(currentCipher);
    const task = cipherTasks[currentTaskIdx];
    if (!task) return;

    try {
      const res = await fetch('http://localhost:8000/api/tasks/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ task_id: task.id, answer: answer.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.correct) {
          setFeedback('correct');
          setShowNextBtn(true);
          fetchProgress();
        } else {
          setFeedback('wrong');
        }
      }
    } catch (e) {
      console.error('Ошибка отправки ответа', e);
    }
  };

  // ─── Далее (после задания) ───
  const nextChapter = () => {
    const cipherTasks = getTasksForCipher(currentCipher);
    const nextIdx = currentTaskIdx + 1;
    if (nextIdx < cipherTasks.length) {
      openTask(currentCipher, nextIdx);
    } else {
      // Все задания шифра пройдены
      setScreen('final');
    }
  };

  // ─── Назад в меню ───
  const goToMenu = () => {
    setScreen('menu');
    setCurrentCipher(null);
  };

  // ─── Подсказка (кнопка лиса в углу) ───
  const showHint = () => {
    const cipherTasks = getTasksForCipher(currentCipher);
    const task = cipherTasks[currentTaskIdx];
    if (task && task.hint) {
      triggerMascot([{ img: 'explain', text: task.hint }], () => {});
    } else {
      const data = CIPHER_DATA[currentCipher];
      const hintData = data && data.taskHints && data.taskHints[currentTaskIdx + 1];
      if (hintData) {
        triggerMascot([hintData], () => {});
      }
    }
  };

  // ─── Справочная таблица ───
  const renderTable = (tableType) => {
    if (tableType === 'morse') {
      const letters = Object.keys(MORSE_TABLE);
      const rows = [];
      for (let i = 0; i < letters.length; i += 6) {
        rows.push(letters.slice(i, i + 6));
      }
      return (
        <div className="task-ref-table-wrap">
          <p className="task-ref-title">Таблица Морзе:</p>
          <table className="task-ref-table">
            <thead>
              <tr>{[1,2,3,4,5,6].map(i => <React.Fragment key={i}><th>Б</th><th>Код</th></React.Fragment>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>
                  {row.map(l => <React.Fragment key={l}><td><b>{l}</b></td><td>{MORSE_TABLE[l]}</td></React.Fragment>)}
                  {row.length < 6 && Array(6 - row.length).fill(null).map((_, i) => <React.Fragment key={`empty-${i}`}><td></td><td></td></React.Fragment>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (tableType === 'atbash') {
      const alpha = RUSSIAN_ALPHABET.split('');
      const reversed = [...alpha].reverse();
      const half = Math.ceil(alpha.length / 2);
      return (
        <div className="task-ref-table-wrap">
          <p className="task-ref-title">Таблица Атбаш:</p>
          <table className="task-ref-table">
            <tbody>
              <tr>{alpha.slice(0, half).map(l => <td key={l}><b>{l}</b></td>)}</tr>
              <tr>{reversed.slice(0, half).map((l, i) => <td key={i}>{l}</td>)}</tr>
              <tr>{alpha.slice(half).map(l => <td key={l}><b>{l}</b></td>)}</tr>
              <tr>{reversed.slice(half).map((l, i) => <td key={i}>{l}</td>)}</tr>
            </tbody>
          </table>
        </div>
      );
    }

    if (tableType === 'vernam') {
      const alpha = RUSSIAN_ALPHABET.split('');
      const half = Math.ceil(alpha.length / 2);
      return (
        <div className="task-ref-table-wrap">
          <p className="task-ref-title">Таблица букв и чисел:</p>
          <table className="task-ref-table">
            <tbody>
              <tr>{alpha.slice(0, half).map((l, i) => <td key={l}>{l}={i}</td>)}</tr>
              <tr>{alpha.slice(half).map((l, i) => <td key={l}>{l}={i + half}</td>)}</tr>
            </tbody>
          </table>
        </div>
      );
    }

    return null;
  };

  // ─── Точки прогресса ───
  const getProgressDots = (cipherType) => {
    const cipherTasks = getTasksForCipher(cipherType);
    const prog = getCipherProgress(cipherType);
    const total = cipherTasks.length;
    const completed = prog.completed_tasks;
    const ratio = total > 0 ? completed / total : 0;

    if (ratio >= 1) return ['#4CAF50', '#4CAF50', '#4CAF50'];
    if (ratio >= 0.66) return ['#4CAF50', '#4CAF50', '#E0D8D0'];
    if (ratio >= 0.33) return ['#4CAF50', '#E0D8D0', '#E0D8D0'];
    if (ratio > 0) return ['#F5A623', '#E0D8D0', '#E0D8D0'];
    return ['#E0D8D0', '#E0D8D0', '#E0D8D0'];
  };

  const dotColor = (diff) => {
    if (diff === 'green') return '#4CAF50';
    if (diff === 'yellow') return '#F5A623';
    return '#E53935';
  };

  // ═══════════════════════════════════
  // РЕНДЕР
  // ═══════════════════════════════════

  if (loading) {
    return <div className="page"><div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}><p>Загрузка...</p></div></div>;
  }

  if (!username) {
    return (
      <div className="page">
        <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: '20px' }}>Задания</h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>Для выполнения заданий необходимо войти в аккаунт.</p>
          <button className="btn-primary" onClick={() => goToLogin('tasks')}>Войти</button>
        </div>
      </div>
    );
  }

  // ─── ЭКРАН: МЕНЮ ───
  if (screen === 'menu') {
    const cipherTypes = CIPHER_ORDER.filter(ct => getTasksForCipher(ct).length > 0);

    if (cipherTypes.length === 0) {
      return (
        <div className="page">
          <div className="container" style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h2 style={{ marginBottom: '20px' }}>Задания</h2>
            <p style={{ color: '#666' }}>Заданий пока нет. Скоро появятся!</p>
          </div>
        </div>
      );
    }

    return (
      <div className="page">
        <div className="tasks-menu-container">
          <div className="tasks-menu-header">
            <h1>Выбери шифр</h1>
            <p>Шифры расположены по сложности — рекомендуем идти по порядку</p>
          </div>

          <div className="tasks-ciphers-list">
            {cipherTypes.map((cipherType, idx) => {
              const data = CIPHER_DATA[cipherType];
              const cipherTasks = getTasksForCipher(cipherType);
              const prog = getCipherProgress(cipherType);
              const isOpen = openCipher === cipherType;
              const dots = getProgressDots(cipherType);

              return (
                <div key={cipherType} className="tasks-cipher-card">
                  {/* Заголовок */}
                  <div className="tasks-cipher-header" onClick={() => setOpenCipher(isOpen ? null : cipherType)}>
                    <div className="tasks-cipher-name">
                      <div className="tasks-cipher-num" style={{ background: dotColor(data.difficulty) }}>
                        {idx + 1}
                      </div>
                      <span className="tasks-cipher-title">{data.title}</span>
                    </div>
                    <div className="tasks-cipher-dots">
                      {dots.map((color, i) => (
                        <div key={i} className="tasks-dot" style={{ background: color }} />
                      ))}
                    </div>
                  </div>

                  {/* Главы */}
                  {isOpen && (
                    <div className="tasks-cipher-chapters">
                      {/* Пролог */}
                      <button className="tasks-chapter-btn" onClick={() => openPrologue(cipherType)}>
                        <span className="tasks-ch-left">
                          <span className="tasks-chapter-icon">{'\uD83D\uDCD6'}</span>
                          <span>Пролог</span>
                        </span>
                      </button>

                      {/* Задания */}
                      {cipherTasks.map((task, ti) => {
                        const done = isTaskCompleted(task.id);
                        return (
                          <button
                            key={task.id}
                            className="tasks-chapter-btn"
                            onClick={() => openTask(cipherType, ti)}
                          >
                            <span className="tasks-ch-left">
                              <span className="tasks-chapter-icon">{done ? '\u2705' : '\uD83D\uDCDD'}</span>
                              <span>Задание {ti + 1}</span>
                            </span>
                            {done && <span style={{ color: '#4CAF50', fontWeight: '700' }}>{'\u2713'}</span>}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {showMascot && <MascotOverlay lines={mascotLines} onComplete={handleMascotComplete} />}
      </div>
    );
  }

  // ─── ЭКРАН: ПРОЛОГ ───
  if (screen === 'prologue') {
    const data = CIPHER_DATA[currentCipher];
    const prologue = data && data.prologue;

    return (
      <div className="page">
        <div className="tasks-chapter-topbar">
          <button className="tasks-back-btn" onClick={goToMenu}>{'\u2190'}</button>
          <div className="tasks-topbar-info">
            <div className="tasks-topbar-cipher">{data.title}</div>
            <div className="tasks-topbar-chapter">Пролог</div>
          </div>
        </div>

        <div className="tasks-chapter-content">
          {showPrologueCard && prologue && (
            <div className="tasks-content-card visible">
              <h2>{prologue.content.title}</h2>
              {prologue.content.body.map((p, i) => <p key={i}>{p}</p>)}
              {prologue.content.hist && (
                <div className="tasks-history-note">{prologue.content.hist}</div>
              )}
              <button className="tasks-next-btn" onClick={() => {
                const cipherTasks = getTasksForCipher(currentCipher);
                if (cipherTasks.length > 0) {
                  openTask(currentCipher, 0);
                } else {
                  goToMenu();
                }
              }}>
                Далее {'\u2192'}
              </button>
            </div>
          )}
        </div>

        {showMascot && <MascotOverlay lines={mascotLines} onComplete={handleMascotComplete} />}
      </div>
    );
  }

  // ─── ЭКРАН: ЗАДАНИЕ ───
  if (screen === 'task') {
    const data = CIPHER_DATA[currentCipher];
    const cipherTasks = getTasksForCipher(currentCipher);
    const task = cipherTasks[currentTaskIdx];

    return (
      <div className="page">
        <div className="tasks-chapter-topbar">
          <button className="tasks-back-btn" onClick={goToMenu}>{'\u2190'}</button>
          <div className="tasks-topbar-info">
            <div className="tasks-topbar-cipher">{data ? data.title : currentCipher}</div>
            <div className="tasks-topbar-chapter">Задание {currentTaskIdx + 1}</div>
          </div>
        </div>

        <div className="tasks-chapter-content">
          <div className="tasks-content-card visible">
            <div className="tasks-task-label">Задание</div>
            <p className="tasks-task-text" dangerouslySetInnerHTML={{ __html: task ? task.text : '' }} />

            {/* Справочная таблица */}
            {data && data.showTable && renderTable(data.showTable)}

            {/* Поле ввода */}
            <div style={{ marginTop: '18px' }}>
              <input
                className={`tasks-task-input ${feedback === 'correct' ? 'correct' : feedback === 'wrong' ? 'wrong' : ''}`}
                placeholder="Введи ответ..."
                value={answer}
                onChange={(e) => { setAnswer(e.target.value); setFeedback(null); }}
                onKeyDown={(e) => e.key === 'Enter' && !showNextBtn && checkAnswer()}
                autoComplete="off"
              />
            </div>

            {!showNextBtn && (
              <button className="tasks-check-btn" onClick={checkAnswer}>Проверить</button>
            )}

            {/* Обратная связь */}
            <div className={`tasks-feedback ${feedback === 'correct' ? 'ok' : feedback === 'wrong' ? 'err' : ''}`}>
              {feedback === 'correct' && '\u2713 Правильно!'}
              {feedback === 'wrong' && '\u2717 Не совсем. Попробуй ещё раз!'}
            </div>

            {/* Кнопка далее */}
            {showNextBtn && (
              <button className="tasks-next-btn" onClick={nextChapter}>Далее {'\u2192'}</button>
            )}
          </div>
        </div>

        {/* Кнопка подсказки в углу */}
        <button className="tasks-hint-btn" onClick={showHint}>
          <img src="/img/fox-normal.png" alt="Подсказка" />
        </button>

        {showMascot && <MascotOverlay lines={mascotLines} onComplete={handleMascotComplete} />}
      </div>
    );
  }

  // ─── ЭКРАН: ФИНАЛ ───
  if (screen === 'final') {
    const data = CIPHER_DATA[currentCipher];
    return (
      <div className="page">
        <div className="tasks-final">
          <img src="/img/fox-normal.png" className="tasks-final-fox" alt="Лисёнок" />
          <h1>Поздравляю!</h1>
          <p>Ты прошёл все задания по шифру «{data ? data.title : currentCipher}»!</p>
          <button className="btn-primary" onClick={goToMenu}>Вернуться в меню</button>
        </div>
      </div>
    );
  }

  return null;
};

export default Tasks;
