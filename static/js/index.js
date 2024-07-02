document.addEventListener('DOMContentLoaded', (event) => {
    console.log("JavaScript loaded successfully");

    const form = document.getElementById('user-form');
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            console.log("Form submission intercepted");

            const formData = new FormData(form);
            const data = {
                username: formData.get('username'),
                'personal-email': formData.get('personal-email'),
                'company-email': formData.get('company-email')
            };

            console.log("Data: ", data);

            try {
                const response = await fetch('https://0rkvlat7qj.execute-api.us-east-1.amazonaws.com/dev', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                console.log("Request sent");

                const result = await response.json();

                if (response.ok) {
                    if (response.status === 200) {
                        alert(result.message || 'User added successfully');
                        window.location.href = `users.html?company_domain=${data['company-email'].split('@')[1]}`;
                    } else if (response.status === 400) {
                        alert(result.message || 'User with the same company email already exists');
                    } else {
                        throw new Error('Failed to add user');
                    }
                } else {
                    throw new Error('Network response was not ok');
                }

            } catch (error) {
                console.error('Error:', error);
            }
        });
    } else {
        console.error("Form element not found");
    }
});
