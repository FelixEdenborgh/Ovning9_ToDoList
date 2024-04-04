const ITEMS_CONTAINER = document.getElementById("items");
const ITEM_TEMPLATE = document.getElementById("itemTemplate");
const ADD_BUTTON = document.getElementById("add");

let items = getItems();
refreshList();

function getItems() {
  const value = localStorage.getItem("todo-test") || "[]";

  return JSON.parse(value);
}

function setItems(items) {
  const itemsJson = JSON.stringify(items);

  localStorage.setItem("todo-test", itemsJson);
}

function addItem() {
  items.unshift({
    // add new item on top
    description: "",
    completed: false,
  });

  setItems(items);
  refreshList();
}

function refreshList() {
  ITEMS_CONTAINER.innerHTML = "";
  items.forEach((item, index) => {
    const itemElement = ITEM_TEMPLATE.content.cloneNode(true);
    const descriptionInput = itemElement.querySelector(".item-description");
    const completedInput = itemElement.querySelector(".item-completed");
    const removeButton = itemElement.querySelector(".remove-item"); // Get the remove button

    descriptionInput.value = item.description;
    completedInput.checked = item.completed;

    descriptionInput.addEventListener("change", () => {
      updateItem(index, "description", descriptionInput.value);
    });

    completedInput.addEventListener("change", () => {
      updateItem(index, "completed", completedInput.checked);
    });

    removeButton.addEventListener("click", () => {
      removeItem(index); // Add event listener for remove button
    });

    ITEMS_CONTAINER.append(itemElement);
  });
}

function removeItem(index) {
  items.splice(index, 1); // Remove the item at the specified index
  setItems(items); // Update localStorage
  refreshList(); // Refresh the list to reflect changes
}

function updateItem(index, key, value) {
  items[index][key] = value;
  setItems(items);
}

ADD_BUTTON.addEventListener("click", () => {
  addItem();
});
