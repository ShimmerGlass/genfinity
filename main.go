package main

import (
	"flag"
	"log"

	"github.com/shimmerglass/genfinity/cad"
	"github.com/shimmerglass/genfinity/config"
	"github.com/shimmerglass/genfinity/server"
)

func main() {
	cfgPath := flag.String("cfg", "config.yaml", "Config file path")
	flag.Parse()

	cfg, err := config.Load(*cfgPath)
	if err != nil {
		log.Fatal(err)
	}

	c := cad.New(cfg)
	srv := server.New(cfg, c)

	err = srv.Run()
	if err != nil {
		log.Fatal(err)
	}
}
