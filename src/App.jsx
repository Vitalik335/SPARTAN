import { useState, useEffect } from 'react';
import './index.css';

// --- БАЗА ДАННЫХ РАСПИСАНИЯ ---
const scheduleDB = {
  "Monday": [
    { id: 'm1', time: '05:30', cat: 'Gym', title: 'Утренняя зарядка', details: ['Отжимания: 3x15', 'Пресс: 3x20', 'Планка: 60 сек'] },
    { id: 'm2', time: '06:30', cat: 'Food', title: 'Завтрак', details: ['Омлет (3 яйца)', 'Шпинат, лук и перец (2 горсти)', '1 тост Whole Wheat'] },
    { id: 'm3', time: '12:20', cat: 'Food', title: 'Обед (Контейнер)', details: ['Запеченная грудка: 150г', 'Brown Rice: 1 cup (вареного)', 'Овощной микс (Брокколи, перец): 200г+'] },
    { id: 'm4', time: '17:15', cat: 'Food', title: 'Ужин: Сэндвич', details: ['Хлеб Whole Wheat: 2 куска', 'Turkey Deli meat: 5 слайсов', 'Огурец, лук и листья салата'] },
    { id: 'm5', time: '21:30', cat: 'Life', title: 'Сон', details: ['Без телефона за 30 мин', 'Полная темнота'] }
  ],
  "Tuesday": [
    { id: 'tu2', time: '06:30', cat: 'Food', title: 'Завтрак', details: ['Oatmeal сухая: 0.5 cup', 'Peanut butter: 1 tbsp', '1 банан'] },
    { id: 'tu3', time: '14:00', cat: 'Food', title: 'Обед (в окне)', details: ['Тушеный говяжий фарш: 150г', 'Pasta вареная: 1 cup', 'Зеленая фасоль и лук: 0.5 банки'] },
    { id: 'tu4', time: '16:45', cat: 'Food', title: 'Ужин', details: ['Brown Rice: 1 cup', 'Мясо запеченное: 150г', 'Овощи (болгарский перец и огурец)'] }
  ],
  "Wednesday": [
    { id: 'w2', time: '12:30', cat: 'Food', title: 'Обед', details: ['Tuna in Water: 1 пакет', 'Spring Mix + Перец + Лук', '2 тоста (можно заменить Рис на Батат!)'] },
    { id: 'w3', time: '18:00', cat: 'Food', title: 'Ужин', details: ['Рыба запеченная: 200г', 'Большой овощной салат: полпакета'] }
  ],
  "Thursday": [
    { id: 'th2', time: '14:00', cat: 'Food', title: 'Обед', details: ['Запеченная индейка: 150г', 'Brown Rice: 1 cup', 'Брокколи и перец: 200г'] },
    { id: 'th3', time: '17:00', cat: 'Gym', title: 'ЗАЛ: ГРУДЬ + ПЛЕЧИ', details: ['Жим лежа: 3x12', 'Жим сидя: 3x12', 'Махи: 3x15', 'Тяга блока К ПОЯСУ: 3x12'] }
  ],
  "Friday": [
    { id: 'fr2', time: '13:15', cat: 'Food', title: 'Обед', details: ['Сэндвич (150г индейки)', 'Овощная нарезка (перец, морковь, огурец)'] },
    { id: 'fr3', time: '14:00', cat: 'Gym', title: 'ЗАЛ: СПИНА', details: ['ПОДТЯГИВАНИЯ: max (на ширину)', 'Тяга ВЕРХНЕГО блока: 3x12 (на ширину)', 'Тяга блока К ПОЯСУ: 3x12 (на толщину)', 'Бицепс: 3x12'] }
  ],
  "Saturday": [
    { id: 'sa2', time: '10:00', cat: 'Gym', title: 'ЗАЛ: НОГИ', details: ['Жим ногами: 3x12', 'Сгибание ног: 3x12', 'Пресс: 3x20'] },
    { id: 'sa3', time: '18:00', cat: 'Food', title: 'CHEAT MEAL', details: ['Бургер (Whataburger)', 'Маленькая картошка'] }
  ],
  "Sunday": [
    { id: 'su1', time: '12:30', cat: 'Food', title: 'Обед', details: ['Курица запеченая: 200г', '1 средний БАТАТ (запеченный)'] },
    { id: 'su2', time: '14:00', cat: 'Gym', title: 'ЗАЛ: КАРДИО', details: ['45 мин ходьба (уклон 5-10%)', 'Растяжка'] }
  ]
};

