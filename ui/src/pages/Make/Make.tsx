import { Button, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { StlViewer } from "react-stl-viewer";
import { ControlSection, SelectControl } from "../../components/Form";
import { makeModel } from "../../lib/api";
import { BinControls } from "./Bin";
import { FrameControls } from "./Frame";

const controls = (type: string, onChange: (params: any) => void) => {
  switch (type) {
    case "bin":
      return <BinControls onChange={onChange} />;
    case "frame":
      return <FrameControls onChange={onChange} />;
  }
};

export const MakePage = () => {
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(true);
  const [error, setError] = useState<string>();
  const [stlUrl, setStlUrl] = useState("");
  const [modelType, setModelType] = useState("bin");
  const [params, setParams] = useState<any>({});

  const make = async () => {
    try {
      setError(undefined);
      setLoading(true);
      const res = await makeModel(modelType, params);
      setStlUrl(res.url);
      setDirty(false);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDirty(true);
  }, [params]);

  return (
    <Grid container spacing={2}>
      <Grid
        xs={8}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {error && (
          <Overlay sx={(theme) => ({ color: theme.palette.error.main })}>
            {error}
          </Overlay>
        )}
        {!error && dirty && !loading && (
          <Overlay>Click "Make" to generate your model</Overlay>
        )}
        {!error && loading && (
          <Overlay>Loading... (this can take some time)</Overlay>
        )}
        {stlUrl !== "" ? (
          <StlViewer
            url={stlUrl}
            style={{
              width: "100%",
              height: "80vh",
              opacity: dirty || loading ? 0.5 : 1,
            }}
            orbitControls
            shadows
          ></StlViewer>
        ) : (
          ""
        )}
      </Grid>
      <Grid xs={4}>
        <ControlSection>
          <SelectControl
            name="Type"
            value={modelType}
            options={{
              bin: "Bin",
              frame: "Frame",
            }}
            onChange={setModelType}
          />
        </ControlSection>
        {controls(modelType, setParams)}

        <ControlSection>
          {dirty ? (
            <Button
              onClick={() => make()}
              variant="contained"
              disabled={loading || !dirty}
              sx={{ width: "100%" }}
            >
              Make
            </Button>
          ) : (
            <Button
              download={`Bin ${params.size_x}x${params.size_y}x${params.size_z}.stl`}
              LinkComponent="a"
              variant="contained"
              disabled={loading || dirty}
              sx={{ width: "100%" }}
              href={stlUrl}
            >
              Download
            </Button>
          )}
        </ControlSection>
      </Grid>
    </Grid>
  );
};

const Overlay = styled("div")({
  position: "absolute",
  flexGrow: 1,

  zIndex: 1,
});
