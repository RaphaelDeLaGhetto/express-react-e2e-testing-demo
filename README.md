# express-react-e2e-testing-demo

Express/React demo with Jasmine/Zombie end-to-end tests

# Development

Clone and install dependencies:

```
git clone git@libertyseeds.ca:/opt/git/accountant.git
cd accountant && npm install
```

## For Docker fans

Start a MongoDB development server:

```
docker run --name dev-mongo -p 27017:27017 -d mongo
```

Once created, you can start and stop the container like this:

```
docker stop dev-mongo
docker start dev-mongo
```

Seed database:

```
node seed.js
```


