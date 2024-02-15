/*
=========================================================
Name        : matrix.js
Assignment  : Lab 5, Exercise D
Author(s)   : Brendan Smiley, Ryan Graham
Submission  : February 14, 2024
Description : Matrix Logic.
=========================================================
*/

function generateMatrices() {
  createMatrix(
    "The 1st Matrix",
    "matrix1",
    document.getElementById("matrix1Rows").value,
    document.getElementById("matrix1Cols").value
  );
  createMatrix(
    "The 2nd Matrix",
    "matrix2",
    document.getElementById("matrix2Rows").value,
    document.getElementById("matrix2Cols").value
  );
}

const createMatrix = (title, containerId, rows, cols) => {
  let container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content
  let table = document.createElement("table");
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let td = document.createElement("td");
      let input = document.createElement("input");
      input.type = "number";
      input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
      td.appendChild(input);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  let caption = table.createCaption();
  caption.textContent = title;
  container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
  let container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content
  let table = document.createElement("table");

  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let td = document.createElement("td");
      let span = document.createElement("span");
      // Calculate the index in the dataArray based on current row and column
      let index = i * cols + j;
      if (index < dataArray.length) {
        span.innerHTML = dataArray[index];
      }
      td.appendChild(span);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  let caption = table.createCaption();
  caption.textContent = title;
  container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
  // dataArray is a 2D array
  let container = document.getElementById(containerId);
  container.innerHTML = ""; // Clear previous content
  let table = document.createElement("table");

  for (let i = 0; i < dataArray.length; i++) {
    let tr = document.createElement("tr");
    for (let j = 0; j < dataArray[0].length; j++) {
      let td = document.createElement("td");
      let span = document.createElement("span");
      // Calculate the index in the dataArray based on current row and column
      let index = i * dataArray[0].length + j;
      if (index < dataArray.length) {
        span.innerHTML = dataArray[index];
      }
      td.appendChild(span);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  let caption = table.createCaption();
  caption.textContent = title;
  container.appendChild(table);
};

function performOperation(operation) {
  let matrix1 = getMatrixData2D("matrix1");
  let matrix2 = getMatrixData2D("matrix2");
  console.log("1st Matrix", matrix1);
  console.log("2nd Matrix", matrix2);
  console.log("Operation", operation);
  // Call your matrix calculation functions here
  // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
  // prints suitable messages for impossible situation
  results = [];
  if (operation == "add") {
    result = addMatrices(matrix1, matrix2);
    console.log("Matrix Addition Results: ", result);
  }
  if (operation == "subtract") {
    result = subtractMatrices(matrix1, matrix2);
    console.log("Matrix Subtract Results: ", result);
  }
  if (operation == "multiply") {
    result = multiplyMatrices(matrix1, matrix2);
    console.log("Matrix Multiply Results: ", result);
  }
  // Inform the user of an errors
  if (typeof result == "string") {
    showError(result);
    return;
  }

  showResult2D("The Result", "matrix3", result); // use suitable function for printing results
}
function showError(error) {
  let container = document.getElementById("matrix3");
  container.innerText = result;
  return;
}
const getMatrixData1D = function (matrixId) {
  let matrixData = [];
  let inputs = document.querySelectorAll(`#${matrixId} input`);
  inputs.forEach((input) => {
    matrixData.push(parseInt(input.value, 10));
  });
  return matrixData;
};

const getMatrixData2D = function (matrixId) {
  let matrixData = [];
  let rows = parseInt(document.getElementById(matrixId + "Rows").value, 10);
  let cols = parseInt(document.getElementById(matrixId + "Cols").value, 10);
  let inputs = document.querySelectorAll(`#${matrixId} input`);

  for (let i = 0; i < rows; i++) {
    let rowData = [];
    for (let j = 0; j < cols; j++) {
      // Calculate index in the flat list of inputs
      let index = i * cols + j;
      if (index < inputs.length) {
        rowData.push(parseInt(inputs[index].value, 10));
      } else {
        rowData.push(0); // Default value if input is missing
      }
    }
    matrixData.push(rowData);
  }
  return matrixData;
};

// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2) {
  // Can only perform matrix addition on same sizes (n1xm1 + n2xm2)
  // where, n1 = n2 and m1 = m2
  let n1 = matrix1.length;
  let m1 = matrix1[0].length;
  let n2 = matrix2.length;
  let m2 = matrix2[0].length;

  // Matrix Verification
  if (n1 != n2) {
    return "The matrices to add do not have the same row size. Please ensure the matrices have the same size for addition operation.";
  } else if (m1 != m2) {
    return "The matrices to add do not have the same column size. Please ensure the matrices have the same size for addition operation.";
  }

  let resultantMatrix = [];
  for (let i = 0; i < n1; i++) {
    let subArray = [];
    for (let j = 0; j < m1; j++) {
      subArray.push(matrix1[i][j] + matrix2[i][j]);
    }
    resultantMatrix.push(subArray);
  }
  return resultantMatrix;
}
const subtractMatrices = function (matrix1, matrix2) {
  // Can only perform matrix addition on same sizes (n1xm1 - n2xm2)
  // where, n1 = n2 and m1 = m2
  let n1 = matrix1.length;
  let m1 = matrix1[0].length;
  let n2 = matrix2.length;
  let m2 = matrix2[0].length;

  // Matrix Verification
  if (n1 != n2) {
    return "The matrices to add do not have the same row size. Please ensure the matrices have the same size for addition operation.";
  } else if (m1 != m2) {
    return "The matrices to add do not have the same column size. Please ensure the matrices have the same size for addition operation.";
  }

  let resultantMatrix = [];
  for (let i = 0; i < n1; i++) {
    let subArray = [];
    for (let j = 0; j < m1; j++) {
      subArray.push(matrix1[i][j] - matrix2[i][j]);
    }
    resultantMatrix.push(subArray);
  }
  return resultantMatrix;
};
const multiplyMatrices = (matrix1, matrix2) => {
  // For matrix multiplication, the number of rows of matrix2 must be the same
  // as columns per row in matrix1.
  // [n1xm1] X [n2xm2] where m1 = n2
  let n1 = matrix1.length;
  let m1 = matrix1[0].length;
  let n2 = matrix2.length;
  let m2 = matrix2[0].length;
  if (m1 != n2) {
    return (
      "The matrices to multiple do not have the correct size." +
      "Please ensure the first matrix has a column size equal to the number of rows in second matrix."
    );
  }
  resultantMatrix = [];
  // For rows in matrix1
  for (let i = 0; i < n1; i++) {
    // For all column in matrix2
    subArray = [];
    for (let j = 0; j < m2; j++) {
      let dotProductSum = 0;
      // For a column in matrix2
      for (let k = 0; k < n2; k++) {
        dotProductSum += matrix1[i][k] * matrix2[k][j];
      }
      subArray.push(dotProductSum);
    }
    resultantMatrix.push(subArray);
  }
  return resultantMatrix;
};
