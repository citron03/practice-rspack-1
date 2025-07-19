export const mount = (el) => {
  const app = document.createElement('div');
  app.innerHTML = `
    <h1>Hello from Vanilla JS!</h1>
    <button id="vanilla-btn">Click me</button>
  `;
  el.appendChild(app);

  const btn = document.getElementById('vanilla-btn');
  btn.addEventListener('click', () => {
    alert('Button clicked!');
  });
};
