# Ng2DaterangePickerBfork

[![npm version](https://badge.fury.io/js/ng2-daterange-picker-bfork.svg)](https://badge.fury.io/js/ng2-daterange-picker-bfork)

Forked with :heart: from [albertnadal](https://github.com/albertnadal/ng2-daterange-picker)

## Using the component

```
<!-- Calendar with all the features -->
<app-daterange-picker
  [startDate]="startDate"
  [endDate]="endDate"
  [dateFormat]="'YYYY/DD/MM'"
  [rangeStart]="rangeStart"
  [rangeEnd]="rangeEnd"
  [dateTest]="dateTest"
  [ranges]="ranges"
  ></app-daterange-picker>

<!-- Minimal Calendar -->
<app-daterange-picker
  [dateFormat]="'YYYY/DD/MM'"
  ></app-daterange-picker>
```

### dateFormat

`ng2-daterange-picker-bfork` uses moment for date validation and date formatting. `dateFormat` should follow the [moment format](https://momentjs.com/docs/#/displaying/format/).

### rangeEnd / rangeStart

Only allow input dates from a specified range (i.e. dates between January 1st, 2017 to January 1st, 2018).

### ranges 

Set of predefined ranges. Accepts an `array` of `objects`. Use the following format:

```
[
  {
    dateStart: startDate,
    dateEnd: endDate,
    name: 'Range Name'
  }
]
```

### dateTest

`dateTest` used to test the validity of a date. Here is an example function
which makes sure the start date doesn't come before the end date:

``` 
  public dateTest(startDate, endDate): Array<String> {
    const errorArray = [];
    if (endDate.valueOf() < startDate.valueOf()) {
      errorArray.push('Start date is greater than end date');
    }
    if (startDate.valueOf() < this.rangeStart || startDate.valueOf() > this.rangeEnd) {
      errorArray.push('Start date out of range');
    }
    if (endDate.valueOf() < this.rangeStart || endDate.valueOf() > this.rangeEnd) {
      errorArray.push('End date out of range');
    }
    return errorArray;
  }

```
# Developing

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Installing a local version into another angular project

- `$ npm run build:lib` (This will generate a compiled component in the `dist` directory)
- Navigate to the `dist` directory
- `$ npm pack` (packages the component into a tar ball)
- Navigate to another angular project.
- `$ npm install ../ng2-daterange-picker-bfork/dist/ng2-daterange-picker-bfork-x.x.x.tgz` (be sure to change the version number at the end)
