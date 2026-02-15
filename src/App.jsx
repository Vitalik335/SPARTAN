import { useState, useEffect } from 'react';
import './index.css';

// --- БАЗА ДАННЫХ РАСПИСАНИЯ ---
const scheduleDB = {
  "Monday": [
    { id: 'm1', time: '05:30', cat: 'Gym', title: 'Утренняя зарядка', details: ['Отжимания: 3x15', 'Пресс: 3x20', 'Планка: 60 сек'] },
    { id: 'm2', time: '06:30', cat: 'Food', title: 'Завтрак', details: ['Омлет (3 яйца)', 'Шпинат (2 горсти)', '1 тост Whole Wheat'] },
    { id: 'm3', time: '12:20', cat: 'Food', title: 'Обед (Контейнер)', details: ['Запеченная грудка: 150г (готовой)', 'Brown Rice: 1 cup (вареного)', 'Брокколи: 200г (полпакета Steamable)'] },
    { id: 'm4', time: '17:15', cat: 'Food', title: 'Ужин: Сэндвич', details: ['Хлеб Whole Wheat: 2 куска', 'Turkey Deli meat: 5 слайсов', '1 свежий огурец'] },
    { id: 'm5', time: '21:30', cat: 'Life', title: 'Сон', details: ['Без телефона', 'Полная темнота'] }
  ],
  "Tuesday": [
    { id: 'tu2', time: '06:30', cat: 'Food', title: 'Завтрак', details: ['Oatmeal сухая: 0.5 cup', 'Peanut butter: 1 tbsp', '1 банан'] },
    { id: 'tu3', time: '14:00', cat: 'Food', title: 'Обед (в окне)', details: ['Тушеный говяжий фарш: 150г', 'Pasta вареная: 1 cup', 'Зеленая фасоль: 0.5 банки'] },
    { id: 'tu4', time: '16:45', cat: 'Food', title: 'Ужин', details: ['Brown Rice: 1 cup', 'Мясо запеченное: 150г', '1 свежий огурец'] }
  ],
  "Wednesday": [
    { id: 'w2', time: '12:30', cat: 'Food', title: 'Обед', details: ['Tuna in Water: 1 пакет', 'Spring Mix: 2 горсти', '2 тоста Whole Wheat (можно заменить Рис на Батат!)'] },
    { id: 'w3', time: '18:00', cat: 'Food', title: 'Ужин', details: ['Рыба запеченная: 200г', 'Салат-микс: полпакета'] }
  ],
  "Thursday": [
    { id: 'th2', time: '14:00', cat: 'Food', title: 'Обед', details: ['Запеченная индейка: 150г', 'Brown Rice: 1 cup', 'Брокколи: 200г'] },
    { id: 'th3', time: '17:00', cat: 'Gym', title: 'ЗАЛ: ГРУДЬ + ПЛЕЧИ', details: ['Жим лежа: 3x12', 'Жим сидя: 3x12', 'Махи: 3x15', 'Тяга блока К ПОЯСУ: 3x12'] }
  ],
  "Friday": [
    { id: 'fr2', time: '13:15', cat: 'Food', title: 'Обед', details: ['Сэндвич (150г индейки)', 'Baby Carrots: полпакета'] },
    { id: 'fr3', time: '14:00', cat: 'Gym', title: 'ЗАЛ: СПИНА', details: ['ПОДТЯГИВАНИЯ: max (на ширину)', 'Тяга ВЕРХНЕГО блока: 3x12 (на ширину)', 'Тяга блока К ПОЯСУ: 3x12 (на толщину)', 'Бицепс: 3x12'] }
  ],
  "Saturday": [
    { id: 'sa2', time: '10:00', cat: 'Gym', title: 'ЗАЛ: НОГИ', details: ['Жим ногами: 3x12', 'Сгибание ног: 3x12', 'Пресс: 3x20'] },
    { id: 'sa3', time: '18:00', cat: 'Food', title: 'CHEAT MEAL', details: ['Бургер (Whataburger)', 'Маленькая картошка'] }
  ],
  "Sunday": [
    { id: 'su1', time: '12:30', cat: 'Food', title: 'Обед', details: ['Курица запеченая: 200г', '1 средний БАТАТ (запеченный)'] },
    { id: 'su2', time: '14:00', cat: 'Gym', title: 'ЗАЛ: КАРДИО', details: ['45 мин ходьба (уклон)', 'Растяжка'] }
  ]
};

