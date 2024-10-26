const projects = [
  {
    name: "Solar Project Alpha",
    location: "California, USA",
    sharePrice: 50,
    energySaved: 1200,
    carbonSavings: 300,
  },
  {
    name: "Solar Project Beta",
    location: "Arizona, USA",
    sharePrice: 45,
    energySaved: 1100,
    carbonSavings: 250,
  },
  {
    name: "Solar Project Gamma",
    location: "Nevada, USA",
    sharePrice: 60,
    energySaved: 1400,
    carbonSavings: 350,
  },
];

let totalInvestment = 0;

function displayProjects() {
  const projectsGrid = document.getElementById("projectsGrid");
  projectsGrid.innerHTML = "";
  projects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>Location: ${project.location}</p>
            <p>Share Price: $${project.sharePrice}</p>
            <p>Energy Saved: ${project.energySaved} kWh</p>
            <p>Carbon Savings: ${project.carbonSavings} kg</p>
            <button class="invest-btn" data-index="${index}">Invest Now</button>
        `;
    projectsGrid.appendChild(projectCard);
  });
}

function displayFeaturedProjects() {
  const featuredProjectsGrid = document.getElementById("featuredProjectsGrid");
  featuredProjectsGrid.innerHTML = "";
  const featuredProjects = projects.slice(0, 2); // Example: take first 2 projects
  featuredProjects.forEach((project, index) => {
    const projectCard = document.createElement("div");
    projectCard.classList.add("project-card");
    projectCard.innerHTML = `
            <h3>${project.name}</h3>
            <p>Location: ${project.location}</p>
            <p>Share Price: $${project.sharePrice}</p>
        `;
    featuredProjectsGrid.appendChild(projectCard);
  });
}

function showModal(index) {
  const project = projects[index];
  document.getElementById(
    "investmentDetails"
  ).innerText = `Investing $${project.sharePrice} in ${project.name}`;
  document.getElementById("investmentModal").style.display = "block";
}

function closeModal() {
  document.getElementById("investmentModal").style.display = "none";
}

function calculateImpact() {
  const investmentAmount = document.getElementById("investmentAmount").value;
  const energySaved = investmentAmount * 24; // Example calculation
  const carbonSaved = investmentAmount * 0.5; // Example calculation
  document.getElementById(
    "impactResult"
  ).innerText = `Your investment will save approximately ${energySaved} kWh of energy and ${carbonSaved} kg of carbon emissions!`;

  // Create graph
  const ctx = document.getElementById("impactChart").getContext("2d");
  const impactChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Energy Saved (kWh)", "Carbon Savings (kg)"],
      datasets: [
        {
          label: "Impact of Investment",
          data: [energySaved, carbonSaved],
          backgroundColor: [
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 99, 132, 0.6)",
          ],
          borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Show the chart
  document.getElementById("impactChart").style.display = "block";
}

function addReview() {
  const reviewText = prompt("Enter your review:");
  if (reviewText) {
    const reviewsLog = document.getElementById("reviewsLog");
    const newReview = document.createElement("p");
    newReview.innerText = reviewText;
    reviewsLog.appendChild(newReview);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayProjects();
  displayFeaturedProjects(); // Display featured projects

  document
    .getElementById("projectsGrid")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("invest-btn")) {
        const index = e.target.getAttribute("data-index");
        showModal(index);
      }
    });

  document.getElementById("closeModal").onclick = closeModal;

  document.getElementById("confirmInvestment").onclick = function () {
    const index = document
      .querySelector(".invest-btn[data-index]")
      .getAttribute("data-index");
    const project = projects[index];
    totalInvestment += project.sharePrice;
    document.getElementById("totalInvestment").innerText =
      totalInvestment.toFixed(2);
    alert("Investment confirmed!");
    closeModal();
  };

  document.getElementById("authForm").onsubmit = function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    alert(`Logged in as ${email}`);
    showSection("dashboard");
  };

  document.getElementById("toggleLink").onclick = function (e) {
    e.preventDefault();
    const formTitle = document.getElementById("formTitle");
    const signupFields = document.getElementById("signupFields");
    if (signupFields.style.display === "none") {
      formTitle.innerText = "Sign Up for an Account";
      signupFields.style.display = "block";
      this.innerText = "Already have an account? Login here";
    } else {
      formTitle.innerText = "Login to Your Account";
      signupFields.style.display = "none";
      this.innerText = "Sign up here";
    }
  };

  document.getElementById("newsletterForm").onsubmit = function (e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Thank you for subscribing, ${email}!`);
  };
});

function showSection(sectionId) {
  const sections = document.querySelectorAll("section");
  sections.forEach((section) => (section.style.display = "none"));
  document.getElementById(sectionId).style.display = "block";
  if (sectionId === "investment") {
    displayProjects();
  }
}
