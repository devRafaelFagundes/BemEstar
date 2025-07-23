const serverData = JSON.parse(
  document.getElementById('server-data').textContent
);

const form = document.getElementById('personalInfo-form');

async function fetchUserPersonalInfo() {
  const res = await fetch(`/app/${serverData.userId}`, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error(`Erro ${res.status}: não foi possível obter dados.`);
  }
  return res.json();
}

function preencherFormulario(data) {
  const personalInfo = data.message[0].personalInfo || {};
  document.getElementById('weight').value = personalInfo.weight || '';
  document.getElementById('height').value = personalInfo.height || '';
  document.getElementById('bodyfat').value = personalInfo.bodyfat || '';
  document.getElementById('goal').value = personalInfo.goal || '';
  document.getElementById('medicalCondition').value = (personalInfo.medicalCondition || []).join(', ');
}

async function salvarAlteracoes(event) {
  event.preventDefault();

  const formData = {
    weight: parseFloat(form.weight.value),
    height: parseFloat(form.height.value),
    bodyfat: parseFloat(form.bodyfat.value),
    goal: form.goal.value.trim(),
    medicalCondition: form.medicalCondition.value
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)
  };

//   const res = await fetch(`/app/${serverData.userId}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     credentials: 'include',
//     body: JSON.stringify({ personalInfo: formData })
//   });

//   if (res.ok) {
//     alert('Informações salvas com sucesso!');
//   } else {
//     alert('Erro ao salvar informações.');
//   }
// }

// export async function renderPersonalInfo() {
//   try {
//     const data = await fetchUserPersonalInfo();
//     preencherFormulario(data);
//   } catch (err) {
//     alert(err.message);
//   }
// }

// form.addEventListener('submit', salvarAlteracoes);
renderPersonalInfo();
