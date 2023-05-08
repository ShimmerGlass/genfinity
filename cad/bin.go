package cad

import "fmt"

type Bin struct {
	SizeX int `json:"size_x,omitempty"`
	SizeY int `json:"size_y,omitempty"`
	SizeZ int `json:"size_z,omitempty"`

	DivX int `json:"div_x,omitempty"`
	DivY int `json:"div_y,omitempty"`

	Tab   int     `json:"tab,omitempty"`
	Scoop float64 `json:"scoop,omitempty"`
	Lip   int     `json:"lip,omitempty"`
}

func (b Bin) Validate() error {
	if err := validateBetween(b.SizeX, 1, 20); err != nil {
		return fmt.Errorf("size_x: %w", err)
	}
	if err := validateBetween(b.SizeY, 1, 20); err != nil {
		return fmt.Errorf("size_y: %w", err)
	}
	if err := validateBetween(b.SizeZ, 1, 20); err != nil {
		return fmt.Errorf("size_z: %w", err)
	}
	if err := validateBetween(b.DivX, 0, 60); err != nil {
		return fmt.Errorf("div_x: %w", err)
	}
	if err := validateBetween(b.DivY, 0, 60); err != nil {
		return fmt.Errorf("div_y: %w", err)
	}

	if err := validateBetween(b.Tab, 0, 5); err != nil {
		return fmt.Errorf("tab: %w", err)
	}
	if err := validateBetween(b.Scoop, 0, 1); err != nil {
		return fmt.Errorf("scoop: %w", err)
	}
	if err := validateBetween(b.Lip, 0, 2); err != nil {
		return fmt.Errorf("lip: %w", err)
	}

	return nil
}

func (b Bin) Args() []string {
	return []string{
		fmt.Sprintf("-Dgridx=%d", b.SizeX),
		fmt.Sprintf("-Dgridy=%d", b.SizeY),
		fmt.Sprintf("-Dgridz=%d", b.SizeZ),

		fmt.Sprintf("-Ddivx=%d", b.DivX),
		fmt.Sprintf("-Ddivy=%d", b.DivY),

		fmt.Sprintf("-Dstyle_tab=%d", b.Tab),
		fmt.Sprintf("-Dstyle_lip=%d", b.Lip),
		fmt.Sprintf("-Dscoop=%f", b.Scoop),

		"gridfinity/gridfinity-rebuilt-bins.scad",
	}
}
