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
	"golang.org/x/sync/singleflight"
)

type CAD struct {
	cfg     config.Config
	sfGroup *singleflight.Group
}

func New(cfg config.Config) *CAD {
	return &CAD{
		cfg:     cfg,
		sfGroup: &singleflight.Group{},
	}
}

func (c *CAD) Make(ctx context.Context, module Module) (string, error) {
	if err := module.Validate(); err != nil {
		return "", err
	}

	id := strings.Join(module.Args(), string(rune(0)))
	h := sha256.Sum256([]byte(id))

	fileName := hex.EncodeToString(h[:]) + ".stl"
	filePath := filepath.Join(c.cfg.STL.Path, fileName)

	if _, err := os.Stat(filePath); err == nil {
		return fileName, nil
	}

	_, err, _ := c.sfGroup.Do(id, func() (interface{}, error) {
		return nil, c.gen(ctx, module, filePath)
	})
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
