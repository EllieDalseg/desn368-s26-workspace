const roomText = document.getElementById("room-text");
const inventoryList = document.getElementById("inventory-list");
const tapeCountText = document.getElementById("tape-count");
const roomImage = document.getElementById("room-image");

let currentRoom = "hallway";
let tapesFound = 0;
let inventory = [];
let watchedTapes = 0;

const rooms = {
  hallway: {
    text: "A long flickering hallway stretches ahead.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop"
  },

  security: {
    text: "Old security monitors buzz quietly.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
  },

  storage: {
    text: "Dusty shelves line the room.",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop"
  }
};

function goToRoom(room) {
  currentRoom = room;

  roomText.innerText = rooms[room].text;
  roomImage.style.backgroundImage = `url(${rooms[room].image})`;
}

function searchRoom() {

  if (currentRoom === "hallway" && !inventory.includes("Tape 1")) {
    addTape("Tape 1");
    roomText.innerText = "You found VHS Tape 1 hidden under a chair.";
  }

  else if (currentRoom === "security" && !inventory.includes("Tape 2")) {
    addTape("Tape 2");
    roomText.innerText = "You found VHS Tape 2 beside the monitors.";
  }

  else if (!inventory.includes("Tape 3")) {
    addTape("Tape 3");
    roomText.innerText = "You found VHS Tape 3 inside a dusty box.";
  }

  else {
    roomText.innerText = "You search carefully, but find nothing.";
  }
}

function addTape(tapeName) {
  inventory.push(tapeName);
  tapesFound++;

  tapeCountText.innerText = tapesFound;

  const li = document.createElement("li");
  li.innerText = tapeName;
  inventoryList.appendChild(li);
}

function watchTape() {

  if (currentRoom !== "security") {
    roomText.innerText = "You need to be in the Security Room to watch tapes.";
    return;
  }

  if (inventory.length === 0) {
    roomText.innerText = "You don't have any tapes to watch.";
    return;
  }

  watchedTapes++;

  if (watchedTapes === 1) {
    roomText.innerText = "Tape 1 shows a message: 'The exit code starts with 4.'";
  }

  else if (watchedTapes === 2) {
    roomText.innerText = "Tape 2 shows a hallway with the number 7 painted on a wall.";
  }

  else if (watchedTapes === 3) {
    roomText.innerText = "Tape 3 reveals the final code: 472. The exit door unlocks.";

    setTimeout(() => {
      alert("YOU ESCAPED!");
    }, 1000);
  }
}

// Starting room
goToRoom("hallway");