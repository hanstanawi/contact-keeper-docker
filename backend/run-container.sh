docker run --name contact-keeper-backend \
  -p 5000:5000 \
  -d \
  --rm \
  --env-file ./config/config.env \
  contact-keeper-node