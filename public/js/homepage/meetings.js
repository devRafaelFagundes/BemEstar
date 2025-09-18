import { genBlurElement, removeBlurScreen, showOnScreen, getClients } from "./utils.js";

const createMeetingBtn = document.getElementById("add-meeting");
const createScreen = document.getElementById("meeting-post");
const meetingSpace = document.getElementById("meetings");
const createMeetingButton = document.getElementById("createMeetingButton");
const clientsToAssignMeeting = document.getElementById("clientsToAssignMeeting");
const cancelCreateMeeting = document.getElementById("cancelCreateMeeting");
const refreshMeetings = document.getElementById("refreshMeetings");
const noMeetings = document.getElementById("no-meetings");




let globalClients = [];
let selectedClients = [];

async function addGlobalClientsContent() {
  globalClients = await renderClientsToAssignMeeting();
}
addGlobalClientsContent();

createMeetingBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  createScreen.classList.add("appearScreen");
  genBlurElement();
});

createScreen?.addEventListener("click", (e) => {
  e.stopPropagation();
});

window.addEventListener("click", async (ev) => {
  const clickedInsideCreateScreen = !!ev.target.closest("#meeting-post");
  const clickedOnCreateMeeting = !!ev.target.closest("#add-meeting");
  if (!clickedInsideCreateScreen && !clickedOnCreateMeeting) {
    createScreen.classList.remove("appearScreen");
    await removeBlurScreen();
  }
});

cancelCreateMeeting?.addEventListener("click", async () => {
  createScreen.classList.remove("appearScreen");
  await removeBlurScreen();
});

refreshMeetings?.addEventListener("click", () => {
  findMeetings();
});

function escapeHTML(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatDate(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt)) return "—";
  return dt.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatDateTime(d) {
  if (!d) return "—";
  const dt = new Date(d);
  if (isNaN(dt)) return "—";
  return dt.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function shortId(id) {
  if (!id) return "—";
  const s = String(typeof id === "object" && id._id ? id._id : id);
  return s.slice(0, 8) + (s.length > 8 ? "…" : "");
}

function renderClientsField(clients) {
  if (!clients) return "—";
  if (!Array.isArray(clients)) return escapeHTML(String(clients));
  if (clients.length === 0) return "0";
  const mapped = clients.slice(0, 4).map(c => {
    if (typeof c === "object") {
      return escapeHTML(c.username || shortId(c._id || c.id));
    }
    return escapeHTML(String(c));
  });
  const more = clients.length > 4 ? ` +${clients.length - 4}` : "";
  return mapped.join(", ") + more;
}

async function findMeetings() {
  try {
    meetingSpace.innerHTML = "";
    noMeetings.hidden = true;
    const res = await fetch("/meetings?done=false", {
      method: "GET",
      credentials: "include"
    });
    const response = await res.json();
    if (!response || !response.data || !Array.isArray(response.data) || response.data.length === 0) {
      noMeetings.hidden = false;
      return;
    }
    const allMeetings = response.data;
    allMeetings.forEach(meeting => {
      const li = document.createElement("li");
      li.className = "meeting-item";
      const topic = escapeHTML(meeting.topic || "Sem título");
      const date = formatDate(meeting.date);
      const createdAt = formatDateTime(meeting.createdAt);
      const link = meeting.link ? `<a href="${escapeHTML(meeting.link)}" target="_blank" rel="noopener">${escapeHTML(meeting.link)}</a>` : "—";
      const clientsField = renderClientsField(meeting.clients);
      const professionalField = (meeting.professional && meeting.professional.username)
        ? escapeHTML(meeting.professional.username)
        : shortId(meeting.professional);
      const statusClass = meeting.done ? "done" : "pending";
      li.innerHTML = `
        <article class="meeting-card ${statusClass}">
          <header class="meeting-card-header">
            <h3 class="meeting-title">${topic}</h3>
            <div class="meeting-badges">
              <button class="badge ${meeting.done ? 'badge-done' : 'badge-pending'}" style="color: blue;">${meeting.done ? 'Concluída' : 'Pendente'}</button>
            </div>
          </header>
          <div class="meeting-card-body">
            <div class="field"><strong>Data:</strong> ${date}</div>
            <div class="field"><strong>Link:</strong> ${link}</div>
            <div class="field"><strong>Clientes:</strong> ${clientsField}</div>
            <div class="field"><strong>Profissional:</strong> ${professionalField}</div>
          </div>
          <footer class="meeting-card-footer">
            <span class="created">Criada: ${createdAt}</span>
          </footer>
        </article>
      `;
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Deletar";
      deleteBtn.classList.add('badge-pending')
      deleteBtn.classList.add('badge')
      deleteBtn.addEventListener("click", () => deleteMeeting(meeting._id));

      const badgeContainer = li.querySelector('.meeting-badges')
      badgeContainer.appendChild(deleteBtn)
      meetingSpace.appendChild(li);

    });
  } catch (err) {
    meetingSpace.innerHTML = `<li class="error">Erro ao carregar reuniões</li>`;
  }
}
findMeetings();

async function renderClientsToAssignMeeting() {
  const clients = await getClients();
  if (!clients || typeof clients === "string") {
    clientsToAssignMeeting.innerHTML = `<p class="no-clients">${escapeHTML(String(clients || "Nenhum cliente"))}</p>`;
    return [];
  }
  clientsToAssignMeeting.innerHTML = "";
  clients.forEach(client => {
    const clientContainer = document.createElement("button");
    clientContainer.type = "button";
    clientContainer.className = "client-btn";
    clientContainer.dataset.id = client._id || client.id || "";
    clientContainer.innerText = client.username || shortId(client._id || client.id);
    clientsToAssignMeeting.append(clientContainer);
  });
  return clients;
}

clientsToAssignMeeting.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  e.target.classList.toggle("selectedClient");
  const clientId = e.target.dataset.id;
  const clientObject = globalClients.find(obj => (obj._id || obj.id) === clientId || obj.username === e.target.innerText);
  if (!clientObject) return;
  const alreadySelected = selectedClients.some(c => (c._id || c.id) === (clientObject._id || clientObject.id));
  if (clientObject && !alreadySelected) {
    selectedClients.push(clientObject);
  } else if (clientObject && alreadySelected) {
    selectedClients = selectedClients.filter(c => (c._id || c.id) !== (clientObject._id || clientObject.id));
  }
});

createMeetingButton.addEventListener("click", async () => {
  const topic = document.getElementById("topic");
  const link = document.getElementById("link");
  const date = document.getElementById("date");
  const clientsIds = selectedClients.map(c => c._id || c.id).filter(Boolean);
  if (!date.value) return;
  if (!clientsIds.length) return;
  const res = await fetch("/meetings/create-meeting", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: topic.value,
      link: link.value,
      date: date.value,
      clients: clientsIds
    })
  });
  const data = await res.json();
  if (data && data.success) {
    createScreen.classList.remove("appearScreen");
    await removeBlurScreen();
    selectedClients = [];
    document.getElementById("create-meeting-form")?.reset();
    addGlobalClientsContent();
    findMeetings();
  } else {
    findMeetings();
  }
});

const deleteMeeting = async (meetingId) => {
  const data  = await fetch(`/meetings/delete/${meetingId}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  const res = await data.json()
  if(res.success) {
    alert('meeting deleted successfully')
  }
  else {
    alert('something went wrong')
    console.log("Meeting not deleteed:", res)
  }
}