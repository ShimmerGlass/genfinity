package cad

import "fmt"

type Frame struct {
	SizeX int `json:"size_x,omitempty"`
	SizeY int `json:"size_y,omitempty"`
}

func (b Frame) Validate() error {
	if err := validateBetween(b.SizeX, 1, 10); err != nil {
		return fmt.Errorf("size_x: %w", err)
	}
	if err := validateBetween(b.SizeY, 1, 10); err != nil {
		return fmt.Errorf("size_y: %w", err)
	}

	return nil
}

func (b Frame) Args() []string {
	return []string{
		fmt.Sprintf("-Dgridx=%d", b.SizeX),
		fmt.Sprintf("-Dgridy=%d", b.SizeY),

		"gridfinity/gridfinity-rebuilt-baseplate.scad",
	}
}
