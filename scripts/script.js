const currentYear = document.getElementById("currentyear");
const lastModification = document.getElementById("lastModified");
const today = new Date();

currentYear.innerHTML = today.getFullYear();
lastModification.innerHTML = "Last Update: " + document.lastModified;




document.addEventListener('DOMContentLoaded', () => {
    const hamButton = document.querySelector('#menu');
    const navigation = document.querySelector('.navigation');

    hamButton.addEventListener('click', function() {
        navigation.classList.toggle('open');
        hamButton.classList.toggle('open');
    });

});

// chart 

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]


function displayCourses(filter = 'all') {
    const courseList = document.getElementById('course-list');
    courseList.innerHTML = ''; // Clear 
  

    const filteredCourses = courses.filter(course => {
      if (filter === 'all') return true;
      return course.subject === filter;
    });
  

    const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
  

    filteredCourses.forEach(course => {
      const courseCard = document.createElement('div');
      courseCard.classList.add('course-card');
      

      if (course.completed) {
        courseCard.classList.add('completed');
      }
  
      courseCard.innerHTML = `
      <h3>${course.subject} ${course.number}</h3>
      `;

    // Add event listener to open modal with course details
        courseCard.addEventListener('click', () => {
        displayCourseDetails(course); // Call the function to display course details
    });
 
  
      courseList.appendChild(courseCard);
    });
  

    document.getElementById('total-credits').textContent = `Total Credits: ${totalCredits}`;
  }
  
  
  document.getElementById('all').addEventListener('click', () => displayCourses('all'));
  document.getElementById('cse').addEventListener('click', () => displayCourses('CSE'));
  document.getElementById('wdd').addEventListener('click', () => displayCourses('WDD'));
  

  displayCourses();



function displayCourseDetails(course) {


    const courseDetails = document.getElementById("course-details");

    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
        <button id="closeModal"> &#10006 </button>
       <div class="modal-header">
            <h2>${course.subject} ${course.number}</h2>
            <h3>${course.title}</h3>
        </div>
        <div class="modal-body">
            <p><strong>Credits:</strong> ${course.credits}</p>
            <p><strong>Certificate:</strong> ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        </div>
        `
    courseDetails.showModal();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });

      // Event listener to close the modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === courseDetails) {
        courseDetails.close();
        }
    });




}