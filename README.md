# Daily Mood Journal 🌸

เว็บแอปพลิเคชันสำหรับบันทึกอารมณ์ประจำวัน  
พัฒนาเพื่อรองรับผู้ใช้หลายคน และใช้งานบน Cloud แบบ Serverless

## Architecture
- Frontend: React (Cloud Run)
- Backend API: Node.js (Cloud Run)
- Database: Firestore
- Backup: Firestore Export → Cloud Storage
- Automation: Cloud Scheduler + Cloud Function
- Container: Docker
- Version Control: GitHub

## Key Features
- บันทึกอารมณ์รายวัน
- ดูสรุปอารมณ์ย้อนหลัง 30 วัน
- รองรับผู้ใช้หลายคน
- ระบบ Backup อัตโนมัติ
- Health Check ด้วย Cloud Scheduler

## Security
- API Key Protection
- IAM-based access control
- Cloud Run security configuration

## Deployment
- Build Docker Image
- Push to Artifact Registry
- Deploy to Cloud Run

## Repository
- Frontend / Backend แยกส่วนชัดเจน

## How To
- git clone https://github.com/6710110429/Daily-Mood.git
- code .
- cd Daily-Mood
- npm install
- npm run dev

