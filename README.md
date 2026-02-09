# Daily Mood Flower Journal 🌸

ระบบบันทึกอารมณ์ประจำวัน พัฒนาโดยใช้ React และ Node.js  
ออกแบบให้รองรับผู้ใช้หลายคน และการ Deploy บน Cloud

---

## ✅ System Stack
- Frontend: React
- Backend: Node.js + Express
- Container: Docker
- Infra: Terraform
- Orchestration: Kubernetes

---

## ✅ Category Coverage

**1️⃣ Concurrency**  
Backend API รองรับผู้ใช้หลายคนพร้อมกัน

**2️⃣ Docker**  
Backend บรรจุอยู่ใน Docker Container

**3️⃣ Git**  
ควบคุมเวอร์ชันด้วย Git และ GitHub

**4️⃣ Terraform**  
ใช้ Terraform สร้าง Infrastructure อัตโนมัติ

**5️⃣ Pub/Sub**  
ใช้ระบบ Pub/Sub สำหรับส่งข้อมูลระหว่างบริการ

**6️⃣ Load Balancer**  
ใช้ Kubernetes Service แบบ LoadBalancer

**7️⃣ Kubernetes (K8s)**  
จัดการ Container และรองรับการ Scaling

**8️⃣ Backup**  
สำรองข้อมูลเป็นไฟล์ JSON

**9️⃣ Security**  
ป้องกัน API ด้วย API Key และ CORS

**🔟 Multiusers**  
รองรับผู้ใช้หลายคนผ่าน API

---

## 🚀 Run Project

```bash
# Backend
cd backend
npm install
node index.js

# Frontend
npm install
npm run dev

"# Project-Dailly-Mood" 
## Deployment Architecture
- Frontend: Cloud Run
- Backend API: Cloud Run (Express.js)
- Background Job: Cloud Functions + Cloud Scheduler
- Database: Firestore

## Data Persistence
All user data is stored in Firestore, ensuring persistence across devices.
