const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Vector para almacenar los usuarios
let userList = [];

// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];
  
  const newUser = {
    name: user.name.first,
    money: Math.floor(Math.random() * 1000000) // Genera un valor aleatorio hasta 1.000.000
  };

  addData(newUser);
}

// Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
  userList.push(obj);
  updateDOM();
}

// Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
  userList = userList.map(user => {
    return {
      name: user.name,
      money: user.money * 2
    };
  });
  
  updateDOM();
}

// Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
  userList.sort((a, b) => b.money - a.money);
  updateDOM();
}

// Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
  userList = userList.filter(user => user.money > 1000000);
  updateDOM();
}

// Función que calcula y muestra el dinero total de todos los usuarios
function calculateWealth() {
    const totalWealth = userList.reduce((total, user) => total + user.money, 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total de dinero: <strong>${formatMoney(totalWealth)}</strong></h3>`;
    main.appendChild(wealthElement);
  }

// Función que actualiza el DOM
function updateDOM() {
  main.innerHTML = '';
  userList.forEach(user => {
    const element = document.createElement('div');
    element.classList.add('person'); // Agrega la clase CSS 'person' al elemento
    element.innerHTML = `<strong>${user.name}</strong> ${formatMoney(user.money)}`;
    main.appendChild(element);
  });
}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

// Obtenemos un usuario al iniciar la app
getRandomUser();

// Event listeners
addUserBtn.addEventListener('click', getRandomUser); // No es necesario agregar los paréntesis de llamada a la función aquí
doubleBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calculateWealthBtn.addEventListener('click', calculateWealth);