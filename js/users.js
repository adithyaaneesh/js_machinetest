const userList = document.getElementById("userList");
const displayUsers = () => {
    userList.innerHTML = "";
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
        userList.innerHTML = "<p>No registered users found.</p>";
        return;
    }
    users.forEach((user, index) => {
        const card = document.createElement("div");
        card.classList.add("user-card");
        const name = document.createElement("h3");
        name.textContent = user.name;
        const email = document.createElement("p");
        email.textContent = "Email: " + user.email;
        const phone = document.createElement("p");
        phone.textContent = "Phone: " + user.phone;
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click",(index) => {
                deleteUser(index);
            }
        );
        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(deleteButton);
        userList.appendChild(card);
    });
}
function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));
    displayUsers();
}
displayUsers();