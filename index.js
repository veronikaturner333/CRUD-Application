let selectedRow = null;

//show alerts function has message and className parameters
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    //creating new text node with message as our data parameter
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    //div is the new node being inserted before main which is the reference node
    //container is the parent node
    container.insertBefore(div, main);

    //alerts time out after they pop up on screen
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Clear text fields by setting them to empty strings
function clearFields(){
    document.querySelector("#exerciseName").value = "";
    document.querySelector("#reps").value = "";
    document.querySelector("#sets").value = "";
}

//Add Data
//Grab exercise-plan id and add submit event listener
document.querySelector("#exercise-plan").addEventListener("submit", (e) => {
    //preventDefault prevents default behavior such as refreshing the page after submission
    e.preventDefault();
    //Get Form Values
    const exerciseName = document.querySelector("#exerciseName").value;
    const reps = document.querySelector("#reps").value;
    const sets = document.querySelector("#sets").value;

    //validate that the user has filled in all fields, if not alert them
    if(exerciseName == "" || reps == "" || sets == "") {
        showAlert("Please fill in all fields", "danger");
    }
    //if they enter data in all fields and click submit, add row of data to table
    else{
        if (selectedRow == null) {
            const list = document.querySelector("#exercise-list");
            const row = document.createElement("tr");

            //taking from HTML, these are the data types we need to add to the table
            row.innerHTML = `
            <td>${exerciseName}</td>
            <td>${reps}</td>
            <td>${sets}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
            <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            `;
            list.appendChild(row);
            selectedRow = null;
            //show a success alert that you've added an exercise
            showAlert("Exercise Added", "success");
        }
        //if user clicks edit button of a row, info the user types in updates the row
        else{
            selectedRow.children[0].textContent = exerciseName;
            selectedRow.children[1].textContent = reps;
            selectedRow.children[2].textContent = sets;
            selectedRow = null;
            //Alert shows user they've edited the row
            showAlert("Exercise Info Edited", "info")
        }
        //calling clearFields function to clear all fields of user added input when done
        clearFields();
    }
});

//Edit Data
//add click event to edit button and insert new values
document.querySelector("#exercise-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firtName").value = selectedRow.children[0].textContent;
        document.querySelector("#reps").value = selectedRow.children[1].textContent;
        document.querySelector("#sets").value = selectedRow.children[2].textContent;
    }
});

//Delete Data, grab the exercise-list method by id in HTML
//add click event listener
//remove the parent element the delete button belongs to
//alert that you have deleted the data
document.querySelector("#exercise-list").addEventListener("click", (e) => {
    target = e.target;
    if (target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Exercise Data Deleted", "danger");
    }
});