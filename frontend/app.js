
function openForm1() {
    document.getElementById("myForm1").style.display = "block";
    closeForm2()
    closeForm3()
  }
  
function closeForm1() {
  document.getElementById("myForm1").style.display = "none";
}
function openForm2() {
  document.getElementById("myForm2").style.display = "block";
  closeForm1()
  closeForm3()
}

function closeForm2() {
  document.getElementById("myForm2").style.display = "none";
}
function openForm3() {
  document.getElementById("myForm3").style.display = "block";
  closeForm2()
  closeForm1()   
}

function closeForm3() {
  document.getElementById("myForm3").style.display = "none";
}

function getTotalsum(){
 console.log("sum")
}

function getTotalDebt(){
  console.log("debt")
}

var modalsums = document.getElementById("ModalOfSums");

var btn = document.getElementById("ToalSums");


var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modalsums.style.display = "block";
  modaldebt.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modalsums.style.display = "none";
  
}


// *****************************************************************************
var modaldebt = document.getElementById("ModalOfDebts");


var btndebt = document.getElementById("Toaldebts");


var spandebt = document.getElementsByClassName("close1")[0];

// When the user clicks the button, open the modal 
btndebt.onclick = function() {
  modaldebt.style.display = "block";
  modalsums.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
spandebt.onclick = function() {
  modaldebt.style.display = "none";
}



function Functionbox() {
  // Get the checkbox
  var checkBox = document.getElementById("permanent");
  // Get the output text
  var text = document.getElementById("text");

  // If the checkbox is checked, display the output text
  if (checkBox.checked == true){
    checkBox.value="true"
    text.style.display = "block";
  } else {
    checkBox.value="false"
    text.style.display = "none";
  }
}
function toggleSchedule() {
    var checkbox = document.getElementById("myCheckbox");
    var schedule = document.getElementById("schedule");
    if (checkbox.checked == true) {
      schedule.style.display = "block";
    } else {
      schedule.style.display = "none";
    }
  }
  let tableContainers = {
    lessons: document.getElementById("table-container-lessons"),
    students: document.getElementById("table-container-students")
  };
  
  document.getElementById("open-table-students").addEventListener("click", function() {
    closeTable("lessons");
    fetch("http://127.0.0.1:5000/students")
      .then(response => response.json())
      .then(data => {
        let table = "<table class='students-table'>";
  
        // Add table header with column names and a close button
        table += "<thead>";
        table += "<tr>";
        table += "<th colspan='4'><button onclick='closeTable(\"students\")'>X</button></th>";
        table += "</tr>";
        table += "<tr>";
        table += "<th>Name</th>";
        table += "<th>Price</th>";
        table += "<th>Permanent</th>";
        table += "<th>Date of start</th>";
        table += "</tr>";
        table += "</thead>";
  
        // Add table body with data rows
        table += "<tbody>";
        data.forEach(student => {
          table += "<tr>";
          table += "<td>" + student.name + "</td>";
          table += "<td>" + student.price + "</td>";
          table += "<td>" + student.permanent + "</td>";
          table += "<td>" + student.date_of_beginning + "</td>";
          table += "</tr>";
        });
        table += "</tbody>";
  
        table += "</table>";
        let tableContainer = createTableContainer(table);
        tableContainers.students.appendChild(tableContainer);
        shortTheTable(tableContainer);
      });
  });
  
  document.getElementById("open-table-lessons").addEventListener("click", function() {
    closeTable("students");
    fetch("http://127.0.0.1:5000/lessons")
      .then(response => response.json())
      .then(data => {
        let table = "<table class='lessons-table'>";
  
        // Add table header with column names and a close button
        table += "<thead>";
        table += "<tr>";
        table += "<th colspan='4'><button onclick='closeTable(\"lessons\")'>X</button></th>";
        table += "</tr>";
        table += "<tr>";
        table += "<th>Name</th>";
        table += "<th>Payment</th>";
        table += "<th>Date</th>";
        table += "</tr>";
        table += "</thead>";
  
        // Add table body with data rows
        table += "<tbody>";
        data.forEach(lesson => {
          table += "<tr>";
          table += "<td>" + lesson.name + "</td>";
          table += "<td>" + lesson.payment+ "</td>";
          table += "<td>" + lesson.date + "</td>";
          table += "</tr>";
        });
        table += "</tbody>";
        table += "</table>";
        let tableContainer = createTableContainer(table);
        tableContainers.lessons.appendChild(tableContainer);
        shortTheTable(tableContainer);
      });
  });
  
  function createTableContainer(tableHtml) {
    let container = document.createElement("div");
    container.className = "table-container";
    container.innerHTML = tableHtml;
    return container;
  }
  
  function closeTable(table) {
    tableContainers[table].innerHTML = "";
  }
  
  function shortTheTable(table) {
    table.style.height = '200px'; // set a fixed height for the table
    table.style.overflowY = 'auto'; // enable scrolling
  }
  


  
function getDebtByName() {
  // Get the value entered by the user
  var name = document.getElementById("name").value;

  // Construct the URL with the name as a query parameter
  var url = "http://127.0.0.1:5000/student/{debt}?name=" + encodeURIComponent(name);

  fetch(url)
  .then(response => response.text())
  .then(data => {window.confirm(name +" owns you:\n "+data)});
}
  
    
function getamountByName(){
  var name = document.getElementById("name").value;

  // Construct the URL with the name as a query parameter
  var url = "http://127.0.0.1:5000/sum_by_name?name=" + encodeURIComponent(name);

  fetch(url)
  .then(response => response.text())
  .then(data => {window.confirm(name +" pay to you in the total:\n "+data)});
}


function getAmountDates() {
  // Get the value entered by the user
  var datestart = document.getElementById("date-input-start").value;
  var dateend = document.getElementById("date-input-end").value;
  // Construct the URL with the name as a query parameter
  var url = "http://127.0.0.1:5000/lessosn/" + encodeURIComponent(datestart)+"/"+encodeURIComponent(dateend);
  console.log(url)
  fetch(url)
  .then(response => response.text())
  .then(data => {window.confirm("you earnd:\n "+data)});
}


const sampleForm = document.getElementById("myForm");

//Add an event listener to the form element and handler for the submit an event.
sampleForm.addEventListener("submit", async (e) => {


  /**
   * Prevent the default browser behaviour of submitting
   * the form so that you can handle this instead.
   */
  e.preventDefault();

  /**
   * Get the element attached to the event handler.
   */
  let form = e.currentTarget;

  /**
   * Take the URL from the form's `action` attribute.
   */
  let url = form.action;

  try {
    /**
     * Takes all the form fields and make the field values
     * available through a `FormData` instance.
     */
    let formData = new FormData(form);

    /**
     * The `postFormFieldsAsJson()` function in the next step.
     */
    let responseData = await postFormFieldsAsJson({ url, formData });

    //Destructure the response data
    let { serverDataResponse } = responseData;

    //Display the response data in the console (for debugging)
    console.log(serverDataResponse);
  } catch (error) {
    //If an error occurs display it in the console (for debugging)
    console.error(error);
  }
});

/**
 * Helper function to POST data as JSON with Fetch.
 */
async function postFormFieldsAsJson({ url, formData }) {
  //Create an object from the form data entries
  let formDataObject = Object.fromEntries(formData.entries());
  // Format the plain form data as JSON
  let formDataJsonString = JSON.stringify(formDataObject);

  //Set the fetch options (headers, body)
  let fetchOptions = {
    //HTTP method set to POST.
    method: "POST",
    //Set the headers that specify you're sending a JSON body request and accepting JSON response
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // POST request body as JSON string.
    body: formDataJsonString,
  };

  //Get the response body as JSON.
  //If the response was not OK, throw an error.
  let res = await fetch(url, fetchOptions);

  //If the response is not ok throw an error (for debugging)
  if (!res.ok) {
    let error = await res.text();
    throw new Error(error);
  }
  else
    if (url=="http://localhost:5000/lessons")
    alert("The lesson has been added")
    else
    alert("The student has been added")
  //If the response was OK, return the response body.

  return res.json();
}




const sampleFormLesson = document.getElementById("myFormLessons");

//Add an event listener to the form element and handler for the submit an event.
sampleFormLesson.addEventListener("submit", async (e) => {


  /**
   * Prevent the default browser behaviour of submitting
   * the form so that you can handle this instead.
   */
  e.preventDefault();

  /**
   * Get the element attached to the event handler.
   */
  let form = e.currentTarget;

  /**
   * Take the URL from the form's `action` attribute.
   */
  let url = form.action;

  try {
    /**
     * Takes all the form fields and make the field values
     * available through a `FormData` instance.
     */
    let formData = new FormData(form);

    /**
     * The `postFormFieldsAsJson()` function in the next step.
     */
    let responseData = await postFormFieldsAsJson({ url, formData });

    //Destructure the response data
    let { serverDataResponse } = responseData;

    //Display the response data in the console (for debugging)
    console.log(serverDataResponse);
  } catch (error) {
    //If an error occurs display it in the console (for debugging)
    console.error(error);
  }
});

//Update lesson function

var modal = document.getElementById("UpdateModal");

var span = document.getElementsByClassName("closeUpdate")[0];

function OpenUpdate() {
  modal.style.display = "block";
}

function updateLesson() {
  var name = document.getElementById("nameInput").value;
  modal.style.display = "none";
  var url="http://localhost:5000/lessons_by_name?name="+ encodeURIComponent(name);
  fetch(url)
      .then(response => response.json())
      .then(data => {
        let table = "<table class='lessons-table' id='updateTable'>";
  
        // Add table header with column names and a close button
        table += "<thead>";
        table += "<tr>";
        table += "<th colspan='4'><button onclick='closeUpdateTable()'>X</button></th>";
        table += "</tr>";
        table += "<tr>";
        table += "<th>Name</th>";
        table += "<th>Payment</th>";
        table += "<th>Date</th>";
        table += "</tr>";
        table += "</thead>";
  
        // Add table body with data rows
        table += "<tbody>";
        data.forEach(lesson => {
          table += "<tr>";
          table += "<td>" + lesson.name + "</td>";
          table += "<td ondblclick='onPriceDoubleClick(event)'>" + lesson.payment+ "</td>";
          table += "<td>" + lesson.date + "</td>";
          table += "</tr>";
        });
        table += "</tbody>";
        table += "</table>";
        let tableContainer = createTableContainer(table);
        tableContainers.lessons.appendChild(tableContainer);
        shortTheTable(tableContainer);
})};
function closeUpdateTable()
{
  let tableContainer = document.getElementById("updateTable");
  tableContainer.parentNode.removeChild(tableContainer);
  
  // Clear the data stored in tableContainers
  tableContainers.lessons.innerHTML = "";// not necessary
}


function onPriceDoubleClick(event) {
  // Get the current price value and create an input field
  const currentValue = event.target.textContent;
  const inputField = document.createElement('input');
  inputField.type = 'number';
  inputField.value = currentValue;

  // Replace the cell content with the input field
  event.target.textContent = '';
  event.target.appendChild(inputField);

  // Add a "Save" button
  const saveButton = document.createElement('button');
  saveButton.textContent = 'Save';
  saveButton.style.backgroundColor = 'green';
  saveButton.style.color = 'white';
  saveButton.style.cursor='pointer';
  saveButton.onclick = () => {
    const newValue = inputField.value;

    // Update the price value in the data and in the table
    const lessonIndex = event.target.parentNode.rowIndex - 1;
    data[lessonIndex].payment = newValue;
    event.target.textContent = newValue;

    //shilo func
    var updatePay=data[lessonIndex].Payment;
    var Date=data[lessonIndex].Date;
    var Name=data[lessonIndex].Name;

    setTheChanges(Name,updatePay,Date)
    // Remove the input field and save button
    event.target.removeChild(inputField);
    event.target.removeChild(saveButton);
  };
  event.target.appendChild(saveButton);
}

function setTheChanges(name,pay,date)
{
  
}
