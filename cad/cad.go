package cad

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/shimmerglass/genfinity/config"
)

type Module interface {
	Args() []string
}

type CAD struct {
	cfg config.Config
}

func New(cfg config.Config) *CAD {
	return &CAD{
		cfg: cfg,
	}
}

func (c *CAD) Make(ctx context.Context, module Module) (string, error) {
	id := strings.Join(module.Args(), string(rune(0)))
	h := sha256.Sum256([]byte(id))

	fileName := hex.EncodeToString(h[:]) + ".stl"
	filePath := filepath.Join(c.cfg.STL.Path, fileName)

	if _, err := os.Stat(filePath); err == nil {
		return fileName, nil
	}

	err := c.gen(ctx, module, filePath)
	if err != nil {
		return "", err
	}

	return fileName, nil
}

func (c *CAD) gen(ctx context.Context, module Module, path string) error {
	args := []string{
		"-o", path,
		"--enable", "all",
		"--export-format", "asciistl",
	}

	args = append(args, module.Args()...)

	out := &bytes.Buffer{}

	cmd := exec.CommandContext(ctx, c.cfg.Openscad.Path, args...)
	cmd.Stderr = os.Stderr
	cmd.Stdout = out

	err := cmd.Run()
	if err != nil {
		return err
	}

	return nil
}
