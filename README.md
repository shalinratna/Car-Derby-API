# 🏎️ Car Derby API

## Commands

```bash
# install deps
npm install

# running locally
npm run dev

# build
npm run gcp-build

# deploy
npm run deploy
```

By default, this application deploys to [App Engine Standard][appengine]. _(Recommended)_
Deploy to App Engine Flexible by [modifying `app.yaml`][app_yaml].

[appengine]: https://cloud.google.com/appengine/docs/standard/nodejs
[app_yaml]: https://cloud.google.com/appengine/docs/flexible/nodejs/configuring-your-app-with-app-yaml
[tutorial]: https://cloud.google.com/appengine/docs/standard/nodejs/quickstart
[contributing]: https://github.com/GoogleCloudPlatform/nodejs-docs-samples/blob/main/CONTRIBUTING.md

## Documentation

- `index.ts`
  - Entry point for the application
  - Instantiations all controllers which all take an app and a database instance
- `x.controller`
  - Creates an instance of the corresponding service
  - Mutates the `app` instance to bind all routes to service methods
  - Each method validates the incoming data and calls the corresponding service method
- `x.service`
  - Contains all the business logic for the corresponding controller
  - Gets data from or saves data to the database
  - Returns some result back to the controller
