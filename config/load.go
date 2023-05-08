package config

import (
	"os"

	"gopkg.in/yaml.v2"
)

func Load(path string) (Config, error) {
	cfg := Config{}

	contents, err := os.ReadFile(path)
	if err != nil {
		return cfg, err
	}

	err = yaml.Unmarshal(contents, &cfg)
	return cfg, err
}
