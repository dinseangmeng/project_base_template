FROM node:14-alpine

WORKDIR /app

COPY . .
RUN npm install prisma@latest @prisma/client@latest
RUN npm install
# RUN npx prisma init
# RUN npx prisma generate
# RUN npx prisma migrate reset
# COPY . .


EXPOSE 3000
RUN npm run build

CMD ["npm", "run", "start:dev"]