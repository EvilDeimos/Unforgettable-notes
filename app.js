let subBut = document.getElementById("submit");
subBut.addEventListener("click", function (e) {
  let title = document.getElementById("title");
  let text = document.getElementById("isian");
  if (title.value == "" || text.value == "") {
    alert("Please Fill All Form");
  }
  //   Add To database
  let notes = localStorage.getItem("note");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let data = {
    title: title.value,
    text: text.value,
  };

  notesObj.push(data);
  localStorage.setItem("note", JSON.stringify(notesObj));
  showNotes();
  title.value = "";
  text.value = "";
});

function showNotes() {
  let notes = localStorage.getItem("note");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
      <div class="card mt-5 me-4" style="width: 18rem">
            <div class="card-body">
              <div class="title">
                <h2 class="text-white ms-2">${element.title}</h2>
              </div>
              <div class="notes mt-3">
                <p class="text-white ms-2">${element.text}</p>
              </div>
              <div class="button-container mt-2">
                <button type="button" id="${index}" onclick="editNote(this.id)" class="btn btn-warning mt-2 text-white"><i class="fas fa-edit"></i></button>
                <button type="button" id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger mt-2"><i class="fas fa-trash-alt"></i></button>
              </div>
            </div>
          </div>
      `;
  });

  let render = document.getElementById("main");
  if (notesObj.length != 0) {
    render.innerHTML = html;
  } else {
    render.innerHTML = "";
  }
}

// Remove stuff

function deleteNote(index) {
  let notes = localStorage.getItem("note");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.splice(index, 1);
  localStorage.setItem("note", JSON.stringify(notesObj));
  showNotes();
}

// Editing Notes

function editNote(index) {
  let title = document.getElementById("title");
  let text = document.getElementById("isian");
  let notes = localStorage.getItem("note");
  if (title.value !== "" || text.value !== "") {
    return alert("Please Clear the form before editting");
  }

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  notesObj.findIndex((element, index) => {
    title.value = element.title;
    text.value = element.text;
  });

  notesObj.splice(index, 1);
  localStorage.setItem("note", JSON.stringify(notesObj));
  showNotes();
}
showNotes();
