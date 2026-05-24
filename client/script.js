const API =
"http://localhost:5000/api/leads";


// Login

function login(){

  const username =
  document.getElementById(
    "username"
  ).value;

  const password =
  document.getElementById(
    "password"
  ).value;

  if(
    username === "admin"
    &&
    password === "admin123"
  ){

    document.getElementById(
      "loginPage"
    ).style.display = "none";

    document.getElementById(
      "dashboard"
    ).style.display = "block";

    fetchLeads();

  }else{

    alert("Invalid Login");
  }
}


// Fetch Leads

async function fetchLeads(){

  const res =
  await fetch(API);

  const leads =
  await res.json();

  displayLeads(leads);

  createChart(leads);
}


// Add Lead

async function addLead(){

  const lead = {

    name:
    document.getElementById(
      "name"
    ).value,

    email:
    document.getElementById(
      "email"
    ).value,

    status:
    document.getElementById(
      "status"
    ).value,

    notes:
    document.getElementById(
      "notes"
    ).value
  };

  await fetch(API,{

    method:"POST",

    headers:{
      "Content-Type":
      "application/json"
    },

    body:JSON.stringify(lead)
  });

  fetchLeads();
}


// Delete Lead

async function deleteLead(id){

  await fetch(`${API}/${id}`,{

    method:"DELETE"
  });

  fetchLeads();
}


// Edit Lead

async function editLead(id){

  const newStatus =
  prompt("Update Status");

  await fetch(`${API}/${id}`,{

    method:"PUT",

    headers:{
      "Content-Type":
      "application/json"
    },

    body:JSON.stringify({

      status:newStatus
    })
  });

  fetchLeads();
}


// Display Leads

function displayLeads(leads){

  const leadList =
  document.getElementById(
    "leadList"
  );

  leadList.innerHTML = "";

  leads.forEach((lead)=>{

    leadList.innerHTML += `

    <div class="lead-card">

      <h3>${lead.name}</h3>

      <p>${lead.email}</p>

      <p>${lead.notes}</p>

      <p>Status:
      ${lead.status}</p>

      <button
      onclick="editLead(
      '${lead._id}'
      )">

      Edit

      </button>

      <button
      onclick="deleteLead(
      '${lead._id}'
      )">

      Delete

      </button>

    </div>
    `;
  });
}


// Dark Mode

function toggleTheme(){

  document.body
  .classList.toggle("dark");
}


// Export CSV

function exportCSV(){

  let csv =
  "Name,Email,Status\n";

  document
  .querySelectorAll(
    ".lead-card"
  )

  .forEach(card=>{

    csv +=
    card.innerText + "\n";
  });

  const blob =
  new Blob([csv]);

  const a =
  document.createElement("a");

  a.href =
  URL.createObjectURL(blob);

  a.download = "leads.csv";

  a.click();
}


// Analytics Chart

function createChart(leads){

  const statusCount = {

    New:0,

    Contacted:0,

    Converted:0
  };

  leads.forEach(lead=>{

    statusCount[
      lead.status
    ]++;
  });

  new Chart(

    document.getElementById(
      "leadChart"
    ),

    {

      type:"bar",

      data:{

        labels:[
          "New",
          "Contacted",
          "Converted"
        ],

        datasets:[{

          label:"Leads",

          data:[
            statusCount.New,
            statusCount.Contacted,
            statusCount.Converted
          ]
        }]
      }
    }
  );
}