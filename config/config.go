package config

type Config struct {
	Server   Server   `yaml:"server"`
	STL      STL      `yaml:"stl"`
	Openscad Openscad `yaml:"openscad"`
}

type Server struct {
	ListenAddr string `yaml:"listen_addr"`
	Self       string `yaml:"self"`
}

type STL struct {
	Path string `yaml:"path"`
}

type Openscad struct {
	Path string `yaml:"path"`
}
