docker run --name contact-keeper-frontend \
  -p 3000:3000 \
  -d \
  --env-file ./.env \
  contact-keeper-react 