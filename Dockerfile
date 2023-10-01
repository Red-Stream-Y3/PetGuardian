FROM node:18-slim
WORKDIR /app

#copy package.json and package-lock.json from backend folder to /app
COPY backend/package*.json ./

#install dependencies
RUN npm install

#copy backend folder to /app
COPY backend/ ./

#set environment variables
ENV PORT=4444
ENV NODE_ENV=production

EXPOSE 4444
CMD ["npm", "start"]