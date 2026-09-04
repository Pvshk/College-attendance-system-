import AttendanceMark from "./components/AttendanceMark";

// टेस्ट करण्यासाठी sample students — नंतर हे Firestore च्या
// "classes/{classId}/students" मधून प्रत्यक्ष वाचू.
const sampleStudents = [
  { id: "s1", name: "Aarav Sharma", roll: "CS21" },
  { id: "s2", name: "Priya Nair", roll: "CS22" },
  { id: "s3", name: "Rohan Mehta", roll: "CS23" },
  { id: "s4", name: "Sneha Kulkarni", roll: "CS24" },
];

export default function App() {
  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <AttendanceMark classId="CS301" subject="Data Structures" students={sampleStudents} />
    </div>
  );
}
