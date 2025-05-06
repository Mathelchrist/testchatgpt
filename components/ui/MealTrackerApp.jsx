import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

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
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">Mon Plan Alimentaire Quotidien</h1>

      {Object.entries(mealPlan).map(([key, meal]) => (
        <Card key={key} className="border">
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">{meal.title}</h2>
              <Button onClick={() => toggleMeal(key)} variant={completedMeals[key] ? "secondary" : "default"}>
                {completedMeals[key] ? "Fait" : "À faire"}
              </Button>
            </div>
            <ul className="list-disc list-inside">
              {meal.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Notes du jour</h3>
        <Input value={notes} onChange={handleNoteChange} placeholder="Ajoute tes remarques ici..." />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Suivi Hebdomadaire</h3>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {daysOfWeek.map((day) => (
            <Button key={day} onClick={() => toggleDay(day)} variant={calendar[day] ? "secondary" : "outline"}>
              {calendar[day] ? `✔️ ${day}` : day}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Historique des jours cochés</h3>
        <ul className="list-disc list-inside">
          {history.map((entry, index) => (
            <li key={index}>{entry.day} — {entry.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
