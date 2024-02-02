const feedback_form_state = 'feedback-form';

const form = document.querySelector('.feedback-form');
const textarea = form.querySelector('textarea');

form.addEventListener('input', e => {
  const userEmail = form.elements.email.value;
  const userMessage = form.elements.message.value;

  const data = {
    email: userEmail,
    message: userMessage,
  };
  saveToLS(feedback_form_state, data);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const userEmail = form.elements.email.value;
  const userMessage = form.elements.message.value;
  if (userEmail && userMessage) {
    const data = loadFromLS(feedback_form_state) || {};
    console.log(data);

    localStorage.removeItem(feedback_form_state);
    form.reset();
  } else {
    alert('Please fill in both email and message fields.');
  }
});

function loadFromLS(key = 'empty') {
  const data = localStorage.getItem(key);

  try {
    const result = JSON.parse(data);
    return result;
  } catch {
    return data;
  }
}

function saveToLS(key, value) {
  const trimValue = Object.fromEntries(
    Object.entries(value).map(([key, val]) => [key, val.trim()])
  );
  const jsonData = JSON.stringify(trimValue);
  localStorage.setItem(key, jsonData);
}

function restoreData() {
  const data = loadFromLS(feedback_form_state) || {};

  form.elements.email.value = data.email || '';
  form.elements.message.value = data.message || '';
}

restoreData();
