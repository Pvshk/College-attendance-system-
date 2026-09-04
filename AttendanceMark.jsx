import { useState } from "react";
import { saveAttendance } from "../firebase/attendanceService";
import { auth } from "../firebase/config";

// students prop = [{ id, name, roll }, ...] — हे तुम्ही Firestore च्या
// "classes/{classId}/students" मधून आधी वाचून इथे pass कराल.
export default function AttendanceMark({ classId, subject, students }) {
  const todayStr = new Date().toISOString().split("T")[0];
  const [present, setPresent] = useState(new Set());
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggle(studentId) {
    setPresent((prev) => {
      const next = new Set(prev);
      next.has(studentId) ? next.delete(studentId) : next.add(studentId);
      return next;
    });
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    const records = {};
    students.forEach((s) => {
      records[s.id] = present.has(s.id) ? "present" : "absent";
    });

    await saveAttendance({
      classId,
      subject,
      dateStr: todayStr,
      records,
      markedByUid: auth.currentUser?.uid,
    });

    setSaving(false);
    setSaved(true);
  }

  return (
    <div>
      <h2>{subject} — {todayStr}</h2>

      <ul>
        {students.map((s) => (
          <li key={s.id}>
            <span>{s.name} ({s.roll})</span>
            <button onClick={() => toggle(s.id)}>
              {present.has(s.id) ? "Present" : "Mark present"}
            </button>
          </li>
        ))}
      </ul>

      <p>{present.size} / {students.length} present</p>

      <button onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save attendance"}
      </button>
      {saved && <p>Attendance saved for {todayStr}.</p>}
    </div>
  );
}
