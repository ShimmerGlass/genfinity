package server

import (
	"encoding/json"
	"fmt"
	"net/http"
	"path/filepath"

	"github.com/shimmerglass/genfinity/cad"
)

type generateResponse struct {
	URL string `json:"url"`
}

func (s *Server) make(rw http.ResponseWriter, r *http.Request) {
	objectType := filepath.Base(r.URL.Path)

	var module cad.Module

	switch objectType {
	case "bin":
		bin := cad.Bin{}
		err := json.NewDecoder(r.Body).Decode(&bin)
		if err != nil {
			http.Error(rw, err.Error(), http.StatusBadRequest)
			return
		}

		module = bin

	default:
		http.Error(rw, "invalid object type", http.StatusBadRequest)
		return
	}

	stlFile, err := s.cad.Make(r.Context(), module)
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(rw).Encode(generateResponse{
		URL: fmt.Sprintf("%s/api/stl/%s", s.cfg.Server.Self, stlFile),
	})
}
