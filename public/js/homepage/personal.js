const serverData = JSON.parse(
  document.getElementById('server-data').textContent
);

const form = document.getElementById('personalInfo-form');

async function fetchUserPersonalInfo() {
  const data = await fetch(`/clients/personal`, {
    method: 'GET',
    credentials: 'include',
  });
  const res = await data.json()
  if (!res.success) {
    throw new Error(`Erro ${res.status}: não foi possível obter dados.`);
  }
  return res;
}

function preencherFormulario(data) {
  const undefinedMessage = 'Não informado';
  const personalInfo = data.message.personalInfo || {};
  document.getElementById('weight').value = personalInfo.weight || "";
  document.getElementById('height').value = personalInfo.height || "";
  document.getElementById('bodyfat').value = personalInfo.bodyfat || "";
  document.getElementById('goal').value = personalInfo.goal || "";
  document.getElementById('medicalCondition').value = personalInfo.medicalCondition || "";
}

async function salvarAlteracoes(event) {
  event.preventDefault();

  const formData = {
    weight: form.weight.value ? parseFloat(form.weight.value) : undefined,
    height: form.height.value ? parseFloat(form.height.value) : undefined,
    bodyfat: form.bodyfat.value  ? parseFloat(form.bodyfat.value) : undefined,
    goal: form.goal.value ? form.goal.value.trim() : undefined,
    medicalCondition: form.medicalCondition.value ? form.medicalCondition.value.trim() : undefined
  };

  const data = await fetch(`/clients/personal/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(formData)
  });
  const res = await data.json()
  if(res.success) {
    alert('Usuário atualizado com sucesso')
  }
  else {
    alert('Usuário não atualizado')
    console.log(res)
  }
}

export async function renderPersonalInfo() {
  try {
    const data = await fetchUserPersonalInfo();
    preencherFormulario(data);
  } catch (err) {
    alert(err.message);
    console.log('erro de renderPersonalInfo: ', err.message)
  }
}

form.addEventListener('submit', salvarAlteracoes);
renderPersonalInfo();
