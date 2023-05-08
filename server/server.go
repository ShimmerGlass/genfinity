package server

import (
	"net/http"

	"github.com/shimmerglass/genfinity/cad"
	"github.com/shimmerglass/genfinity/config"
	"github.com/shimmerglass/genfinity/ui"
	"github.com/sirupsen/logrus"
)

type Server struct {
	cfg config.Config

	cad *cad.CAD
}

func New(cfg config.Config, cad *cad.CAD) *Server {
	return &Server{
		cfg: cfg,
		cad: cad,
	}
}

func (s *Server) Run() error {
	uiFs := http.FS(ui.FS())

	mux := http.NewServeMux()

	mux.HandleFunc("/api/stl/", s.stl)
	mux.HandleFunc("/api/make/", s.make)

	mux.Handle("/", http.FileServer(uiFs))

	logrus.Infof("listening on %s", s.cfg.Server.ListenAddr)
	return http.ListenAndServe(s.cfg.Server.ListenAddr, mux)
}
