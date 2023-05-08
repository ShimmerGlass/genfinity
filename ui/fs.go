package ui

import (
	"embed"
	"io/fs"
)

//go:embed build
var f embed.FS

func FS() fs.FS {
	sub, err := fs.Sub(f, "build")
	if err != nil {
		panic(err)
	}

	return sub
}
