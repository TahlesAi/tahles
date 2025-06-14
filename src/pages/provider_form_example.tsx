
// src/pages/join-as-provider.tsx
import React from "react";

export default function JoinAsProvider() {
  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">הצטרפות כספק לתכל'ס</h1>
      <form className="grid gap-4">
        <input type="text" placeholder="שם מלא" className="p-2 border rounded" required />
        <input type="email" placeholder="דוא״ל" className="p-2 border rounded" required />
        <input type="tel" placeholder="טלפון" className="p-2 border rounded" required />
        <input type="text" placeholder="שם העסק" className="p-2 border rounded" />
        <select className="p-2 border rounded">
          <option>בחר קטגוריה</option>
          <option>לוקיישן</option>
          <option>מזון ומשקאות</option>
          <option>הרצאות והכשרות</option>
          <option>שירותי הפקה</option>
          <option>אטרקציות</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">שלח</button>
      </form>
    </div>
  );
}
