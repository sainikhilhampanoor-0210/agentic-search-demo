import { search } from './engine.mjs';
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = form.querySelector('input').value.trim();
  if (!query) return;
  const output = form.querySelector('output');
  const {trace, answer} = search(query);
  output.textContent = trace + '\n\n' + answer;
});
