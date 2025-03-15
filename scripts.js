document.addEventListener("DOMContentLoaded", function () {
    // Load wallet balance
    let balance = localStorage.getItem("walletBalance") || 0;
    document.getElementById("walletBalance").textContent = `$${balance}`;

    // Load transaction history
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    let transactionTable = document.getElementById("transactionHistory");

    transactions.forEach(transaction => {
        let row = `<tr>
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td><span class="status">${transaction.status}</span></td>
        </tr>`;
        transactionTable.innerHTML += row;
    });
});
