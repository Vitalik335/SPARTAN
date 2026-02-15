import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './index.css';

// --- MEGA DATABASE: WEEK 1 & WEEK 2 (Двуязычный список и инструкции) ---
const megaDatabase = {
  week1: {
    prep: {
      shopping: [
        "Chicken Breast (Куриная грудка) - 3 lbs", 
        "Turkey Tenderloin (Филе индейки для запекания)", 
        "Salmon (Лосось)", 
        "Brown Rice (Бурый рис)", 
        "Sweet Potatoes (Батат) - 3 pcs", 
        "Apples (Яблоки)", 
        "Berries (Ягоды)", 
        "Rice Cakes (Хлебцы)", 
        "Spinach & Peppers (Шпинат и перец)"
      ],
      instructions: [
        "EN: Bake Chicken at 400°F for 22 min. RU: Запекать курицу при 200°C 22 мин.",
        "EN: Bake Turkey Tenderloin at 400°F for 30 min. RU: Запекать индейку при 200°C 30 мин.",
        "EN: Salmon: 400°F for 15 min. RU: Лосось: 200°C на 15 мин.",
        "EN: Rice: 1.5 cup dry + 3 cups water. RU: Рис: 1.5 ст. сухого + 3 ст. воды.",
        "EN: Sweet Potato: 7 min in microwave. RU: Батат: 7 мин в микроволновке."
      ]
    },
    schedule: {
      "Monday": [
        { id: 'w1m1', time: '05:30', cat: 'Gym', title: 'Утренняя зарядка', details: ['Отжимания: 3x15', 'Пресс: 3x20', 'Планка: 60 сек'] },
        { id: 'w1m2', time: '06:30', cat: 'Food', title: 'Завтрак', details: ['Омлет (3 яйца)', 'Шпинат, лук и перец', 'Половина авокадо'] },
        { id: 'w1m3', time: '12:20', cat: 'Food', title: 'Обед (Контейнер)', details: ['Запеченная грудка: 150г', 'Brown Rice: 1 cup', 'Овощи: БЕЗ ОГРАНИЧЕНИЙ'] },
        { id: 'w1m4', time: '15:30', cat: 'Food', title: 'Перекус', details: ['1 Зеленое яблоко'] },
        { id: 'w1m5', time: '17:15', cat: 'Food', title: 'Ужин: Хлебцы с индейкой', details: ['2-3 Рисовых хлебца', 'Turkey Deli meat (нарезка): 5 слайсов', 'Огурец и горчица'] }
      ],
      "Tuesday": [
        { id: 'w1tu1', time: '06:30', cat: 'Food', title: 'Завтрак: Овсянка', details: ['Oatmeal сухая: 0.5 cup', 'Горячее молоко', '1 банан'] },
        { id: 'w1tu2', time: '14:00', cat: 'Food', title: 'Обед', details: ['Тушеный говяжий фарш: 150г', 'Pasta вареная: 1 cup', 'Зеленая фасоль и лук'] },
        { id: 'w1tu3', time: '16:00', cat: 'Food', title: 'Перекус', details: ['Горсть ягод'] },
        { id: 'w1tu4', time: '16:45', cat: 'Food', title: 'Ужин', details: ['Brown Rice: 1 cup', 'Мясо запеченное: 150г', 'Перец и огурец'] }
      ],
      "Wednesday": [
        { id: 'w1w1', time: '12:30', cat: 'Food', title: 'Обед: Хлебцы с тунцом', details: ['Tuna in Water: 1 пакет', '2-3 Рисовых хлебца', 'Лук, перец'] },
        { id: 'w1w2', time: '15:00', cat: 'Food', title: 'Перекус', details: ['1 Яблоко'] },
        { id: 'w1w3', time: '18:00', cat: 'Food', title: 'Ужин: Salmon (Лосось)', details: ['Филе лосося (200г)', 'Запекать 12-15 мин при 400°F', 'Большой салат: Spring Mix, перец, огурец'] }
      ],
      "Thursday": [
        { id: 'w1th1', time: '06:30', cat: 'Food', title: 'Завтрак: Овсянка', details: ['Oatmeal сухая: 0.5 cup', 'Горячее молоко', '1 банан'] },
        { id: 'w1th2', time: '14:00', cat: 'Food', title: 'Обед: Филе Индейки', details: ['Turkey Breast Tenderloin (150г)', 'Brown Rice: 1 cup', 'Запеченный болгарский перец'] },
        { id: 'w1th3', time: '17:00', cat: 'Gym', title: 'ЗАЛ: ГРУДЬ + ПЛЕЧИ', details: ['Жим лежа: 3x12', 'Жим сидя: 3x12', 'Махи: 3x15', 'Тяга блока К ПОЯСУ: 3x12'] }
      ],
      "Friday": [
        { id: 'w1fr1', time: '13:15', cat: 'Food', title: 'Обед: Хлебцы + Индейка', details: ['2-3 Рисовых хлебца', 'Turkey Deli meat: 150г', 'Овощная нарезка'] },
        { id: 'w1fr2', time: '15:30', cat: 'Food', title: 'Перекус', details: ['Горсть ягод'] },
        { id: 'w1fr3', time: '14:00', cat: 'Gym', title: 'ЗАЛ: СПИНА', details: ['ПОДТЯГИВАНИЯ: max', 'Тяга ВЕРХНЕГО блока: 3x12', 'Тяга блока К ПОЯСУ: 3x12', 'Бицепс: 3x12'] }
      ],
      "Saturday": [
        { id: 'w1sa1', time: '10:00', cat: 'Gym', title: 'ЗАЛ: НОГИ', details: ['Жим ногами: 3x12', 'Сгибание ног: 3x12', 'Пресс: 3x20'] },
        { id: 'w1sa2', time: '18:00', cat: 'Food', title: 'CHEAT MEAL', details: ['Бургер (Whataburger)', 'Маленькая картошка'] }
      ],
      "Sunday": [
        { id: 'w1su1', time: '12:30', cat: 'Food', title: 'Обед', details: ['Курица запеченая: 200г', '1 средний БАТАТ (запеченный)'] },
        { id: 'w1su2', time: '14:00', cat: 'Gym', title: 'ЗАЛ: КАРДИО', details: ['45 мин ходьба (уклон 5-10%)', 'Растяжка'] }
      ]
    }
  },
  week2: {
    prep: {
      shopping: [
        "Turkey Breast (Грудка индейки)", 
        "Ground Beef 90/10 (Говяжий фарш)", 
        "Cod Fillet (Филе трески)", 
        "Quinoa (Киноа)", 
        "Couscous (Кускус)", 
        "Pears (Груши)", 
        "Grapefruit (Грейпфрут)", 
        "Zucchini (Цукини)"
      ],
      instructions: [
        "EN: Quinoa: 1 cup dry + 2 cups water. RU: Киноа: 1 ст. сухого + 2 ст. воды.",
        "EN: Couscous: Just add boiling water for 5 min. RU: Кускус: Просто залить кипятком на 5 мин.",
        "EN: Bake Turkey at 400°F for 30 min. RU: Индейка: 200°C на 30 мин.",
        "EN: Lean Steak: Pan-fry or Bake. RU: Стейк: Пожарить или запечь."
      ]
    },
    schedule: {
      "Monday": [
        { id: 'w2m1', time: '05:30', cat: 'Gym', title: 'W2: Cardio + Abs', details: ['Burpees 3x10', 'Leg Raises 3x15', 'Plank 2 min'] },
        { id: 'w2m2', time: '06:30', cat: 'Food', title: 'Завтрак: Шакшука', details: ['3 яйца', 'Томаты, лук, перец', 'Хлебцы 2 шт'] },
        { id: 'w2m3', time: '12:20', cat: 'Food', title: 'Обед: Киноа + Индейка', details: ['Индейка запеченная: 150г', 'Quinoa: 1 cup', 'Цукини гриль'] },
        { id: 'w2m4', time: '15:30', cat: 'Food', title: 'Перекус', details: ['1 Грейпфрут'] },
        { id: 'w2m5', time: '17:15', cat: 'Food', title: 'Ужин: Хлебцы + Тунец', details: ['2 Рисовых хлебца', 'Tuna пакет', 'Огурец'] }
      ],
      "Tuesday": [
        { id: 'w2tu1', time: '06:30', cat: 'Food', title: 'Завтрак: Овсянка + Груша', details: ['Oatmeal 0.5 cup', 'Молоко', 'Нарезанная груша'] },
        { id: 'w2tu2', time: '14:00', cat: 'Food', title: 'Обед: Говядина + Кускус', details: ['Ground Beef: 150г', 'Couscous: 1 cup', 'Спаржевая фасоль'] },
        { id: 'w2tu3', time: '16:00', cat: 'Food', title: 'Перекус', details: ['Ягоды или Орехи (горсть)'] },
        { id: 'w2tu4', time: '16:45', cat: 'Food', title: 'Ужин: Стейк + Салат', details: ['Lean Steak: 150г', 'МНОГО зелени', 'Болгарский перец'] }
      ],
      "Wednesday": [
         { id: 'w2w1', time: '12:30', cat: 'Food', title: 'Обед: Киноа + Рыба', details: ['Cod Fillet (Треска): 200г', 'Quinoa: 1 cup', 'Брокколи'] },
         { id: 'w2w2', time: '15:00', cat: 'Food', title: 'Перекус', details: ['1 Груша'] },
         { id: 'w2w3', time: '18:00', cat: 'Food', title: 'Ужин: Салат с индейкой', details: ['Индейка слайсы: 150г', 'Spring Mix', 'Половина авокадо'] }
      ],
      "Thursday": [
         { id: 'w2th1', time: '06:30', cat: 'Food', title: 'Завтрак: Овсянка', details: ['Oatmeal 0.5 cup', 'Молоко', 'Банан'] },
         { id: 'w2th2', time: '14:00', cat: 'Food', title: 'Обед: Кускус + Курица', details: ['Chicken: 150г', 'Couscous: 1 cup', 'Перец и кабачки'] },
         { id: 'w2th3', time: '17:00', cat: 'Gym', title: 'W2: PUSH DAY', details: ['Dumbbell Press 3x12', 'Lateral Raises 3x15', 'Dips 3x max'] }
      ],
      "Friday": [
         { id: 'w2fr1', time: '13:15', cat: 'Food', title: 'Обед: Хлебцы + Говядина', details: ['3 хлебца', 'Ground Beef 150г', 'Огурец'] },
         { id: 'w2fr2', time: '15:30', cat: 'Food', title: 'Перекус', details: ['Грейпфрут'] },
         { id: 'w2fr3', time: '14:00', cat: 'Gym', title: 'W2: PULL DAY', details: ['Pullups max', 'Seated Row 3x12', 'Facepulls 3x15'] }
      ],
      "Saturday": [
         { id: 'w2sa1', time: '10:00', cat: 'Gym', title: 'W2: LEG DAY', details: ['Squats 3x10', 'Lunges 3x12', 'Calf Raises 3x20'] },
         { id: 'w2sa2', time: '18:00', cat: 'Food', title: 'CHEAT MEAL', details: ['Sushi (Роллы)', 'Miso Soup'] }
      ],
      "Sunday": [
         { id: 'w2su1', time: '12:30', cat: 'Food', title: 'Обед: Фиш-дей', details: ['Salmon: 200г', 'Запеченные овощи', '1 Батат'] },
         { id: 'w2su2', time: '14:00', cat: 'Gym', title: 'W2: CARDIO', details: ['30 min Run', '15 min Swim/Stretching'] }
      ]
    }
  }
};