const MealPrepTab = () => {
  return (
    <div className="p-4 animate-fadeIn">
      <h2 className="text-3xl font-black text-orange-500 mb-6 uppercase italic tracking-tighter">Спартанский Meal Prep</h2>
      
      {/* SHOPPING LIST */}
      <div className="bg-gray-800 rounded-2xl p-6 border-l-8 border-yellow-500 mb-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">🛒 Список продуктов (H-E-B)</h3>
        <ul className="space-y-3">
          <li className="text-lg text-gray-200 font-medium">🍗 <span className="font-bold">Мясо:</span> 3 lbs лоток грудки (Chicken Breast)</li>
          <li className="text-lg text-gray-200 font-medium">🍚 <span className="font-bold">Гарнир:</span> Пачка Brown Rice + 2-3 Батата (Sweet Potato)</li>
          <li className="text-lg text-gray-200 font-medium">🥦 <span className="font-bold">Овощи:</span> 3-4 пакета замороженной Брокколи</li>
          <li className="text-lg text-gray-200 font-medium">🍳 <span className="font-bold">Завтрак:</span> 18 яиц + Контейнер Шпината</li>
          <li className="text-lg text-gray-200 font-medium">🥪 <span className="font-bold">Перекус:</span> Turkey Deli Meat + Цельнозерновой хлеб</li>
        </ul>
      </div>

      {/* COOKING GUIDE */}
      <div className="bg-gray-800 rounded-2xl p-6 border-l-8 border-red-500 mb-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">🔥 Инструкция по готовке</h3>
        <div className="space-y-4 text-base font-medium">
          <p className="text-gray-300 font-bold underline mb-1">СКОЛЬКО ПОЛУЧИТСЯ:</p>
          <p className="text-gray-300"><span className="text-red-400 font-bold">ЗАПЕКАЕМ МЯСО:</span> Весь лоток (3 lbs) в духовку (400°F) на 22 мин. На выходе будет ~1кг готового мяса.</p>
          <p className="text-gray-300"><span className="text-blue-400 font-bold">ВАРИМ РИС:</span> 1.5 чашки сухого риса + 3 чашки воды. После варки получится ~4.5 чашки готового риса.</p>
          <p className="text-gray-300"><span className="text-orange-400 font-bold">БАТАТ (Sweet Potato):</span> Проткни вилкой 5 раз. В микроволновку на 7 минут. Один съешь в Воскресенье, остальные на замену рису в среду.</p>
        </div>
      </div>

      {/* CONTAINER ASSEMBLY */}
      <div className="bg-green-900/30 rounded-2xl p-6 border-2 border-green-500 shadow-xl mb-10">
        <h3 className="text-xl font-bold text-green-400 mb-4">🍱 Сборка 5 контейнеров (Пн-Пт)</h3>
        <p className="text-gray-300 mb-4 italic">В каждый бокс кладем ровно:</p>
        <div className="space-y-2 text-lg">
          <p>✅ <span className="font-bold">Мясо:</span> 150г (одна средняя готовая грудка)</p>
          <p>✅ <span className="font-bold">Гарнир:</span> 1 чашка (cup) вареного риса</p>
          <p>✅ <span className="font-bold">Овощи:</span> 200г брокколи (полпакета Steamable)</p>
          <p className="text-sm text-gray-400 mt-4 underline italic">Батат съешь свежим в воскресенье или замени им рис в среду!</p>
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ task, isDone, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  let borderClass = 'border-gray-600';
  let icon = '⚡';
  if (task.cat === 'Gym') { borderClass = 'border-red-500'; icon = '💪'; }
  if (task.cat === 'Food') { borderClass = 'border-green-500'; icon = '🥗'; }
  if (task.cat === 'Life') { borderClass = 'border-blue-500'; icon = '💤'; }

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
        <button onClick={(e) => { e.stopPropagation(); onToggle(task.id); }} className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ml-4 flex-shrink-0 ${isDone ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
          <span className="text-2xl">{isDone ? '✓' : icon}</span>
        </button>
      </div>
      <div className={`bg-gray-700/50 px-5 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-80 py-4' : 'max-h-0 py-0 overflow-hidden'}`}>
        <ul className="list-disc list-inside space-y-2">
          {task.details.map((detail, idx) => <li key={idx} className="text-base text-gray-200 font-medium">{detail}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Today');
  const [today, setToday] = useState(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date().getDay()];
  });
  const [checkedItems, setCheckedItems] = useState(() => {
    const saved = localStorage.getItem('spartanProgress');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('spartanProgress', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleCheck = (id) => setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));

  const tasks = scheduleDB[today] || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => checkedItems[t.id]).length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="h-screen bg-gray-900 text-white font-sans flex flex-col overflow-hidden">
      {/* HEADER (Sticky) */}
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
          <div className="grid grid-cols-3 gap-2 text-center bg-gray-800 rounded-lg p-3 border border-gray-700 font-bold">
              <div><p className="text-xs text-gray-400">🍗 2150</p></div>
              <div className="border-l border-gray-700"><p className="text-xs text-gray-400">🔥 2600+</p></div>
              <div className="border-l border-gray-700"><p className="text-xs text-gray-400">🥩 180г</p></div>
          </div>
        </div>
      )}

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto no-scrollbar pb-40">
        {activeTab === 'Today' ? (
          <div className="p-4 space-y-4">
            {tasks.map(task => <TaskCard key={task.id} task={task} isDone={!!checkedItems[task.id]} onToggle={toggleCheck} />)}
            {tasks.length === 0 && <div className="text-center text-gray-500 mt-10 text-xl font-bold italic">ДЕНЬ ОТДЫХА</div>}
          </div>
        ) : (
          <MealPrepTab />
        )}
      </div>

      {/* BOTTOM NAVIGATION */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 border-t border-gray-800 flex flex-col z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <div className="flex overflow-x-auto no-scrollbar border-b border-gray-800/50">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d, i) => {
            const fullDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            const isToday = today.startsWith(fullDays[i].substring(0,3));
            return (
              <button key={d} onClick={() => { setToday(fullDays[i]); setActiveTab('Today'); }} className={`flex-1 min-w-[60px] py-4 text-sm font-black ${activeTab === 'Today' && today === fullDays[i] ? 'text-yellow-400' : 'text-gray-500'}`}>
                {d}
              </button>
            )
          })}
        </div>
        <div className="flex h-16">
          <button onClick={() => setActiveTab('Today')} className={`flex-1 font-black tracking-widest text-sm ${activeTab === 'Today' ? 'text-white bg-gray-800' : 'text-gray-600'}`}>
            ГРАФИК
          </button>
          <button onClick={() => setActiveTab('Prep')} className={`flex-1 font-black tracking-widest text-sm relative ${activeTab === 'Prep' ? 'text-orange-500 bg-gray-800' : 'text-gray-600'}`}>
            ПОДГОТОВКА 🍱
            {activeTab === 'Prep' && <span className="absolute bottom-0 left-0 w-full h-1 bg-orange-500"></span>}
          </button>
        </div>
      </div>
    </div>
  );
}