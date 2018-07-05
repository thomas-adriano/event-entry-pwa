// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCO2M1xPbqk1n5-2itoHIhMAKyrUZf93fA',
    authDomain: 'sam-kickoff2018.firebaseapp.com',
    databaseURL: 'https://sam-kickoff2018.firebaseio.com',
    projectId: 'sam-kickoff2018',
    storageBucket: 'sam-kickoff2018.appspot.com',
    messagingSenderId: '131427341558'
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