const MotivationPopup = ({ text, onClose }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 animate-fadeIn backdrop-blur-md">
    <div className="bg-gray-800 border-2 border-yellow-500 rounded-3xl p-8 w-full max-w-sm text-center shadow-[0_0_60px_rgba(234,179,8,0.4)] relative">
      <p className="text-sm font-black text-yellow-500 mb-2 uppercase tracking-[0.2em]">Chuck Norris Fact</p>
      <p className="text-xl font-black italic text-white mb-8 italic">"{text}"</p>
      <button onClick={onClose} className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-yellow-400 transition-all">ПОГНАЛИ ДАЛЬШЕ</button>
    </div>
  </div>
);

const TaskCard = ({ task, isDone, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const borderClass = task.cat === 'Gym' ? 'border-red-500 shadow-[inset_10px_0_15px_-10px_rgba(239,68,68,0.2)]' : task.cat === 'Food' ? 'border-green-500 shadow-[inset_10px_0_15px_-10px_rgba(34,197,94,0.2)]' : 'border-blue-500 shadow-[inset_10px_0_15px_-10px_rgba(59,130,246,0.2)]';
  const icon = task.cat === 'Gym' ? '💪' : task.cat === 'Food' ? '🥗' : '💤';
  return (
    <div className={`bg-gray-800/70 rounded-3xl overflow-hidden border border-gray-700/30 transition-all duration-300 ${isDone ? 'opacity-30 grayscale' : 'shadow-xl'}`}>
      <div className={`p-5 flex items-center justify-between border-l-[6px] ${borderClass} cursor-pointer`} onClick={() => setIsOpen(!isOpen)}>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black bg-gray-700/80 px-2.5 py-0.5 rounded text-gray-300 tracking-tighter">{task.time}</span>
            <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{task.cat}</span>
          </div>
          <h3 className={`text-lg font-black tracking-tight leading-tight ${isDone ? 'line-through text-gray-500' : 'text-white'}`}>{task.title}</h3>
        </div>
        <button onClick={(e) => { e.stopPropagation(); onToggle(task.id); }} className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all ${isDone ? 'bg-green-500 border-green-500 scale-90' : 'border-gray-600 active:scale-95'}`}>
          <span className="text-xl">{isDone ? '✓' : icon}</span>
        </button>
      </div>
      {isOpen && (
        <div className="bg-gray-900/50 px-5 py-4 border-t border-gray-700/20">
          <ul className="space-y-2">
            {task.details.map((d, i) => <li key={i} className="text-xs font-bold text-gray-400 flex items-start gap-2.5"><span className="text-yellow-500 mt-1">•</span>{d}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('Today');
  const [currentWeek, setCurrentWeek] = useState(() => localStorage.getItem('spartanWeek') || 'week1');
  const [unit, setUnit] = useState(() => localStorage.getItem('spartanUnit') || 'kg');
  const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [today, setToday] = useState(daysMap[new Date().getDay()]);
  const [checkedItems, setCheckedItems] = useState(() => JSON.parse(localStorage.getItem('spartanProgress') || '{}'));
  const [weightData, setWeightData] = useState(() => JSON.parse(localStorage.getItem('spartanWeight')) || [{date: '14.02', weight: 85}]);
  const [disciplineData, setDisciplineData] = useState(() => JSON.parse(localStorage.getItem('spartanDiscipline')) || []);
  const [newWeight, setNewWeight] = useState('');
  const [chuckJoke, setChuckJoke] = useState(null);

  // Хранение данных (LocalStorage)
  useEffect(() => {
    localStorage.setItem('spartanWeek', currentWeek);
    localStorage.setItem('spartanUnit', unit);
    localStorage.setItem('spartanProgress', JSON.stringify(checkedItems));
    localStorage.setItem('spartanWeight', JSON.stringify(weightData));
    localStorage.setItem('spartanDiscipline', JSON.stringify(disciplineData));
  }, [currentWeek, unit, checkedItems, weightData, disciplineData]);

  const tasks = megaDatabase[currentWeek].schedule[today] || [];
  const progress = tasks.length ? Math.round((tasks.filter(t => checkedItems[t.id]).length / tasks.length) * 100) : 0;

  // Обновление графика дисциплины
  useEffect(() => {
    const todayDate = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    setDisciplineData(prev => {
      const filtered = prev.filter(d => d.date !== todayDate);
      return [...filtered, { date: todayDate, score: progress }].slice(-10);
    });
  }, [progress]);

  const handleAddWeight = () => {
    if(!newWeight) return;
    const date = new Date().toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    setWeightData([...weightData, { date, weight: parseFloat(newWeight) }]);
    setNewWeight('');
    confetti({ particleCount: 100, spread: 50 });
  };

  const toggleCheck = async (id) => {
    const isChecking = !checkedItems[id];
    setCheckedItems(prev => ({ ...prev, [id]: isChecking }));
    if (isChecking) {
      try {
        const res = await fetch('https://api.chucknorris.io/jokes/random');
        const json = await res.json();
        setChuckJoke(json.value);
      } catch (e) { setChuckJoke("Chuck Norris approved your workout."); }
    }
  };

  useEffect(() => {
    if (progress === 100 && tasks.length > 0) {
      confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
    }
  }, [progress, tasks.length]);

  return (
    <div className="h-screen bg-gray-900 text-white font-sans flex flex-col overflow-hidden">
      {/* HEADER */}
      <div className="p-6 bg-gray-900 border-b border-gray-800 flex-shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 uppercase tracking-tighter">СПАРТАНЕЦ</h1>
          <div className="flex gap-2">
            <div className="flex bg-gray-800 rounded-xl p-1 border border-gray-700">
              <button onClick={() => setUnit('kg')} className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${unit === 'kg' ? 'bg-green-500 text-black' : 'text-gray-500'}`}>KG</button>
              <button onClick={() => setUnit('lb')} className={`px-3 py-1 text-[10px] font-black rounded-lg transition-all ${unit === 'lb' ? 'bg-green-500 text-black' : 'text-gray-500'}`}>LB</button>
            </div>
            <div className="flex bg-gray-800 rounded-xl p-1 border border-gray-700 text-[10px] font-black">
              <button onClick={() => setCurrentWeek('week1')} className={`px-3 py-1 rounded-lg ${currentWeek === 'week1' ? 'bg-orange-500 text-white' : 'text-gray-500'}`}>W1</button>
              <button onClick={() => setCurrentWeek('week2')} className={`px-3 py-1 rounded-lg ${currentWeek === 'week2' ? 'bg-orange-500 text-white' : 'text-gray-500'}`}>W2</button>
            </div>
          </div>
        </div>
        
        {activeTab === 'Today' && (
          <>
            <div className="flex justify-between items-end mb-2">
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">{today}</p>
              <p className="text-2xl font-black">{progress}%</p>
            </div>
            <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
              <div className="h-full bg-orange-500 transition-all duration-1000 shadow-[0_0_15px_rgba(249,115,22,0.4)]" style={{ width: `${progress}%` }}></div>
            </div>
          </>
        )}
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {activeTab === 'Today' && (
          <div className="p-4 space-y-4">
            {tasks.map(task => <TaskCard key={task.id} task={task} isDone={!!checkedItems[task.id]} onToggle={toggleCheck} />)}
          </div>
        )}

        {activeTab === 'Prep' && (
          <div className="p-4 space-y-6 pb-44 no-scrollbar">
            <h2 className="text-2xl font-black text-center uppercase italic text-orange-500 underline underline-offset-8">Meal Prep: {currentWeek}</h2>
            <div className="bg-gray-800 rounded-3xl p-6 border-l-8 border-yellow-500 shadow-xl">
              <h3 className="font-black mb-4 uppercase text-sm tracking-widest text-white underline">🛒 H-E-B List (English / Русский)</h3>
              <ul className="space-y-3 text-sm text-gray-300 font-bold italic">
                {megaDatabase[currentWeek].prep.shopping.map((item, i) => <li key={i} className="flex items-center gap-2 underline decoration-gray-700 underline-offset-4"><span className="text-yellow-500">•</span>{item}</li>)}
              </ul>
            </div>
            <div className="bg-gray-800 rounded-3xl p-6 border-l-8 border-red-500 shadow-xl">
              <h3 className="font-black mb-4 uppercase text-sm tracking-widest text-red-400 underline decoration-red-900">🔥 Инструкции по готовке</h3>
              <ul className="space-y-3 text-xs text-gray-300 font-bold uppercase leading-relaxed">
                {megaDatabase[currentWeek].prep.instructions.map((item, i) => <li key={i} className="flex items-start gap-2 border-b border-gray-700 pb-2"><span className="text-red-500 mt-1">⚡</span>{item}</li>)}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'Progress' && (
          <div className="p-4 space-y-6 pb-44">
             <h2 className="text-2xl font-black text-center uppercase italic">Correlation & Stats</h2>
             
             {/* ГРАФИК 1: ВЕС (Unit Switchable) */}
             <div className="bg-gray-800 rounded-3xl p-4 border border-gray-700 shadow-2xl">
              <p className="text-[10px] font-black uppercase text-gray-500 mb-4 text-center">Body Weight Dynamics ({unit})</p>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis domain={['dataMin - 2', 'dataMax + 2']} stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '15px' }} />
                    <Line type="monotone" dataKey="weight" stroke="#10B981" strokeWidth={5} dot={{ r: 5, fill: '#10B981' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

             {/* ГРАФИК 2: ДИСЦИПЛИНА (% Выполнения) */}
             <div className="bg-gray-800 rounded-3xl p-4 border border-gray-700 shadow-2xl">
              <p className="text-[10px] font-black uppercase text-gray-500 mb-4 text-center">Discipline Correlation (% Tasks Done)</p>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={disciplineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                    <XAxis dataKey="date" stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} stroke="#9CA3AF" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '15px' }} />
                    <Line type="stepAfter" dataKey="score" stroke="#F59E0B" strokeWidth={5} dot={{ r: 5, fill: '#F59E0B' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* INPUT WEIGHT */}
            <div className="bg-gray-800 rounded-3xl p-6 border border-gray-700 flex flex-col items-center gap-4">
              <p className="text-xs font-black uppercase text-gray-500 tracking-widest">Добавить замер ({unit})</p>
              <div className="flex gap-2 w-full">
                <input 
                  type="number" step="0.1" value={newWeight} onChange={(e) => setNewWeight(e.target.value)} 
                  placeholder={`Ваш вес в ${unit}`} 
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-2xl px-4 py-3 font-black text-center focus:border-orange-500 outline-none"
                />
                <button onClick={handleAddWeight} className="bg-green-500 text-black px-8 rounded-2xl font-black hover:bg-green-400 active:scale-95 transition-all">OK</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="bg-gray-900 border-t border-gray-800 flex-shrink-0 shadow-[0_-10px_40px_rgba(0,0,0,0.8)]">
        <div className="flex overflow-x-auto no-scrollbar border-b border-gray-800/30">
          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((d, i) => {
            const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
            return (
              <button key={d} onClick={() => { setToday(dayNames[i]); setActiveTab('Today'); }} 
                className={`flex-1 min-w-[55px] py-4 text-[10px] font-black transition-all ${today === dayNames[i] && activeTab === 'Today' ? 'text-yellow-500 bg-gray-800/50' : 'text-gray-500'}`}
              >
                {d}
              </button>
            )
          })}
        </div>
        <div className="flex h-16 uppercase italic">
          <button onClick={() => setActiveTab('Today')} className={`flex-1 font-black text-[10px] tracking-widest ${activeTab === 'Today' ? 'text-white bg-gray-800/40' : 'text-gray-600'}`}>Dashboard</button>
          <button onClick={() => setActiveTab('Prep')} className={`flex-1 font-black text-[10px] tracking-widest ${activeTab === 'Prep' ? 'text-orange-500 bg-gray-800/40' : 'text-gray-600'}`}>Meal Prep</button>
          <button onClick={() => setActiveTab('Progress')} className={`flex-1 font-black text-[10px] tracking-widest ${activeTab === 'Progress' ? 'text-green-500 bg-gray-800/40' : 'text-gray-600'}`}>Stats</button>
        </div>
      </div>

      {chuckJoke && <MotivationPopup text={chuckJoke} onClose={() => setChuckJoke(null)} />}
    </div>
  );
}