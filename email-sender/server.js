const http = require("http");
const nodemailer = require("nodemailer");

const server = http.createServer((request, response) => {
    // Create a transporter object using Gmail's SMTP settings
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        port: 465,
        auth: {
            user: "your@gmail.com",
            pass: "---" // Use your actual password or app password here
        }
    });

    // Email options
    const mailOptions = {
        from: "your@gmail.com",
        to: "your@gmail.com", // Replace with the recipient's email
        subject: "Node.js Mail Testing!",
        text: "Hello, this is a text email!"
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            response.writeHead(500, { "Content-Type": "text/plain" });
            response.end("Failed to send email");
        } else {
            console.log("Email sent: " + info.response);
            response.writeHead(200, { "Content-Type": "text/plain" });
            response.end("Email sent successfully");
        }
    });
});

// Start the server on port 8080
server.listen(8080, () => {
    console.log("Server is running on http://localhost:8080");
});
