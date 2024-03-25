package go_mail

import (
	"crypto/tls"
	"fmt"
	"log"
	"os"
	"path/filepath"

	"gopkg.in/gomail.v2"
)

type MailOptions struct {
	Dialer      *gomail.Dialer
	From        string
	To          []string
	Cc          []string
	Subject     string
	Body        string
	Attachments []string
}

type Template struct {
	Body string
}

type Mail struct {
	Host          string `json:"host"`
	Port          int    `json:"port"`
	User          string `json:"user"`
	Password      string `json:"password"`
	SkipVerifyTLS bool   `json:"skipVerifyTLS"`
}

func Init(config Mail) *gomail.Dialer {
	dialer := setupSMTP(config)

	return dialer
}

func setupSMTP(config Mail) *gomail.Dialer {
	// Set up SMTP server configuration
	dialer := gomail.NewDialer(config.Host, config.Port, config.User, config.Password)
	dialer.TLSConfig = &tls.Config{InsecureSkipVerify: config.SkipVerifyTLS}

	return dialer
}

func SendEmail(options *MailOptions) (bool, error) {
	m := gomail.NewMessage()
	m.SetHeader("From", options.From)
	m.SetHeader("To", options.To...)
	m.SetHeader("Cc", options.Cc...)
	// Set subject
	m.SetHeader("Subject", options.Subject)

	m.SetBody("text/html", options.Body)

	// Attach files
	for _, filePath := range options.Attachments {
		// Check if file exists
		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			fmt.Printf("Error attaching file: [%v] %v\n", filePath, err)
		}

		// Get file name
		_, fileName := filepath.Split(filePath)

		// Attach file
		m.Attach(filePath, gomail.Rename(fileName))
	}

	// Send email
	if err := options.Dialer.DialAndSend(m); err != nil {
		log.Printf("Failed to send email: %v", err)
		return false, err
	}

	return true, nil
}
