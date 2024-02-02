url = "https://crudcrud.com/api/414e8ae2bb574e19b1c1f52e8017af3c/items";

function handleSubmit(event) {
  event.preventDefault();
  let item = {
    candy: event.target.candy.value,
    des: event.target.description.value,
    price: event.target.price.value,
    quantity: event.target.quantity.value,
  };

  addItem(item);
}

function createDiv(item) {
  var newItem = document.createElement("div");
  newItem.style.backgroundColor = "rgb(122, 249, 194)";
  newItem.style.borderRadius = "5px";
  newItem.innerHTML = `🍬Candy: ${item.candy} 🍬 Description: ${item.des} 🍬 Price: ${item.price} 🍬<span id = "quantity"> Quantity: ${item.quantity}</span>  `;
  newItem.id = `item_${item._id}`;

  const buy1Button = document.createElement("button");
  buy1Button.className = "buy1";
  buy1Button.textContent = "Buy 1";
  buy1Button.addEventListener("click", function () {
    buyItem(item, 1);
  });
  newItem.appendChild(buy1Button);

  const buy2Button = document.createElement("button");
  buy2Button.className = "buy2";
  buy2Button.textContent = "Buy 2";
  buy2Button.addEventListener("click", function () {
    buyItem(item, 2);
  });
  newItem.appendChild(buy2Button);

  const buy3Button = document.createElement("button");
  buy3Button.className = "buy3";
  buy3Button.textContent = "Buy 3";
  buy3Button.addEventListener("click", function () {
    buyItem(item, 3);
  });
  newItem.appendChild(buy3Button);

  const deleteButton = document.createElement("button");
  deleteButton.className = "delete";
  deleteButton.textContent = "delete";
  deleteButton.addEventListener("click", function () {
    deleteItem(item);
  });
  newItem.appendChild(deleteButton);

  var itemList = document.querySelector(".items");
  itemList.appendChild(newItem);
}

async function addItem(item) {
  try {
    let x = await axios.post(url, item);
    createDiv(x.data);
  } catch (error) {
    console.log("Error while adding item");
    console.log(error);
  }
}

async function buyItem(item, quantity) {
  try {
    if (quantity > item.quantity) {
      return alert("Sorry !!! we are out of stock...🥺");
    }
    console.log(item);
    item.quantity = item.quantity - quantity;

    let updatedItem = { ...item };
    delete updatedItem._id;
    await axios.put(url + `/${item._id}`, updatedItem);

    const listItem = document.getElementById(`item_${item._id}`);
    const quantityElement = listItem.querySelector("#quantity");
    quantityElement.textContent = ` Quantity: ${item.quantity}`;
  } catch (error) {
    console.log("Error while buying item");
    console.log(error);
  }
}

async function getItems() {
  try {
    const response = await axios.get(url);
    console.log(response);
    const candyData = response.data;
    totalItems = response.data.length;
    const div = document.querySelector(".items");
    div.innerHTML = "";
    candyData.forEach((item) => {
      createDiv(item);
    });
  } catch (error) {
    console.log(error);
  }
}
window.onload = function () {
  getItems();
};

async function deleteItem(item) {
  try {
    const element = document.getElementById(`item_${item._id}`);
    console.log(item);
    element.remove();
    console.log("Deleting item with ID:", item._id);
    await axios.delete(url + `/${item._id}`);
  } catch (error) {
    console.log("error while deleting the item");
  }
}
