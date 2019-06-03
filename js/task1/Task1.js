class Task1 {
  constructor() {
    this.getJson();
    this.month = 'x';
    this.person = 'y';
    this.uniqueMonths = [];
    this.uniquePersons = [];
    this.arrayOfCrossingPositions = [];
  }

  getJson() {
    fetch('js/task1/task1.json')
      .then(response => response.json())
      .then(fetchData => {
        this.getArrayOfCrossingPositions(fetchData);
      })
  }

  getArrayOfCrossingPositions(fetchData) {
    const newArray = this.getUniqueMonthsPersonsArrayOfObjects(fetchData);

    for (let i = 0; i < newArray.length; i++) {
      for (let z = 0; z < fetchData.length; z++) {
        if (newArray[i][this.month] == fetchData[z][this.month] && newArray[i][this.person] == fetchData[z][this.person]) {
          this.arrayOfCrossingPositions.push(fetchData[z])
        }
      }
    }
    this.renderTable();
  }

  getUniqueMonthsPersonsArrayOfObjects(fetchData) {
    const personsArray = this.getUniquePersons(fetchData);
    const monthsArray = this.getUniqueMonths(fetchData);
    const uniqueMonthsPersonsArrayOfObject = [];
    for (let i = 0; i < personsArray.length; i++) {
      for (let z = 0; z < monthsArray.length; z++) {
        uniqueMonthsPersonsArrayOfObject.push({ [this.month]: monthsArray[z], [this.person]: personsArray[i] })
      }
    }
    return uniqueMonthsPersonsArrayOfObject;
  }

  getUniquePersons(fetchData) {
    const uniquePersonsArray = this.getArrayOfUniqueItems(fetchData, this.person);
    for (let item of uniquePersonsArray) {
      this.uniquePersons.push(item);
    }
    return uniquePersonsArray;
  }

  getUniqueMonths(fetchData) {
    const uniqueMonths = this.getArrayOfUniqueItems(fetchData, this.month);
    for (let item of uniqueMonths) {
      this.uniqueMonths.push(item);
    }
    return uniqueMonths;
  }

  getArrayOfUniqueItems(fetchData, name) {
    const arrayofAllItems = [];
    fetchData.forEach(item => {
      if (item[name] == '' || item[name] == undefined) {
        item[name] = 'empty';
      }
      arrayofAllItems.push(item[name]);
    })
    return [...new Set(arrayofAllItems)];
  }

  renderTableField(uniqueMonths, uniquePersons) {
    const divWrapper = document.getElementById('task1');
    let objToCompare = {};
    for (let i = 0; i <= uniquePersons.length; i++) {
      let tr = document.createElement('tr');
      divWrapper.appendChild(tr);
      for (let z = 0; z <= uniqueMonths.length; z++) {
        let td = document.createElement('td');
        if (i > 0 && z < 1) {
          td.innerText = uniquePersons[i - 1]
        } else if (z > 0 && i < 1) {
          td.setAttribute('class', 'thead');
          td.innerText = uniqueMonths[z - 1];
        } else if (i > 0 && z > 0) {
          objToCompare = { 'x': uniqueMonths[z - 1], 'y': uniquePersons[i - 1] };
          td.innerText = this.compareObjects(objToCompare);
        }
        tr.appendChild(td);
      }
    }
  }

  compareObjects(objectToCompare) {
    let value = 0;
    for (let item of this.arrayOfCrossingPositions) {
      if (item['x'] == objectToCompare['x'] && item['y'] == objectToCompare['y']) {
        value = +item['val'];
      }
    }
    return value;
  }

  renderTable() {
    this.renderTableField(this.uniqueMonths, this.uniquePersons);
  }

}