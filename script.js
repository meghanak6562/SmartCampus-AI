const demoAnswers = {
  "where is the library?":
    "The library is in the main academic block. In the final version, we will replace this demo information with your college's actual location.",

  "how do i report a campus problem?":
    "Go to 'Report Issue', describe the problem and location, and submit it.",

  "what are the college timings?":
    "The demo college timings are 9:00 AM to 4:30 PM, Monday to Friday. Replace this with your college's actual timings.",

  "what notices are available?":
    "Current demo notices include internal assessment updates, student services information and upcoming campus events."
};


function addMessage(text, type) {
  const chat = document.getElementById("chat");

  const div = document.createElement("div");
  div.className = "message " + type;
  div.textContent = text;

  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}


function ask(q) {
  document.getElementById("question").value = q;
  sendMessage();
}


async function sendMessage() {

  const input = document.getElementById("question");
  const q = input.value.trim();

  if (!q) return;

  // Show user's message
  addMessage(q, "user");

  input.value = "";

  // Show temporary message
  addMessage("Thinking...", "ai");

  try {

    const response = await fetch("/api/chat", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        message: q
      })
    });


    const data = await response.json();


    // Remove "Thinking..."
    const chat = document.getElementById("chat");

    if (chat.lastChild) {
      chat.removeChild(chat.lastChild);
    }


    if (!response.ok) {
      throw new Error(data.error || "AI request failed");
    }


    addMessage(data.reply, "ai");


  } catch (error) {

    const chat = document.getElementById("chat");

    if (chat.lastChild) {
      chat.removeChild(chat.lastChild);
    }

    addMessage(
      "Sorry, I couldn't connect to the AI right now. Please try again.",
      "ai"
    );

    console.error(error);
  }
}


// Smart Complaint Form
document
  .getElementById("reportForm")
  .addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const issue = document.getElementById("issue").value;

    const result = document.getElementById("reportResult");

    result.textContent =
      `✓ Issue submitted by ${name}. Location: ${location}. AI classification will be added next.`;

    this.reset();
  });


// Mobile menu
function toggleMenu() {

  const nav = document.querySelector("nav");

  nav.style.display =
    nav.style.display === "flex" ? "none" : "flex";

  nav.style.position = "absolute";
  nav.style.top = "72px";
  nav.style.right = "5%";
  nav.style.flexDirection = "column";
  nav.style.background = "#0b1020";
  nav.style.padding = "18px";
  nav.style.border = "1px solid #24314d";
  nav.style.borderRadius = "12px";
}
