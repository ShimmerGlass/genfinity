import { useEffect, useState } from "react";
import { ControlSection, SliderControl } from "../../components/Form";
import { FrameParams } from "../../lib/api";

export const FrameControls = (props: { onChange: (params: any) => void }) => {
  const [params, setParams] = useState<FrameParams>({
    size_x: 1,
    size_y: 1,
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
      </ControlSection>
    </>
  );
};
