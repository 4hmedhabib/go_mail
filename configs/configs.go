package configs

import (
	"encoding/json"
	"log"
	"os"
)

type MailCompany struct {
	Name    string `json:"name"`
	Address string `json:"address"`
}

type MailMessage struct {
	From    string `json:"from"`
	Subject string `json:"subject"`
	Body    string `json:"body"`
	Company MailCompany
}

type Mail struct {
	Host          string `json:"host"`
	Port          int    `json:"port"`
	User          string `json:"user"`
	Password      string `json:"password"`
	SkipVerifyTLS bool   `json:"skipVerifyTLS"`
}

type Config struct {
	Mail    Mail        `json:"mail"`
	Message MailMessage `json:"message"`
}

var Conf Config

func Configs() {
	file, err := os.Open("config.json")

	if err != nil {
		log.Fatal("Error opening config file: ", err)
	}

	defer file.Close()

	var cfg Config

	decoder := json.NewDecoder(file)
	err = decoder.Decode(&cfg)

	if err != nil {
		log.Fatal("Failed to decode json file: ", err)
	}

	Conf = cfg
}
