## Installation

To use go_mail in your GoLang project, simply install the package using `go get`:
`go get -u github.com/4hmedhabib/go_mail`

# GoLang Package for Sending Emails via SMTP

***go_mail*** is a GoLang package designed to simplify the process of sending emails using SMTP (Simple Mail Transfer Protocol). This package provides an easy-to-use interface for configuring SMTP settings and sending emails with custom content.

## Features
-   **Simple Configuration**: Easily configure SMTP settings such as host, port, username, password and more.
-   **Customizable Content**: Send emails with custom subject, body, and recipients.
-   **Attachments Support**: Attach files to your emails effortlessly.
-   **Error Handling**: Comprehensive error handling for smooth debugging and troubleshooting.

## Usage
Configuration
First, you need to initialize SMTP configuration by creating a Mail object:


``` 
mailConfig := go_mail.Mail{
    Host:          "smtp.example.com",
    Port:          587,
    User:          "yourusername@example.com",
    Password:      "yourpassword",
    SkipVerifyTLS: false, // Set to true to skip TLS verification
}
```
### Initialize Dialer

Next, you need to initialize the SMTP dialer using the `Init` function:
```
dialer := go_mail.Init(mailConfig)
```

### Sending Emails

To send an email, you need to create a `MailOptions` object with the email details:

```
email := go_mail.MailOptions{
    Dialer:      dialer,
    From:        "sender@example.com",
    To:          []string{"recipient1@example.com", "recipient2@example.com"},
    Subject:     "Test Email",
    Body:        "This is a test email sent using go_mail package.",
    Attachments: []string{"file1.txt", "file2.pdf"},
}
```

Then, you can send the email using the SendEmail function:

```
success, err := go_mail.SendEmail(&email)
if err != nil {
    log.Fatalf("Error sending email: %v", err)
}

if success {
    log.Println("Email sent successfully!")
} else {
    log.Println("Failed to send email.")
}
```

## Contributing

Contributions are welcome! Please feel free to submit issues, fork the repository, and create pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
