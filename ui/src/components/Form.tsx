import {
  Stack,
  Typography,
  Slider,
  Box,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export const ControlSection = (props: {
  children: React.ReactNode;
  title?: React.ReactNode;
}) => {
  return (
    <Box
      sx={(theme) => ({
        borderLeft: "1px solid #ddd",
        padding: theme.spacing(2),
        marginBottom: theme.spacing(2),
      })}
    >
      {props.title && (
        <Typography variant="h4" gutterBottom>
          {props.title}
        </Typography>
      )}
      {props.children}
    </Box>
  );
};

export const Control = (props: {
  name: React.ReactNode;
  children: React.ReactNode;
}) => (
  <Box
    sx={(theme) => ({
      display: "flex",
      gap: theme.spacing(2),
      marginBottom: theme.spacing(1),
      justifyContent: "space-between",
      alignItems: "center",
    })}
  >
    {typeof props.name === "string" ? (
      <Typography style={{ width: "40%", color: "#333" }}>
        {props.name}
      </Typography>
    ) : (
      props.name
    )}
    <Box style={{ width: "60%" }}>{props.children}</Box>
  </Box>
);

export const SliderControl = (props: {
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
  valueFormat?: (value: number, index: number) => React.ReactNode;
}) => (
  <Control name={props.name}>
    <Stack direction="row" spacing={2}>
      <Slider
        min={props.min}
        max={props.max}
        step={props.step}
        value={props.value}
        onChange={(e, val) => props.onChange(val as number)}
        aria-labelledby="input-slider"
        style={{ width: "70%" }}
        valueLabelFormat={props.valueFormat}
      />
      <Typography style={{ width: "30%", textAlign: "right" }}>
        {props.valueFormat ? props.valueFormat(props.value, 0) : props.value}
      </Typography>
    </Stack>
  </Control>
);

export function SelectControl<T extends string | number>(props: {
  name: React.ReactNode;
  value: T;
  options: { value: T; label: string }[];
  onChange: (val: T) => void;
}) {
  return (
    <Control name={props.name}>
      <Select
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value as T);
        }}
        size="small"
      >
        ?
        {props.options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label as string}
          </MenuItem>
        ))}
      </Select>
    </Control>
  );
}
