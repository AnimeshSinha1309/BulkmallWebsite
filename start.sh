sudo systemctl start mongod
cd backend
npm run start &
cd ..
cd frontend
npm run start &
cd ..