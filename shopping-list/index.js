import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, remove, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://shopping-list-43646-default-rtdb.asia-southeast1.firebasedatabase.app/",
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemsInDB = ref(database, 'items');

const addButton = document.querySelector('#add-button');
const input = document.querySelector('#input-field');
const shoppingList = document.querySelector('#shopping-list');

onValue(itemsInDB, (snapshot) => {
    clearList();
    if (!snapshot.exists()) {
        shoppingList.innerHTML = 'No items here yet.';
        return;
    }
    let items = Object.entries(snapshot.val());

    items.forEach(item => {
        addToList(shoppingList, item);
    });
})

addButton.addEventListener('click', () => {
    const inputValue = input.value;
    push(itemsInDB, inputValue);
    clearInput(input);
});

const addToList = (shoppingList, item) => {
    let newItem = document.createElement('li');
    let itemID = item[0];
    let itemValue = item[1];
    newItem.id = itemID;
    newItem.textContent = itemValue;
    newItem.role = 'button';
    newItem.addEventListener('click', () => {
        remove(ref(database, 'items/' + itemID));
    });
    shoppingList.append(newItem);
}

const clearList = () => {
    shoppingList.innerHTML = '';
}

const clearInput = (input) => {
    input.value = '';
}