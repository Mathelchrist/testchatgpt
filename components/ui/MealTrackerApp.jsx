import { useEffect, useState } from "react";

const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

export default function MealTrackerApp() {
  const [completedMeals, setCompletedMeals] = useState({ meal1: false, meal2: false });
  const [notes, setNotes] = useState("");
  const [calendar, setCalendar] = useState(() => {
    const saved = localStorage.getItem("mealCalendar");
    return saved ? JSON.parse(saved) : daysOfWeek.reduce((acc, day) => ({ ...acc, [day]: false }), {});
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("mealHistory");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const savedNotes = localStorage.getItem("mealNotes");
    if (savedNotes) setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem("mealNotes", notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("mealCalendar", JSON.stringify(calendar));
  }, [calendar]);

  useEffect(() => {
    localStorage.setItem("mealHistory", JSON.stringify(history));
  }, [history]);

  const toggleMeal = (meal) => {
    setCompletedMeals({ ...completedMeals, [meal]: !completedMeals[meal] });
  };

  const toggleDay = (day) => {
    const updatedCalendar = { ...calendar, [day]: !calendar[day] };
    setCalendar(updatedCalendar);
    if (!calendar[day]) {
      const today = new Date().toLocaleDateString();
      setHistory((prev) => [...prev, { day, date: today }]);
    }
  };

  const handleNoteChange = (e) => setNotes(e.target.value);

  const mealPlan = {
    meal1: {
      title: "Repas 1 (midi)",
      items: [
        "150 g riz basmati cru",
        "150 g aiguillettes de poulet Fleury Michon",
        "10 g huile d’olive",
        "15 g ketchup Heinz",
        "150 g courgettes vapeur",
        "80 g lentilles en conserve",
        "1 banane"
      ]
    },
    meal2: {
      title: "Repas 2 (soir)",
      items: [
        "150 g riz basmati cru",
        "150 g aiguillettes de poulet Fleury Michon",
        "10 g huile d’olive",
        "15 g ketchup Heinz",
        "150 g haricots verts vapeur",
        "80 g lentilles en conserve",
        "1 carré de chocolat noir 90%"
      ]
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center' }}>Mon Plan Alimentaire Quotidien</h1>

      {Object.entries(mealPlan).map(([key, meal]) => (
        <div key={key} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '16px', margin: '16px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600' }}>{meal.title}</h2>
            <button onClick={() => toggleMeal(key)} style={{ padding: '6px 12px' }}>
              {completedMeals[key] ? "Fait" : "À faire"}
            </button>
          </div>
          <ul>
            {meal.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Notes du jour</h3>
        <input
          type="text"
          value={notes}
          onChange={handleNoteChange}
          placeholder="Ajoute tes remarques ici..."
          style={{ width: '100%', padding: '8px', marginTop: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Suivi Hebdomadaire</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
          {daysOfWeek.map((day) => (
            <button key={day} onClick={() => toggleDay(day)} style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: calendar[day] ? '#d1fae5' : '#fff'
            }}>
              {calendar[day] ? `✔️ ${day}` : day}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600' }}>Historique des jours cochés</h3>
        <ul style={{ paddingLeft: '20px' }}>
          {history.map((entry, index) => (
            <li key={index}>{entry.day} — {entry.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
