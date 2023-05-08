import { Button, styled } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import { StlViewer } from "react-stl-viewer";
import {
  ControlSection,
  SelectControl,
  SliderControl,
} from "../components/Form";
import { BinParams, makeBin } from "../lib/api";

export const MakePage = () => {
  const [loading, setLoading] = useState(false);
  const [dirty, setDirty] = useState(true);
  const [error, setError] = useState<string>();
  const [stlUrl, setStlUrl] = useState("");
  const [params, setParams] = useState<BinParams>({
    size_x: 1,
    size_y: 1,
    size_z: 3,
    div_x: 1,
    div_y: 1,
    tab: 1,
    scoop: 1,
    lip: 0,
  });

  const make = async () => {
    try {
      setError(undefined);
      setLoading(true);
      const res = await makeBin(params);
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
        <ControlSection title="Size">
          <SliderControl
            name="X"
            value={params.size_x}
            min={1}
            max={20}
            step={1}
            onChange={(val) =>
              setParams((current) => ({ ...current, size_x: val }))
            }
          />
          <SliderControl
            name="Y"
            min={1}
            max={20}
            step={1}
            value={params.size_y}
            onChange={(val) =>
              setParams((current) => ({ ...current, size_y: val }))
            }
          />

          <SliderControl
            name="Z"
            min={1}
            max={20}
            step={1}
            value={params.size_z}
            onChange={(val) =>
              setParams((current) => ({ ...current, size_z: val }))
            }
          />
        </ControlSection>
        <ControlSection title="Divisions">
          <SliderControl
            name="X"
            min={0}
            max={params.size_x * 3}
            step={1}
            value={params.div_x}
            onChange={(val) =>
              setParams((current) => ({ ...current, div_x: val }))
            }
          />

          <SliderControl
            name="Y"
            min={0}
            max={params.size_y * 3}
            step={1}
            value={params.div_y}
            onChange={(val) =>
              setParams((current) => ({ ...current, div_y: val }))
            }
          />
        </ControlSection>
        <ControlSection title="Features">
          <SelectControl
            name="Tab"
            value={params.tab}
            options={{
              0: "Full",
              1: "Auto",
              2: "Left",
              3: "Center",
              4: "Right",
              5: "None",
            }}
            onChange={(val) =>
              setParams((current) => ({ ...current, tab: val }))
            }
          />
          <SelectControl
            name="Lip"
            value={params.lip}
            options={{
              0: "Regular lip",
              1: "remove lip subtractively",
              2: "Remove lip and retain height",
            }}
            onChange={(val) =>
              setParams((current) => ({ ...current, lip: val }))
            }
          />
          <SliderControl
            name="Scoop"
            min={0}
            max={1}
            step={0.1}
            value={params.scoop}
            onChange={(val) =>
              setParams((current) => ({ ...current, scoop: val }))
            }
          />
        </ControlSection>
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
