# 1) เลือก Node เวอร์ชัน
FROM node:18

# 2) โฟลเดอร์ทำงานใน container
WORKDIR /app

# 3) คัดลอกไฟล์ package เพื่อ install ก่อน (เร็วขึ้น)
COPY package*.json ./

# 4) ติดตั้ง dependencies
RUN npm install

# 5) คัดลอกโค้ดทั้งหมดเข้า container
COPY . .

# 6) เปิดพอร์ต 3000
EXPOSE 3000

# 7) คำสั่งรัน backend
CMD ["node", "index.js"]
