function validateForm() {
  let amount = document.getElementById("amount").value;
  let category = document.getElementById("category").value;
  let description = document.getElementById("description").value;
  if (amount == "") {
    alert("Amount is required");
    return false;
  }
  if (category == "") {
    alert("Category is required");
    return false;
  }
  if (description == "") {
    alert("Description is required");
    return false;
  }
  return true;
}

// Function to show data

function showData(response) {
  console.log(response);
  let html = "";

  for (let i = 0; i < response.data.length; i++) {
    html = html + "<tr>";
    html = html + "<td>" + response.data[i].id + "</td>";
    html = html + "<td>" + response.data[i].amount + "</td>";
    html = html + "<td>" + response.data[i].category + "</td>";
    html = html + "<td>" + response.data[i].description + "</td>";
    html =
      html +
      '<td><button class="btn btn-danger deleteBtn" value=' +
      response.data[i].id +
      '>Delete</button><button class="btn btn-warning m-2 updateBtn" value=' +
      response.data[i].id +
      ">Edit</button></td>";
    html = html + "</tr>";
  }
  document.querySelector("#crudTable tbody").innerHTML = html;
}

// Get Data
async function getData() {
  try {
    let response = await axios.get("http://localhost:7000/adduser");
    showData(response);
  } catch (error) {
    console.log(error);
  }
}

// onLoad

document.onload = getData();

// Function to Add/Post Data

async function addData() {
  try {
    // Form Validation
    if (validateForm() == true) {
      let amount = document.getElementById("amount").value;
      let category = document.getElementById("category").value;
      let description = document.getElementById("description").value;

      let response = await axios.post("http://localhost:7000/adduser", {
        amount: amount,
        category: category,
        description: description,
      });
      showData(response);

      document.getElementById("amount").value = "";
      document.getElementById("category").value = "";
      document.getElementById("description").value = "";

      // Get Api

      let response1 = await axios.get("http://localhost:7000/adduser");
      showData(response1);
    }
  } catch (error) {
    console.log(error);
  }
}

// Function to Delete Data

$("body").on("click", ".deleteBtn", async function () {
  try {
    let id = $(this).val();

    let response = await axios.delete(
      "http://localhost:7000/adduser" + "/" + id
    );
    console.log(response);

    // Get Api

    let response1 = await axios.get("http://localhost:7000/adduser");
    showData(response1);
  } catch (error) {
    console.log(error);
  }
});

// Function to Update/Edit Data

$("body").on("click", ".updateBtn", async function () {
  try {
    // Submit button will hide and Update button will show while clicking on edit button
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let id = $(this).val();

    let response = await axios.get("http://localhost:7000/adduser" + "/" + id);

    document.getElementById("amount").value = response.data.amount;
    document.getElementById("category").value = response.data.category;
    document.getElementById("description").value = response.data.description;

    // Update Function

    document.querySelector("#Update").onclick = async function () {
      if (validateForm() == true) {
        let response2 = await axios.get(
          "http://localhost:7000/adduser" + "/" + id
        );
        let amount = (response2.data.amount =
          document.getElementById("amount").value);
        let category = (response2.data.category =
          document.getElementById("category").value);
        let description = (response2.data.description =
          document.getElementById("description").value);
        let response = await axios.put(
          "http://localhost:7000/adduser" + "/" + id,
          {
            amount: amount,
            category: category,
            description: description,
          }
        );

        document.getElementById("amount").value = "";
        document.getElementById("category").value = "";
        document.getElementById("description").value = "";

        // Update button will hide and Submit button will show after Updating details
        document.getElementById("Submit").style.display = "block";
        document.getElementById("Update").style.display = "none";

        // Get Data
        let response1 = await axios.get("http://localhost:7000/adduser");
        showData(response1);
      }
    };
  } catch (error) {
    console.log(error);
  }
});