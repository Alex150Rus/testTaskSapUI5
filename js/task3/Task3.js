class Task3 {
  constructor() {
    this.tableWrapper = document.getElementById('task3');
    this.section = document.getElementById('section3');
    this.airports = 'js/task3/airports.json';
    this.flights = 'js/task3/flights.json';
    this.airportsArray = [];
    this.flightsArray = [];
    this.outputArrayOfObjects = [];
    this.flightNumber = 'Номер рейса';
    this.takeOffAirportCode = 'Код аэропорта вылета';
    this.landingAirportCode = 'Код аэропорта прилёта';
    this.airportName = 'Название';
    this.airportCode = 'Код';
    this.timezone = 'Тайм-зона';
    this.currentTimezoneMinGMT = 180;
    this.takeOffTime = 'Время вылета';
    this.landingTime = 'Время прилёта';
    this.flightTime = 'flightTime';
    this.columnsNameArray = [
      'Номер рейса',
      'Аэропорт вылета +\n название',
      'Аэропорт прилёта +\n название',
      'Время вылета',
      'Время прилёта',
      'Продолжительность рейса'
    ];
    this.filterTimesObject = {};
    this.fetchData();
  }

  render() {
    this.renderFilterPeriodHtml();
    this.renderTableHeader();
  }

  renderFilterPeriodHtml() {
    const divWrapperForInputsLabels = document.createElement('div');
    divWrapperForInputsLabels.setAttribute('id', 'divWrapper');

    this.section.insertBefore(divWrapperForInputsLabels, this.tableWrapper);

    const timeInput1 = document.createElement('input');
    timeInput1.setAttribute('type', 'time');
    timeInput1.setAttribute('id', 'timeBegins');

    const label1 = document.createElement('label');
    label1.setAttribute('for', 'timeBegins');
    label1.setAttribute('id', 'label1')
    label1.innerText = 'Фильтр по периоду с';

    const timeInput2 = document.createElement('input');
    timeInput2.setAttribute('type', 'time');
    timeInput2.setAttribute('id', 'timeEnds');

    const label2 = document.createElement('label');
    label2.setAttribute('for', 'timeEnds');
    label2.setAttribute('id', 'label2')
    label2.innerText = 'по';

    const divWrapperForInputsLabelsEl = document.getElementById('divWrapper');

    divWrapperForInputsLabelsEl.appendChild(label1);
    divWrapperForInputsLabelsEl.appendChild(timeInput1);
    divWrapperForInputsLabelsEl.appendChild(label2);
    divWrapperForInputsLabelsEl.appendChild(timeInput2);
    this.inputsAddEventListener();
  }

  inputsAddEventListener() {
    const divWrapperForInputsLabelsEl = document.getElementById('divWrapper');
    const inputTimeBegins = document.getElementById('timeBegins');
    const inputTimeEnds = document.getElementById('timeEnds');
    const filterTimesObject = this.filterTimesObject;
    divWrapperForInputsLabelsEl.addEventListener('change', (event) => {
      if (event.target.id == 'timeBegins') {
        filterTimesObject.timeStarts = inputTimeBegins.value;
        console.log(filterTimesObject);
      } else if (event.target.id == 'timeEnds') {
        filterTimesObject.timeEnds = inputTimeEnds.value;
        console.log(filterTimesObject);
      }
      this.filterTimesObject = filterTimesObject;
      this.renderTable();
    })
  }

  renderTableHeader() {
    const outputColumnsArray = this.columnsNameArray;
    const divWrapper = this.tableWrapper;
    for (let i = 0; i < 1; i++) {
      let thead = document.createElement('thead');
      divWrapper.appendChild(thead);
      for (let z = 0; z < outputColumnsArray.length; z++) {
        let td = document.createElement('td');
        td.innerText = outputColumnsArray[z];
        thead.appendChild(td);
      }
    }
  }

  renderTable() {
    let outputArrayOfObjects = this.outputArrayOfObjects.sort((a, b) => {
      if ((a[this.takeOffTime].slice(0, 2) * 60 + a[this.takeOffTime].slice(3, 6) >
        b[this.takeOffTime].slice(0, 2) * 60 + b[this.takeOffTime].slice(3, 6)) &&
        (a[this.landingTime].slice(0, 2) * 60 + a[this.landingTime].slice(3, 6) >
          b[this.landingTime].slice(0, 2) * 60 + b[this.landingTime].slice(3, 6))) {
        return 1
      }
      if ((a[this.takeOffTime].slice(0, 2) * 60 + a[this.takeOffTime].slice(3, 6) <
        b[this.takeOffTime].slice(0, 2) * 60 + b[this.takeOffTime].slice(3, 6)) &&
        (a[this.landingTime].slice(0, 2) * 60 + a[this.landingTime].slice(3, 6) <
          b[this.landingTime].slice(0, 2) * 60 + b[this.landingTime].slice(3, 6))) {
        return -1
      }
      return 0
    });
    if (this.filterOutputArrayOfObjects(this.outputArrayOfObjects, this.filterTimesObject))
      outputArrayOfObjects = this.filterOutputArrayOfObjects(this.outputArrayOfObjects, this.filterTimesObject);

    const cellsQty = this.columnsNameArray;
    const rowsQty = outputArrayOfObjects;
    const divWrapper = this.tableWrapper;

    for (let i = 0; i < rowsQty.length; i++) {
      let tr = document.createElement('tr');
      tr.setAttribute('id', 'tr3');
      divWrapper.appendChild(tr);
      for (let z = 0; z < cellsQty.length; z++) {
        let td = document.createElement('td');
        if (z == 0) {
          td.innerText = outputArrayOfObjects[i][this.flightNumber];
        }
        if (z == 1) {
          td.innerText = outputArrayOfObjects[i][this.takeOffAirportCode]
        }
        if (z == 2) {
          td.innerText = outputArrayOfObjects[i][this.landingAirportCode]
        }
        if (z == 3) {
          td.innerText = outputArrayOfObjects[i][this.takeOffTime]
        }
        if (z == 4) {
          td.innerText = outputArrayOfObjects[i][this.landingTime]
        }
        if (z == 5) {
          td.innerText = outputArrayOfObjects[i][this.flightTime]
        }
        tr.appendChild(td);
      }
    }
  }

  fetchData() {
    this.fetchAirports();
    console.log(this.airportsArray, this.flightsArray)
  }

  fetchAirports() {
    fetch(this.airports)
      .then(response => response.json())
      .then(fetchData => {
        for (let item of fetchData) {
          this.airportsArray.push(item);
        }
        this.fetchFlights();
        this.render();
      })
  }

  fetchFlights() {
    fetch(this.flights)
      .then(response => response.json())
      .then(fetchData => {
        for (let item of fetchData) {
          this.flightsArray.push(item)
        }
        this.createOutputArrayOfObjects();
      })
  }

  createOutputArrayOfObjects() {
    const airportsArray = this.airportsArray;
    const flightsArray = this.flightsArray

    const outputArrayOfObjects = [];
    for (let flight of flightsArray) {
      let timezone = 0;
      let timezoneDifferenceLandingAirport = 0;
      let timezoneDifferenceTakeOffAirport = 0;
      for (let airport of airportsArray) {
        if (flight[this.takeOffAirportCode] == airport[this.airportCode]) {
          flight[this.takeOffAirportCode] = flight[this.takeOffAirportCode] + ` (${airport[this.airportName]})`;
          timezoneDifferenceTakeOffAirport = airport[this.timezone];
        } else if (flight[this.landingAirportCode] == airport[this.airportCode]) {
          flight[this.landingAirportCode] = flight[this.landingAirportCode] + ` (${airport[this.airportName]})`;
          timezoneDifferenceLandingAirport = timezone = airport[this.timezone];
        }
      }

      flight[this.flightTime] = this.getFlightTime(flight[this.landingTime], flight[this.takeOffTime]);

      flight[this.takeOffTime] = this.transferTakeOffTime(flight[this.takeOffTime]);
      flight[this.landingTime] = this.transferLandingTime(flight[this.landingTime], timezone);

      console.log(timezoneDifferenceLandingAirport - timezoneDifferenceTakeOffAirport)

      outputArrayOfObjects.push(flight);
    }
    this.outputArrayOfObjects = outputArrayOfObjects;
    console.log(outputArrayOfObjects)

    this.renderTable();
  }

  transferTakeOffTime(time) {
    let dateTakeOff = new Date(time);
    let takeOffHour = dateTakeOff.getHours();
    time = `${takeOffHour}:` + dateTakeOff.getMinutes();
    return time;
  }

  transferLandingTime(time, timezone) {
    let dateLanding = new Date(time);
    let landingHourLocal = dateLanding.getHours() + (timezone - this.currentTimezoneMinGMT) / 60;
    if (landingHourLocal > 23) {
      landingHourLocal = landingHourLocal - 24;
    }
    if (landingHourLocal <10) {
      landingHourLocal = 0 + `${landingHourLocal}`;
    }
    time = `${landingHourLocal}:` + dateLanding.getMinutes();
    console.log(landingHourLocal);
    return time;
  }

  getFlightTime(landingTime, takeOffTime) {
    let hoursOfFlight = (new Date(landingTime)).getHours() - (new Date(takeOffTime)).getHours();
    if (hoursOfFlight < 0) {
      hoursOfFlight = 24 + hoursOfFlight;
    }

    let minutesOfFlight = (new Date(landingTime)).getMinutes() - (new Date(takeOffTime)).getMinutes();
    if (minutesOfFlight < 0) {
      hoursOfFlight - 1;
      minutesOfFlight = 60 + minutesOfFlight
    }
    return hoursOfFlight + `:${minutesOfFlight}`
  }

  filterOutputArrayOfObjects(outputArrayOfObjects, filterTimesObject) {
    while (document.querySelector('#tr3')) {
      document.querySelector('#tr3').remove();
    }
    if (filterTimesObject.timeStarts || filterTimesObject.timeEnds) {

      if (filterTimesObject.timeStarts && filterTimesObject.timeEnds) {
        return this.filterOutputArrayOfObjectsSubfunction(
          outputArrayOfObjects, filterTimesObject, filterTimesObject.timeStarts, this.takeOffTime, filterTimesObject.timeEnds
        );
      }

      if (filterTimesObject.timeStarts) {
        console.log(filterTimesObject)
        return this.filterOutputArrayOfObjectsSubfunction(
          outputArrayOfObjects, filterTimesObject, filterTimesObject.timeStarts, this.takeOffTime
        );

      }

      if (filterTimesObject.timeEnds) {
        console.log(filterTimesObject)
        return this.filterOutputArrayOfObjectsSubfunction(
          outputArrayOfObjects, filterTimesObject, filterTimesObject.timeEnds, this.takeOffTime
        );
      }
    }
  }

  filterOutputArrayOfObjectsSubfunction(outputArrayOfObjects, filterTimesObject, filterTimesObjectProperty, time, add) {
    let filteredTotalMinutesEnd = 0;
    if (add) {
      const filteredHoursInMinutesEnd = add.slice(0, 2) * 60;
      const filteredMinutesEnd = +add.slice(3, 6);
      filteredTotalMinutesEnd = filteredHoursInMinutesEnd + filteredMinutesEnd;
    }
    const filteredHoursInMinutes = filterTimesObjectProperty.slice(0, 2) * 60;
    const filteredMinutes = +filterTimesObjectProperty.slice(3, 6);
    const filteredTotalMinutes = filteredHoursInMinutes + filteredMinutes;
    console.log(filteredMinutes)
    const filteredOutputArrayOfObjects = outputArrayOfObjects.filter(item => {
      let timeHoursInMinutes = item[time].slice(0, 2) * 60;
      let timeMinutes = +item[time].slice(3, 6);
      let timeTotalMinutes = timeHoursInMinutes + timeMinutes
      if (add) {
        if (filteredTotalMinutes <= timeTotalMinutes && timeTotalMinutes <= filteredTotalMinutesEnd) {

          return item
        }
      } else if (filterTimesObjectProperty == filterTimesObject.timeStarts) {
        if (timeTotalMinutes > filteredTotalMinutes) {
          return item
        }
      } else if (filterTimesObjectProperty == filterTimesObject.timeEnds) {
        if (timeTotalMinutes < filteredTotalMinutes) {
          return item
        }
      }
    })
    return filteredOutputArrayOfObjects;
  }

}