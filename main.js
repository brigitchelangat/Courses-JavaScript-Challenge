
function main(){
    const myDiv = document.querySelector("#courseList");

fetch("/courses.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
     data.courses.forEach(post => {
       // Map instructor to image
       const instructorImages = {
        'Ngeno Victor': 'images/ngeno.png',
        'Brigit Chelangat': 'images/brigitimage.jpeg',
        'Roy Kiprop': 'images/roy.jpg'

      };

      const DomainImages = {
        'Software Engineering': 'images/SE.jpg',
        'User Interface Design': 'images/UI.png',
        'Web Development': 'images/Web.jpg',
        'Cloud Computing': 'images/Cloud.jpg',
        'Data Science': 'images/DataS.jpg',
        'Artificial Intelligence': 'images/AI.jpg'

      };

      // Determine the image source based on the instructor name
      const instructorImageSrc = instructorImages[post.instructor] || 'images/default.png'; 
      const domainImageSrc = DomainImages[post.domain] || 'images/default.png'; 

    myDiv.innerHTML += `
     <div class="col-12 col-lg-3 col-md-6 mb-2">
      <div class="card">
       <div class="card-body">
       <img
                    src="${domainImageSrc}"
                    alt="Logo"
                    class="img-fluid"
                    width="40"
                    height="40"
                    style="border-radius: 50px"
                  />
        <p style="
            font-weight: 500;
            font-size: 15px;
            margin-bottom: 7px;
          ">
          ${post.title}
       
        </p>
        
        <img src="${instructorImageSrc}" alt="Logo" class="img-fluid" width="25" height="25" style="border-radius: 50px" />
        <span style="font-weight: 400; font-size: 11px; color: gray">${post.instructor}</span>
        <p style="margin-bottom: 5px">
          <i class="bi bi-book" style="
              font-size: 10px;
              color: blue;
              line-height: 1;
              font-weight: 500 !important;
              text-align: center;
              margin-left: 1px;
            "></i>
          <span style="
              font-weight: 400;
              font-size: 10px;
              color: gray;
              line-height: 1;
            ">${post.lessons} Lessons</span>
          <i class="bi bi-clock" style="
              font-size: 9px;
              color: blue;
              line-height: 1;
              font-weight: 500 !important;
              text-align: center;
              margin-left: 15px;
            "></i>
          <span style="font-weight: 400; font-size: 10px; color: gray">${post.hours} Hours</span>
        </p>
        
       </div>
      </div>
     </div>
    `;
    

    });
  })
  .catch((error) => console.error("Error loading JSON file", error));
}
main();

function enroll(courseId) {
    $('#checkoutModal').modal('show');
    $('#proceedCheckout').off('click').on('click', function() {
        $('#checkoutModal').modal('hide');
        displayToast('You have successfully enrolled for this course.', true);
        // Send enrollment email
    });
}

