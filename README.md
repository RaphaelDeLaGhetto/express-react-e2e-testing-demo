# express-react-e2e-testing-demo

Express/React demo with Jasmine/Zombie end-to-end tests

# Setup

Clone and install dependencies:

```
npm install
```

# Testing

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

## Execute

```
npm test
```

# Development

To start a Dockerized Mongo container, see above...

Seed database:

```
node seed.js
```

Run server:

```
npm start
```


