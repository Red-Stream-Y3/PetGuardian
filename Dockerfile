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
ENV MONGO_URI=mongodb+srv://user:user123@petapp.iiznqch.mongodb.net/pet?retryWrites=true&w=majority
ENV MONGO_URI_DEV=mongodb+srv://user:user123@petapp.iiznqch.mongodb.net/pet
ENV JWT_SECRET=redstream
ENV BRAINTREE_MERCHANT_ID=sxd9nrwy2bwkr8m3
ENV BRAINTREE_PUBLIC_KEY=43z3f2763gncwm8v
ENV BRAINTREE_PRIVATE_KEY=768b1b9f5f56d6935990d317d8faa3d7

EXPOSE 4444
CMD ["npm", "start"]