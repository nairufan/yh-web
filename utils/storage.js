const prefix = 'yh_storage_';
const localStorage = window.localStorage;
function setItem(key, value) {
    if (localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}

function getItem(key) {
    if (localStorage) {
        return localStorage.getItem(key);
    }
}

function removeItem(key) {
    if (localStorage) {
        return localStorage.removeItem(key);
    }
}

export { setItem , getItem, removeItem }
