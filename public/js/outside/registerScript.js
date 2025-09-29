const inner = document.querySelector('.inner');
const registerButton = document.getElementById('registerButton');
const loginButton = document.getElementById('loginButton');
const serverFeedback = document.getElementById('serverFeedback');
const loginFeedback = document.getElementById('feedbackLogin');
const changeButton = document.querySelectorAll('.move');

function show(el, msg, ok = false) {
  if (!el) return;
  el.innerText = msg || '';
  el.style.color = ok ? '#064e03' : 'red';
  el.style.visibility = msg ? 'visible' : 'hidden';
}

registerButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const username = document.querySelector('#register input[name="username"]').value;
  const email = document.querySelector('#register input[name="email"]').value;
  const password = document.querySelector('#register input[name="password"]').value;
  const role = document.querySelector('#register select').value;

  if (!username || !email || !password || !role) {
    show(serverFeedback, 'Preencha todos os campos.', false);
    return;
  }

  let res;
  try {
    res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, role })
    });
  } catch (err) {
    show(serverFeedback, 'Erro de conexão. Tente novamente.', false);
    return;
  }

  let payload = null;
  let text = null;
  payload = await res.clone().json().catch(() => null);
  if (!payload) text = await res.clone().text().catch(() => null);

  const serverMessage = (payload && (payload.message || payload.error || payload.msg)) || text || res.statusText || 'Resposta inválida do servidor';
  const successFlag = (payload && payload.success) || res.ok;

  show(serverFeedback, serverMessage, successFlag);

  if (successFlag) {
    console.log('Registro OK:', serverMessage);
  }
});

loginButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const username = document.querySelector('#login input[name="username"]').value;
  const email = document.querySelector('#login input[name="email"]').value;
  const password = document.querySelector('#login input[name="password"]').value;

  let res;
  try {
    res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
  } catch (err) {
    show(loginFeedback, 'Erro de conexão. Tente novamente.', false);
    return;
  }

  let payload = null;
  let text = null;
  payload = await res.clone().json().catch(() => null);
  if (!payload) text = await res.clone().text().catch(() => null);

  const serverMessage = (payload && (payload.message || payload.error || payload.msg)) || text || res.statusText || 'Resposta inválida do servidor';
  const successFlag = (payload && payload.success) || res.ok;

  show(loginFeedback, serverMessage, successFlag);

  if (successFlag) {
    window.location.href = '/home';
  }
});

changeButton.forEach(btn => {
  btn.addEventListener('click', () => {
    inner.classList.toggle('rotate');
    show(serverFeedback, '', false);
    show(loginFeedback, '', false);
  });
});