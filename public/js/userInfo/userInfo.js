const segments = window.location.pathname.split('/').filter(Boolean);
const userId = segments[segments.length - 1] || null;

const $ = (sel) => document.querySelector(sel);

const toast = (msg, time = 2500) => {
  const t = $('#toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => (t.style.display = 'none'), time);
};

const setAvatar = (username) => {
  const avatar = $('#avatar');
  if (!avatar || !username) return;
  avatar.textContent = username.charAt(0).toUpperCase();
};

const formatMaybe = (value, unit = '') =>
  (value === undefined || value === null || value === '' ? '—' : `${value}${unit}`);

const renderMedical = (medicalStr) => {
  const wrap = $('#medical');
  if (!wrap) return;
  wrap.innerHTML = '';
  const medicalArray = medicalStr?.split(',').map(s => s.trim()).filter(Boolean)
  if (!Array.isArray(medicalArray) || medicalArray.length === 0) {
    const p = document.createElement('p');
    p.className = 'muted';
    p.textContent = 'Nenhuma condição registrada';
    wrap.appendChild(p);
    return;
  }
  medicalArray.forEach((m) => {
    const pill = document.createElement('span');
    pill.className = 'pill';
    pill.textContent = typeof m === 'string' ? m : (m.name || JSON.stringify(m));
    wrap.appendChild(pill);
  });
};

const populate = (data) => {
  const personal = data.personalInfo || {};
  $('#nome').textContent = data.username || 'Usuário';
  $('#email').textContent = data.email || '—';
  setAvatar(data.username || data.email || 'U');
  $('#bodyfat').textContent = formatMaybe(personal.bodyfat, personal.bodyfat ? '%' : '');
  $('#goal').textContent = formatMaybe(personal.goal || personal.objective);
  $('#height').textContent = formatMaybe(personal.height, personal.height ? ' cm' : '');
  $('#weight').textContent = formatMaybe(personal.weight, personal.weight ? ' kg' : '');
  renderMedical(personal.medicalCondition ?? personal.medicalConditions ?? personal.medical ?? []);
};

const fetchUserInfo = async (id) => {
  if (!id) {
    toast('ID do usuário não encontrado na rota');
    return;
  }
  try {
    const resp = await fetch(`/clients/?specificClient=${id}`, { credentials: 'include' });
    if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
    const res = await resp.json();
    if (res && res.success && res.message) {
      populate(res.message);
      toast('Informações carregadas');
    } else {
      console.error('Resposta inesperada:', res);
      toast('Falha ao obter informações');
    }
  } catch (err) {
    console.error(err);
    toast('Erro ao buscar informações');
  }
};

const refreshBtn = document.getElementById('refreshBtn');
if (refreshBtn) refreshBtn.addEventListener('click', () => fetchUserInfo(userId));

// const editBtn = document.getElementById('editBtn');
// if (editBtn) editBtn.addEventListener('click', () => {
//   if (userId) location.href = `/clients/personal/${userId}/edit`;
// });

fetchUserInfo(userId);
