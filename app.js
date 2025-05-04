var firebaseConfig = {
  apiKey: "AIzaSyC95HZ_K3gVeixiEYsU-kQRo4LgP2k5Bmk",
  authDomain: "thesrc-a4aa9.firebaseapp.com",
  databaseURL: "https://thesrc-a4aa9-default-rtdb.firebaseio.com",
  projectId: "thesrc-a4aa9",
  storageBucket: "thesrc-a4aa9.firebasestorage.app",
  messagingSenderId: "617984857011",
  appId: "1:617984857011:web:7dcdcd7077e1c8a18cb1c6",
  measurementId: "G-PC1N18DG3G"
};

// Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);

// To dynamically make carousel's slides change when carousel section is in view
document.addEventListener("DOMContentLoaded", function () {
  var carouselElement = document.getElementById("carouselExample");
  var carousel = new bootstrap.Carousel(carouselElement, {
    interval: 3000,
    ride: false
  });

  // Initially pause the carousel
  carousel.pause();

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0
    );
  }

  function handleScroll() {
    if (isInViewport(carouselElement)) {
      carousel.cycle();
    } else {
      carousel.pause();
    }
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("load", handleScroll);
});

// To add the .active class dynamically in the current section
window.onscroll = function () {
  var sections = ["home", "about", "courses", "admissions", "contactUs"];
  var navLinks = document.getElementsByClassName("nav-link");
  var fromTop = window.pageYOffset;

  for (var i = 0; i < sections.length; i++) {
    var section = document.getElementById(sections[i]);

    if (section) {
      var top = section.offsetTop - 100;
      var height = section.offsetHeight;

      if (fromTop >= top && fromTop < top + height) {
        for (var j = 0; j < navLinks.length; j++) {
          navLinks[j].classList.remove("active");

          if (navLinks[j].getAttribute("href") === "#" + sections[i]) {
            navLinks[j].classList.add("active");
          }
        }
      }
    }
  }
};

// Store data in database
var courses = {
  course1: {
    class: "IX",
    field: "Science",
    subjects:
      "Mathematics, Biology/Computer Science, Chemistry, Physics, English",
    admission: "open",
  },

  course2: {
    class: "X",
    field: "Science",
    subjects:
      "Mathematics, Biology/Computer Science, Chemistry, Physics, English",
    admission: "open",
  },

  course3: {
    class: "XI",
    field: "Pre Medical",
    subjects: "Chemistry, Botany, Zoology, Physics, English",
    admission: "open",
  },

  course4: {
    class: "XI",
    field: "Pre Engineering",
    subjects: "Chemistry, Mathematics, Physics, English",
    admission: "open",
  },

  course5: {
    class: "XI",
    field: "Computer Science",
    subjects: "Computer Science, Mathematics, Physics, English",
    admission: "open",
  },

  course6: {
    class: "XII",
    field: "Pre Medical",
    subjects: "Chemistry, Botany, Zoology, Physics, English",
    admission: "open",
  },

  course7: {
    class: "XII",
    field: "Pre Engineering",
    subjects: "Chemistry, Mathematics, Physics, English",
    admission: "open",
  },

  course8: {
    class: "XII",
    field: "Computer Science",
    subjects: "Computer Science, Mathematics, Physics, English",
    admission: "open",
  },
};

firebase.database().ref("courses").set(courses);

// To fetch data and display it on browser dynamically

var courseContainer = document.getElementById("course-container");

// Fetch courses from Firebase Realtime Database
firebase
  .database()
  .ref("courses")
  .on("child_added", function (data) {
    var course = data.val();

    // Create the course card HTML
    var courseCard = `
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm border-0 course-card">
          <img src="./Images/card-${data.key.slice(
            -1
          )}.jpg" class="card-img-top course-img" alt="${course.field}">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title text-primary fw-bold">${course.field} (${
      course.class
    })</h5>
            <h6 class="card-subtitle mb-2 text-muted">Subjects:</h6>
            <p class="card-text flex-grow-1">${course.subjects}</p>
            <p class="text-success fw-bold">Admission: ${course.admission}</p>
            <a href="#registrationForm" class="btn course-btn mt-auto">Enroll Now</a>
          </div>
        </div>
      </div>
    `;

    courseContainer.innerHTML += courseCard;
  });

// Registration Form

// Dynamically show radio buttons when user clicks on class

var fieldSection = document.getElementById("fieldSection");
var classRadios = document.querySelectorAll(".class-radio");

classRadios.forEach((radio) => {
  radio.addEventListener("change", function () {
    var selectedClass = this.value;
    var options = "";

    if (selectedClass === "IX" || selectedClass === "X") {
      options = `
          <label class="form-label d-block">Field</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="field" id="science" value="Science" required>
            <label class="form-check-label" for="science">Science</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="field" id="computer" value="Computer Science">
            <label class="form-check-label" for="computer">Computer Science</label>
          </div>
        `;
    } else if (selectedClass === "XI" || selectedClass === "XII") {
      options = `
          <label class="form-label d-block">Field</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="field" id="pre-medical" value="Pre Medical" required>
            <label class="form-check-label" for="pre-medical">Pre Medical</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="field" id="pre-engineering" value="Pre Engineering">
            <label class="form-check-label" for="pre-engineering">Pre Engineering</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="field" id="cs" value="Computer Science">
            <label class="form-check-label" for="cs">Computer Science</label>
          </div>
        `;
    }

    fieldSection.innerHTML = options;
  });
});

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Form submitted!");
  });

// Store data in database

var database = firebase.database();
var form = document.getElementById("registrationForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;

  // To get the selected radio btn's value
  var classRadios = document.getElementsByName("class");
  var selectedValue = null;

  for (var i = 0; i < classRadios.length; i++) {
    if (classRadios[i].checked) {
      selectedValue = classRadios[i].value;
      break;
    }
  }

  var fieldRadios = document.getElementsByName("field");
  var selectedField = null;

  for (var i = 0; i < fieldRadios.length; i++) {
    if (classRadios[i].checked) {
      selectedField = fieldRadios[i].value;
      break;
    }
  }

  database.ref("registrations").push({
    name: name,
    email: email,
    phone: phone,
    class: selectedValue,
    field: selectedField
  });

  form.reset();
});


// Submit contact form

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var contactName = document.getElementById("contactName").value;
  var contactEmail = document.getElementById("contactEmail").value;
  var contactPhone = document.getElementById("contactPhone").value;
  var contactMessage = document.getElementById("contactMessage").value;

  database.ref("contactForm").push({
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    message: contactMessage
  });

  alert("Form submitted!");
});


