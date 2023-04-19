# Thunkable Projects App

This is a sample app for the Thunkable Projects app. It is a simple app that allows you to browse the projects on Thunkable 

For the sake of time, we are using file based data storage. This is not recommended for production apps. I will be updating this app to use data from thunkable.com in the future.

## Getting Started

### Prerequisites

This app is built using node.js and pnpm (a package manager for node.js). You can install node.js from [here](https://nodejs.org/en/). You can install pnpm from [here](https://pnpm.js.org/en/installation).

### Installing

To install the app, run the following commands:

```
git clone
cd thunkable
pnpm install
```

### Running the app

To run the app, run the following command:

```
pnpm dev
```

or use docker compose 

```
docker-compose up
```

### API used 

The app uses the following APIs:
``` GET /api/projects```
``` POST /api/projects/new``` 
``` DELETE /api/projects/:id ```
``` PUT /api/projects/:id```


