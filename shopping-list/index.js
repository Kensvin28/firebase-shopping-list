const addButton = document.querySelector('#add-button');
const input = document.querySelector('#input-field');
const shoppingList = document.querySelector('#shopping-list');

// Load items from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadItemsFromLocalStorage();
});

addButton.addEventListener('click',  () => {
    const inputValue = input.value.trim();
    if (inputValue === '') return;

    const itemID = Date.now().toString(); // Unique ID based on timestamp
    const items = getItemsFromLocalStorage();
    items[itemID] = inputValue;
    saveItemsToLocalStorage(items);
    addToList(shoppingList, [itemID, inputValue]);
    loadItemsFromLocalStorage();
    clearInput(input);
});

const addToList = (shoppingList, item) => {
    const [itemID, itemValue] = item;
    const newItem = document.createElement('li');
    newItem.id = itemID;
    newItem.textContent = itemValue;
    newItem.role = 'button';
    newItem.addEventListener('click', () => {
        const items = getItemsFromLocalStorage();
        delete items[itemID];
        saveItemsToLocalStorage(items)
        loadItemsFromLocalStorage();
    });
    shoppingList.append(newItem);
};

const clearList = () => {
    shoppingList.innerHTML = '';
};

const clearInput = (input) => {
    input.value = '';
};

const getItemsFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('shoppingItems')) || {};
};

const saveItemsToLocalStorage = (items) => {
    localStorage.setItem('shoppingItems', JSON.stringify(items));
};

const loadItemsFromLocalStorage = () => {
    clearList();
    const items = getItemsFromLocalStorage();
    const entries = Object.entries(items);

    if (entries.length === 0) {
        shoppingList.innerHTML = 'No items here yet.';
        return;
    }
    entries.forEach(item => {
        addToList(shoppingList, item);
    });
};