const MealPrepTab = () => {
  return (
    <div className="p-4 animate-fadeIn">
      <h2 className="text-3xl font-black text-orange-500 mb-6 uppercase italic tracking-tighter text-center">Meal Prep</h2>
      
      <div className="bg-gray-800 rounded-2xl p-6 border-l-8 border-yellow-500 mb-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 italic uppercase">🛒 Список H-E-B</h3>
        <ul className="space-y-3 font-medium">
          <li className="text-lg text-gray-200">🍗 <b>Мясо:</b> 3 lbs грудки (Family Pack)</li>
          <li className="text-lg text-gray-200">🍚 <b>Гарнир:</b> Brown Rice + 3 Батата</li>
          <li className="text-lg text-gray-200">🌈 <b>Овощи:</b> Перец, Лук, Шпинат, Брокколи</li>
          <li className="text-lg text-gray-200">🍳 <b>Завтрак:</b> 18 яиц + Овощной микс</li>
        </ul>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border-l-8 border-red-500 mb-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4 italic uppercase">🔥 Готовка</h3>
        <div className="space-y-4 text-base text-gray-300">
          <p><span className="text-red-400 font-bold underline">МЯСО + ОВОЩИ:</span> Духовка 400°F, 22 мин. Нарежь перец и лук прямо к курице.</p>
          <p><span className="text-blue-400 font-bold underline">РИС:</span> 1.5 чашки сухого риса + 3 чашки воды.</p>
          <p><span className="text-orange-400 font-bold underline">БАТАТ:</span> В микроволновку на 7 мин. Ешь в Вс или вместо риса.</p>
        </div>
      </div>

      <div className="bg-green-900/30 rounded-2xl p-6 border-2 border-green-500 shadow-xl mb-24 text-center">
        <h3 className="text-xl font-bold text-green-400 mb-4 uppercase">🍱 Формула Порции</h3>
        <div className="space-y-2 text-lg text-white font-bold">
          <p>🍗 Мясо: 150г (готового)</p>
          <p>🍚 Гарнир: 1 cup (риса)</p>
          <p>🌈 Овощи: БЕЗ ОГРАНИЧЕНИЙ</p>
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ task, isDone, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const borderClass = task.cat === 'Gym' ? 'border-red-500' : task.cat === 'Food' ? 'border-green-500' : 'border-blue-500';
  const icon = task.cat === 'Gym' ? '💪' : task.cat === 'Food' ? '🥗' : '💤';

  return (
    <div className={`bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-4 transition-all duration-300 ${isDone ? 'opacity-50 grayscale' : ''}`}>
      <div className={`p-5 flex items-center justify-between border-l-8 ${borderClass} cursor-pointer`} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm font-bold bg-gray-700 px-2 py-1 rounded text-gray-200">{task.time}</span>
            <span className="text-sm text-gray-400 uppercase tracking-widest font-semibold">{task.cat}</span>
          </div>
          <h3 className={`text-xl font-bold leading-tight ${isDone ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</h3>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onToggle(task.id); }} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ml-4 flex-shrink-0 ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
          <span className="text-2xl">{isDone ? '✓' : icon}</span>
        </button>
      </div>
      {isOpen && (
        <div className="bg-gray-700/50 px-5 py-4 transition-all">
          <ul className="list-disc list-inside space-y-2">
            {task.details.map((detail, idx) => <li key={idx} className="text-base text-gray-200 font-medium">{detail}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Today');
  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
  const [today, setToday] = useState(() => {
    const dayIndex = new Date().getDay();
    return daysMap[dayIndex];
  });

  const [checkedItems, setCheckedItems] = useState(() => JSON.parse(localStorage.getItem('spartanProgress') || '{}'));

  useEffect(() => {
    const now = new Date();
    // Умное воскресенье: после 12:00 открываем Meal Prep
    if (now.getDay() === 0 && now.getHours() >= 12) {
      setActiveTab('Prep');
    }
  }, []);

  useEffect(() => { localStorage.setItem('spartanProgress', JSON.stringify(checkedItems)); }, [checkedItems]);

  const toggleCheck = (id) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

  const tasks = scheduleDB[today] || [];
  const progress = tasks.length ? Math.round((tasks.filter(t => checkedItems[t.id]).length / tasks.length) * 100) : 0;

  return (
    <div className="h-screen bg-gray-900 text-white font-sans flex flex-col overflow-hidden">
      {activeTab === 'Today' && (
        <div className="p-6 bg-gray-900 shadow-xl border-b border-gray-800 flex-shrink-0">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase">СПАРТАНЕЦ</h1>
              <p className="text-lg text-gray-400 font-bold">{today}</p>
            </div>
            <div className="text-3xl font-bold font-mono text-white">{progress}%</div>
          </div>
          <div className="h-3 bg-gray-700 rounded-full overflow-hidden mb-4">
            <div className={`h-full transition-all duration-700 ease-out ${progress === 100 ? 'bg-green-500' : 'bg-yellow-500'}`} style={{ width: `${progress}%` }}></div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center bg-gray-800 rounded-lg p-3 border border-gray-700 font-bold text-xs uppercase tracking-tighter">
              <div className="text-green-400">🍗 2150 ккал</div>
              <div className="border-l border-gray-700 text-red-400">🔥 2600+ ккал</div>
              <div className="border-l border-gray-700 text-blue-400">🥩 180г белка</div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto no-scrollbar pb-44">
        {activeTab === 'Today' ? (
          <div className="p-4 space-y-4">
            {tasks.map(task => <TaskCard key={task.id} task={task} isDone={!!checkedItems[task.id]} onToggle={toggleCheck} />)}
            {!tasks.length && <div className="text-center text-gray-500 mt-10 text-xl font-bold italic uppercase">REST DAY</div>}
          </div>
        ) : <MealPrepTab />}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 flex flex-col z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <div className="flex overflow-x-auto no-scrollbar border-b border-gray-800/50">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d, i) => {
            const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            return (
              <button key={d} onClick={() => { setToday(fullDays[i]); setActiveTab('Today'); }} className={`flex-1 min-w-[60px] py-4 text-sm font-black transition-colors ${activeTab === 'Today' && today === fullDays[i] ? 'text-yellow-400 bg-gray-800/50' : 'text-gray-500'}`}>
                {d}
              </button>
            )
          })}
        </div>
        <div className="flex h-16">
          <button onClick={() => setActiveTab('Today')} className={`flex-1 font-black tracking-widest text-xs uppercase ${activeTab === 'Today' ? 'text-white bg-gray-800' : 'text-gray-600'}`}>ГРАФИК</button>
          <button onClick={() => setActiveTab('Prep')} className={`flex-1 font-black tracking-widest text-xs uppercase relative ${activeTab === 'Prep' ? 'text-orange-500 bg-gray-800' : 'text-gray-600'}`}>PREP 🍱{activeTab === 'Prep' && <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500 shadow-[0_0_10px_orange]"></span>}</button>
        </div>
      </div>
    </div>
  );
}