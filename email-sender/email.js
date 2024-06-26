const sendEmail = (recipientEmail, noteContent, isContact = false, contactName = '', contactEmail = '', contactMessage = '') => {
    const apiUrl = ''; // Replace with your backend API endpoint

    let emailData;

    if (isContact) {
        // Email data for contact form submission
        emailData = {
            to: recipientEmail,
            subject: `Contact Form Submission from ${contactName}`,
            body: `
                You have received a new contact form submission:
                
                Name: ${contactName}
                Email: ${contactEmail}
                
                Message:
                ${contactMessage}
            `
        };
    } else {
        // Email data for note
        emailData = {
            to: recipientEmail,
            subject: 'Note from Notes App',
            body: noteContent
        };
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to send email');
        }
        console.log('Email sent successfully');
        // Optionally handle success response
    })
    .catch(error => {
        console.error('Error sending email:', error);
        // Optionally handle error
    });
};
