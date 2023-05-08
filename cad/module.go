package cad

import (
	"fmt"

	"golang.org/x/exp/constraints"
)

type Module interface {
	Args() []string
	Validate() error
}

func validateBetween[T constraints.Float | constraints.Integer](n, min, max T) error {
	if n < min {
		return fmt.Errorf("value is less than %v", min)
	}

	if n > max {
		return fmt.Errorf("value is more than %v", max)
	}

	return nil
}
