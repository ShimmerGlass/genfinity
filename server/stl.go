package server

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

func (s *Server) stl(rw http.ResponseWriter, r *http.Request) {
	file := filepath.Base(r.URL.Path)
	fmt.Println(file)
	filePath := filepath.Join(s.cfg.STL.Path, file)

	f, err := os.Open(filePath)
	if err == os.ErrNotExist {
		http.Error(rw, "not found", http.StatusNotFound)
		return
	}
	if err != nil {
		http.Error(rw, err.Error(), http.StatusInternalServerError)
		return
	}

	io.Copy(rw, f)
}
