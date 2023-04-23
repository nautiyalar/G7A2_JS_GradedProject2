document.addEventListener('DOMContentLoaded', () => {
  // Code that needs to wait for the DOM to be fully loaded goes here

  let applicants = []; // Define an empty array to store the fetched data

  function displayApplicant(applicant) {
    // Access the HTML elements and update their content
    document.getElementById('name').textContent = applicant.basics.name;
    document.getElementById('appliedFor').textContent = applicant.basics.AppliedFor;
    document.getElementById('email').textContent = applicant.basics.email;
    document.getElementById('phone').textContent = applicant.basics.phone;

    document.getElementById('network').textContent = applicant.basics.profiles.network;

    document.getElementById('name1').textContent = applicant.skills.name;
    document.getElementById('level').textContent = applicant.skills.level;
    document.getElementById('keywords').textContent = applicant.skills.keywords;
    document.getElementById('CompanyName').textContent = applicant.work['Company Name'];
    document.getElementById('Position').textContent = applicant.work.Position;
    document.getElementById('StartDate').textContent = applicant.work['Start Date'];
    document.getElementById('EndDate').textContent = applicant.work['End Date'];
    document.getElementById('Summary').textContent = applicant.work.Summary;

    document.getElementById('internship-company-name').textContent = applicant.Internship['Company Name'];
    document.getElementById('internship-position').textContent = applicant.Internship.Position;
    document.getElementById('internship-start-date').textContent = applicant.Internship['Start Date'];
    document.getElementById('internship-end-date').textContent = applicant.Internship['End Date'];
    document.getElementById('internship-summary').textContent = applicant.Internship.Summary;

    document.getElementById('project-name').textContent = applicant.projects.name;
    document.getElementById('project-description').textContent = applicant.projects.description;

    document.getElementById('ug-institute').textContent = applicant.education.UG.institute;
    document.getElementById('ug-course').textContent = applicant.education.UG.course;
    document.getElementById('ug-start-date').textContent = applicant.education.UG['Start Date'];
    document.getElementById('ug-end-date').textContent = applicant.education.UG['End Date'];
    document.getElementById('ug-cgpa').textContent = applicant.education.UG.cgpa;

    document.getElementById('ss-institute').textContent = applicant.education['Senior Secondary'].institute;
    document.getElementById('ss-cgpa').textContent = applicant.education['Senior Secondary'].cgpa;

    document.getElementById('school-institute').textContent = applicant.education['High School'].institute;
    document.getElementById('school-cgpa').textContent = applicant.education['High School'].cgpa;

    document.getElementById('summary').textContent = applicant.achievements.Summary;

    document.getElementById('hobbies').textContent = applicant.interests.hobbies;

  }

  // Function to fetch the data and store it in the applicants array
  function fetchData() {
    fetch('Data.json')
      .then(response => response.json())
      .then(data => {
        applicants = data.resume;
        displayApplicant(applicants[0]); // Call the displayApplicant function after fetching the data
      })
      .catch(error => {
        // Set the innerHTML property once
        resultsDiv.innerHTML = '<p>Error loading data</p>';
        console.log('Error loading data:', error);
      });
  }

  // Call the fetchData function to fetch the data and display the first applicant
  fetchData();


  let dataFound = true; 
  var resultsDiv = document.getElementById("results");

  // Function to display the applicant based on job applied for
  function displayApplicantByJob(job) {
    const filteredData = applicants.filter(item => item.basics.AppliedFor.toLowerCase().includes(job.toLowerCase()));
    
    console.log(filteredData.length);

    if (filteredData.length === 0) {
      // Set the innerHTML property once
      //resultsDiv.innerHTML = '<p>No results found</p>';
 
      dataFound = false;
      console.log(dataFound);

    } else {
      const result = filteredData[0];
      // Call the displayApplicant function with the filtered result object
      document.getElementById('search-input').value = ''; // Clear the search input field
      displayApplicant(result);
    
      dataFound = true;

    }


    var dataFoundElem = document.getElementById("data-found");
    var noDataFoundElem = document.getElementById("no-data-found");
    
    // toggle between the elements based on the "dataFound" variable
    console.log(dataFound);   
    if (dataFound) {
      dataFoundElem.style.display = "block";
      noDataFoundElem.style.display = "none";
    } else {
      dataFoundElem.style.display = "none";
      noDataFoundElem.style.display = "block";
    }
    
    

  }


  // Modify the form submit event listener to call the displayApplicantByJob function
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent the form from submitting
      const searchTerm = document.getElementById('search-input').value.trim();
      if (searchTerm === '') {
        resultsDiv.innerHTML = '<p>Please enter a search term</p>';
      } else {
        displayApplicantByJob(searchTerm);
      }
    });
  }

  // Add event listeners to the Next and Previous buttons
  let counter = 0;

  let nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (counter < applicants.length - 1) {
        counter++;
        displayApplicant(applicants[counter]);
      }
    });
  }

  let prevBtn = document.getElementById('prevBtn');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (counter > 0) {
        counter--;
        displayApplicant(applicants[counter]);
      }
    });
  }
});
