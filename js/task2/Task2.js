class Task2 {
  /**
    * Creates and renders a table of all documents or shows only one requested document
    * @param {number} userDocumentNumber - The document number value if you want to see only one document.
    */
  constructor(userDocumentNumber) {
    this.userDocumentNumber = userDocumentNumber;
    this.tableWrapper = document.getElementById('task2');
    this.jsonHeadFile = 'js/task2/head.json';
    this.jsonPosFile = 'js/task2/pos.json';
    this.headDataArray = [];
    this.posDataArray = [];
    this.documentNumber = 'Номер документа';
    this.positionNumber = 'Номер позиции';
    this.positionText = 'Текст позиции';
    this.positionSum = 'Сумма';
    this.documentYear = 'Год';
    this.fetchData();
    this.outputArrayOfObjects = [];
    this.outputColumnsArray = [
      this.documentNumber,
      this.documentYear,
      'Позиция',
      this.positionText,
      this.positionSum,
    ];
  }
 
  fetchData() {
    this.fetchHeadData();
  }

  fetchHeadData() {
    fetch(this.jsonHeadFile)
      .then(response => response.json())
      .then(fetchData => {
        for (let item of fetchData) {
          this.headDataArray.push(item);
        }        
      this.fetchPosData();
      })
      ;
  }

  fetchPosData() {
    fetch(this.jsonPosFile)
      .then(response => response.json())
      .then(fetchData => {
        for (let item of fetchData) {
          if (this.userDocumentNumber && this.userDocumentNumber == item[this.documentNumber]) {
            this.posDataArray.push(item);
          } else if (!this.userDocumentNumber) {
            this.posDataArray.push(item);
          }
        }
        this.createOutputArrayOfObjects();
      })
  }

  createOutputArrayOfObjects() {
    const headDataArray = this.headDataArray;
    const posDataArray = this.posDataArray;

    const bufferArrayOfDocNumbers = [];
    const outputArrayOfObjects = [];

    for (let item of posDataArray) {
      if (!bufferArrayOfDocNumbers.includes(item[this.documentNumber])) {
        bufferArrayOfDocNumbers.push(item[this.documentNumber]);
        outputArrayOfObjects.push(item);
      } else {
        for (let element of outputArrayOfObjects) {
          if (element[this.documentNumber] == item[this.documentNumber]) {
            element[this.positionNumber + item[this.positionNumber]] = item[this.positionNumber];
            element[this.positionText + item[this.positionNumber]] = item[this.positionText];
            element[this.positionSum + item[this.positionNumber]] = item[this.positionSum];
          }
        }
      }
    }

    for (let item of headDataArray) {
      for (let element of outputArrayOfObjects) {
        if (element[this.documentNumber] == item[this.documentNumber]) {
          element[this.documentYear] = item[this.documentYear];
        }
      }
    }
    this.outputArrayOfObjects = outputArrayOfObjects;
    this.render();
  }

  renderTableHeader() {
    const outputColumnsArray = this.outputColumnsArray;
    const divWrapper = this.tableWrapper;
    for (let i = 0; i < 1; i++) {
      let tr = document.createElement('thead');
      divWrapper.appendChild(tr);
      for (let z = 0; z < outputColumnsArray.length; z++) {
        let td = document.createElement('td');
        td.innerText = outputColumnsArray[z];
        tr.appendChild(td);
      }
    }
  }

  renderDocuments() {
    const outputArrayOfObjects = this.outputArrayOfObjects;
    const outputColumnsArray = this.outputColumnsArray;
    const divWrapper = this.tableWrapper;

    let totalSum = 0;
    outputArrayOfObjects.forEach(item => {
      let countPositions = 0;
      let countSum = 0;
      for (let element in item) {
        if (/Номер позиции/.test(element)) {
          countPositions++;
          totalSum;
        } else if (/Сумма/.test(element)) {
          countSum += item[element];
          totalSum += item[element];
        }
      }

      for (let i = 0; i <= countPositions; i++) {
        let tr = document.createElement('tr');
        divWrapper.appendChild(tr);

        for (let z = 0; z < outputColumnsArray.length; z++) {
          let td = document.createElement('td');
          if (z == 0) {
            if (i == 0) {
              td.innerText = item[this.documentNumber];
            }
            if (i==countPositions) {
              td.setAttribute('class','borderRight')
            }
          } else if (z == 1) {
            if (i == 0) {
              td.innerText = item[this.documentYear];
            }
            if (i==countPositions) {
              td.setAttribute('class','borderLeftRight')
            }
          } else if (z == 2 && i != countPositions) {
            if (i == 0) {
              td.innerText = item[this.positionNumber];
            } else {
              td.innerText = item[this.positionNumber + (i + 1)];
            }
          } else if (z == 2 && i == countPositions){
            td.setAttribute('class','borderLeft')
          }
           else if (z == 3) {
            if (i == 0) {
              td.innerText = item[this.positionText];
            } else if (i == countPositions) {
              td.innerText = 'Всего по документу ' + (outputArrayOfObjects.indexOf(item) + 1);
            } else {
              td.innerText = item[this.positionText + (i + 1)];
            }
          } else if (z == 4) {
            if (i == 0) {
              td.innerText = item[this.positionSum];
            } else if (i == countPositions) {
              td.innerText = countSum;
            } else {
              td.innerText = item[this.positionSum + (i + 1)];
            }
          }
          tr.appendChild(td);
        }
      }
    })
    this.renderLastTotalRow(outputColumnsArray, totalSum)
  }

  renderLastTotalRow(outputColumnsArray, totalSum) {
    const divWrapper = this.tableWrapper;
    let tr = document.createElement('tr');
    tr.setAttribute('class', 'grandTotal');
    divWrapper.appendChild(tr);
    for (let z = 0; z < outputColumnsArray.length; z++) {
      let td = document.createElement('td');
      if (z == 3) {
        td.innerText = 'Итого'
      } else if (z == 4) {
        td.innerText = totalSum;
      }
      tr.appendChild(td);
    }
  }

  render() {
    this.renderTableHeader();
    this.renderDocuments();
  }

}


