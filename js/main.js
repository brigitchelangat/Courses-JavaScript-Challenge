
function main(){
    const myDiv = document.querySelector("#courseList");

fetch("data/courses.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
     data.forEach(post => {
        
    myDiv.innerHTML += `
     <div class="col-12 col-lg-4 col-md-6 mb-4">
      <div class="card">
       <div class="card-body">
        <img src="images/gdesign.png" alt="Logo" class="img-fluid" width="40" height="40" style="border-radius: 50px" />
        <i class="bi bi-three-dots" style="margin-left: 245px; font-size: 10px; color: gray"></i>
        <p style="
            font-weight: 500;
            font-size: 15px;
            margin-bottom: 4px;
          ">
          ${post.title}
        </p>
        <img src="images/brigitimage.jpeg" alt="Logo" class="img-fluid" width="25" height="25" style="border-radius: 50px" />
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
        <button class="btn btn-secondary" onclick="enroll(${post.id})">Enroll</button>
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
