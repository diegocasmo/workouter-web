# [Workouter](https://workouterweb.herokuapp.com/)

Create and execute custom interval training style workouts.

### Installation
  - Run `yarn install` to install dependencies
  - Run `yarn start` to start the app in development mode

### Testing
  - Run `yarn test` to run the test watcher in an interactive mode
    - By default, runs tests related to files changed since the last commit

### Heroku deployment
  - Run the following commands to deploy the app to Heroku:
    - These commands assume you have added the Heroku app remote (i.e., `heroku git:remote -a workouterweb`)
``` bash
heroku maintenance:on -a workouterweb
git push heroku master
heroku maintenance:off -a workouterweb
```
