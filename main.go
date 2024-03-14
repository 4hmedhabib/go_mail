package main

import (
	"crypto/tls"
	"log"

	"github.com/4hmedhabib/go_mail/configs"
	"gopkg.in/gomail.v2"
)

type MailOptions struct {
	Dialer      *gomail.Dialer
	From        string
	To          []string
	Subject     string
	Body        string
	Attachments []string
}

type Template struct {
	Body string
}

func main() {
	configs.Configs()
	mailConfig := configs.Conf.Mail
	messageConfig := configs.Conf.Message

	dialer := setupSMTP(mailConfig)
	options := MailOptions{
		Dialer:      dialer,
		From:        messageConfig.From,
		Subject:     messageConfig.Subject,
		To:          []string{"4hmedhabib@gmail.com"},
		Body:        messageConfig.Body,
		Attachments: []string{},
	}

	SendEmail(&options)

}

func setupSMTP(config configs.Mail) *gomail.Dialer {
	// Set up SMTP server configuration
	dialer := gomail.NewDialer(config.Host, config.Port, config.User, config.Password)
	dialer.TLSConfig = &tls.Config{InsecureSkipVerify: config.SkipVerifyTLS}

	return dialer
}

func SendEmail(options *MailOptions) {
	m := gomail.NewMessage()
	m.SetHeader("From", options.From)
	m.SetHeader("To", options.To...)
	// Set subject
	m.SetHeader("Subject", options.Subject)

	m.SetBody("text/html", options.Body)

	// Attach files
	for _, file := range options.Attachments {
		m.Attach(file)
	}

	// Send email
	if err := options.Dialer.DialAndSend(m); err != nil {
		log.Fatalf("Failed to send email: %v", err)
	}

	log.Println("Email sent successfully!")
}
