# API

The REST API is created using node js, and express.

## Setup
To setup the API do the following from within the API's folder.

### Without Docker
To setup the API without docker do the following:

1. Install the dependencies
```bash
npm install
```

2. Setup credentials
    1. Fill in the enviromental variables in the `example.env` file
    2. rename the `example.env` file to `.env`

3. Run the API
```bash
node index.js
```

### With Docker
To setup the API with docker do the following:

1. Setup credentials
    1. Fill in the enviromental variables in the `example.env` file
    2. rename the `example.env` file to `.env`

3. Create and run the docker container
```bash
docker build -t api .
docker run api
```

## Endpoints
Here is a list of the endpoints for the API.

Endpoint | Method | Description
--- | --- | ---
/api/polls | GET | List information on all polls.
/api/polls/`id` | GET | Get information on poll with id = `id`.
/api/polls/`id`/r | GET | Get information on results for poll with id = `id`.
