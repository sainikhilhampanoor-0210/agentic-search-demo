async function ask(query, previous_order = null) {
  const response = await fetch('/api/query', {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({query, previous_order})});
  if (!response.ok) throw new Error("Service returned " + response.status);
  return response.json();
}
import { search } from './engine.mjs';
const form = document.querySelector('form');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const resultBox = event.currentTarget.querySelector('output');
  try {
  const query = form.querySelector('input').value.trim();
  if (!query) return;
  const output = form.querySelector('output');
  const {trace, answer} = await ask(query);
  output.textContent = trace + '\n\n' + answer;
  } catch { resultBox.textContent = 'The service is unavailable. Please try again.'; }
});