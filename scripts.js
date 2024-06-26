let polls = [];
let editIndex = -1;

function createPoll() {
  const question = document.getElementById("poll-question").value;
  const options = document
    .getElementById("poll-options")
    .value.split("\n")
    .filter((option) => option.trim() !== "");

  if (question && options.length) {
    const poll = { question, options };
    if (editIndex === -1) {
      polls.push(poll);
    } else {
      polls[editIndex] = poll;
      editIndex = -1;
      document.querySelector("button").innerText = "Create Poll";
    }
    localStorage.setItem("polls", JSON.stringify(polls));
    renderPolls();
    document.getElementById("poll-question").value = "";
    document.getElementById("poll-options").value = "";
  } else {
    alert("Please enter a question and at least one option.");
  }
}

function renderPolls() {
  const pollList = document.getElementById("poll-list");
  pollList.innerHTML = "";
  polls.forEach((poll, index) => {
    const pollItem = document.createElement("li");
    pollItem.innerHTML = `
            <div>
                <strong>${poll.question}</strong>
                <p>${poll.options.join(", ")}</p>
            </div>
            <div>
                <button class="edit-btn" onclick="editPoll(${index})">Edit</button>
                <button class="delete-btn" onclick="deletePoll(${index})">Delete</button>
            </div>
        `;
    pollList.appendChild(pollItem);
  });
}

function editPoll(index) {
  editIndex = index;
  document.getElementById("poll-question").value = polls[index].question;
  document.getElementById("poll-options").value =
    polls[index].options.join("\n");
  document.querySelector("button").innerText = "Update Poll";
}

function deletePoll(index) {
  polls.splice(index, 1);
  localStorage.setItem("polls", JSON.stringify(polls));
  renderPolls();
}

// Load polls from local storage on page load
window.onload = function () {
  if (localStorage.getItem("polls")) {
    polls = JSON.parse(localStorage.getItem("polls"));
  }
  renderPolls();
};
