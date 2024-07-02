async function fetchUsers(companyDomain) {
    try {
        const response = await fetch(`https://0rkvlat7qj.execute-api.us-east-1.amazonaws.com/dev/users?company_domain=${companyDomain}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Parse the body property of the response data
        const users = JSON.parse(responseData.body);

        console.log('Received users:', users); // Log the received data to check its structure

        const table = document.getElementById('users-table');
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = ''; // Clear existing rows

        if (!Array.isArray(users)) {
            console.error('Expected an array of users but received:', users);
            return;
        }

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.username}</td>
                <td>${user['personal_email']}</td>
                <td>${user['company_email']}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to fetch users');
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    const params = new URLSearchParams(window.location.search);
    const companyDomain = params.get('company_domain');

    if (!companyDomain) {
        alert('No company domain provided.');
    } else {
        fetchUsers(companyDomain);
    }
});
