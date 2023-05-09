import { useEffect, useState } from "react";
import {
  ControlSection,
  SliderControl,
  SelectControl,
} from "../../components/Form";
import { BinParams } from "../../lib/api";

export const BinControls = (props: { onChange: (params: any) => void }) => {
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

  useEffect(() => {
    props.onChange(params);
  }, [params, props]);

  return (
    <>
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
          onChange={(val) => setParams((current) => ({ ...current, tab: val }))}
        />
        <SelectControl
          name="Lip"
          value={params.lip}
          options={{
            0: "Regular lip",
            1: "remove lip subtractively",
            2: "Remove lip and retain height",
          }}
          onChange={(val) => setParams((current) => ({ ...current, lip: val }))}
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
    </>
  );
};