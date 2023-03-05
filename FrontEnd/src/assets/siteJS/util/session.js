function setKey(name, value) {
  var curr = JSON.parse(localStorage.userSession);
  curr[name] = value;
  localStorage.userSession = JSON.stringify(curr);
}

function getKey(name) {
  var curr = JSON.parse(localStorage.userSession);
  return curr[name];
}

function deleteKey(name) {
  var curr = JSON.parse(localStorage.userSession);
  curr[name] = "";
  localStorage.userSession = JSON.stringify(curr);
}

function clearAll() {
  var curr = JSON.parse(localStorage.userSession);
  var keys = Object.keys(curr);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    curr[key] = "";
  }
  localStorage.userSession = JSON.stringify(curr);
}

function checkKey(name) {
  var curr = JSON.parse(localStorage.userSession);
  var keys = Object.keys(curr);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key == name) return true;
  }

  return false;
}

function existSession() {
  if (localStorage.getItem("userSession")) return true;
  return false;
}

function startSession() {
  localStorage.userSession = JSON.stringify({ id: 1 });
}

function destroySession() {
  localStorage.removeItem("userSession");
}

module.exports = {
  setKey,
  getKey,
  deleteKey,
  clearAll,
  checkKey,
  existSession,
  startSession,
  destroySession,
};
