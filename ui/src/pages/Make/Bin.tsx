import React, { useEffect, useState } from "react";
import {
  ControlSection,
  SliderControl,
  SelectControl,
} from "../../components/Form";
import { BinParams } from "../../lib/api";

const sizeValueFormat = (unit: number) => (val: number) =>
  `${val}x (${val * unit}mm)`;

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
          valueFormat={sizeValueFormat(42)}
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
          valueFormat={sizeValueFormat(42)}
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
          valueFormat={sizeValueFormat(7)}
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
          options={[
            { value: 0, label: "Full" },
            { value: 1, label: "Auto" },
            { value: 2, label: "Left" },
            { value: 3, label: "Center" },
            { value: 4, label: "Right" },
            { value: 5, label: "None" },
          ]}
          onChange={(val) => setParams((current) => ({ ...current, tab: val }))}
        />
        <SelectControl
          name="Lip"
          value={params.lip}
          options={[
            { value: 0, label: "Regular" },
            { value: 1, label: "No lip" },
            { value: 2, label: "No lip, retain height" },
          ]}
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
          valueFormat={(val) => `${val * 100}%`}
        />
      </ControlSection>
    </>
  );
};
