कॉलेज Attendance System — Firebase Demo
Data कुठे साठतं
Firebase चा Firestore — Google चा cloud database. यात 3 मुख्य collections:
users/{uid}
  - name, role ("admin" | "faculty" | "student"), rollNo, classId

classes/{classId}
  - name, subject, facultyId
  classes/{classId}/students/{studentId}
    - name, roll

attendance/{classId_date}          उदा: "CS301_2026-09-04"
  - classId, subject, date
  - records: { studentId: "present" | "absent" }
  - markedBy (uid), markedAt (timestamp)
एका दिवसाच्या एका क्लासच्या attendance साठी एकच डॉक्युमेंट (classId_date अशा ID ने) — त्यामुळे चुकून दोनदा सेव्ह झालं तरी ओव्हरराईट होतं, डुप्लिकेट एंट्री तयार होत नाही.
हे टेस्ट कुठे करायचं
तुमच्या PC वर (गरज: Node.js आधी install करा):
सगळ्या फाईल्स एका फोल्डरमध्ये (attendance-app) ठेवा — वरचा structure तसाच ठेवा (src/components/, src/firebase/ इत्यादी).
त्या फोल्डरमध्ये टर्मिनल उघडून: npm install
मग: npm run dev
टर्मिनलमध्ये दिसणारी लिंक (उदा. http://localhost:5173) ब्राउझरमध्ये उघडा.
सुरुवातीला Firebase config भरलेली नसल्यामुळे attendance mark करता येईल पण "Save" दाबल्यावर एरर येईल — ते सामान्य आहे, आधी खालचं Firebase Setup पूर्ण करा, मग Save काम करेल.
Setup (पहिल्यांदा)
console.firebase.google.com वर जाऊन नवीन प्रोजेक्ट बनवा (मोफत).
डाव्या मेनूत Build > Authentication → Email/Password enable करा.
Build > Firestore Database → Create database (test mode ने सुरुवात करा, नंतर firestore.rules ही फाईल तिथे paste करा).
Project settings > Your apps > Web app मधून config copy करून src/firebase/config.js मध्ये टाका.
लोकल मशीनवर:
npm install firebase
npm run dev
पुढचं पाऊल
AttendanceMark.jsx सारखेच TeacherDashboard, StudentView, आणि AdminReports components बनवायचे (सांगा, पुढच्या वेळी बनवून देतो).
नंतर कॉलेजची परवानगी मिळाली की फक्त attendanceService.js मधले functions बदलून (Firestore ऐवजी कॉलेजच्या API ला call) बाकी सगळा UI तसाच ठेवता येतो — हाच फायदा आहे data-layer वेगळं ठेवण्याचा.
