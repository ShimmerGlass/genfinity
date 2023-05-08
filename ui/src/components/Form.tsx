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

export const Control = (props: { name: string; children: React.ReactNode }) => (
  <Stack direction="row" spacing={2}>
    <Typography id="input-slider" style={{ width: "40%" }}>
      {props.name}
    </Typography>
    <Box style={{ width: "60%" }}>{props.children}</Box>
  </Stack>
);

export const SliderControl = (props: {
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (val: number) => void;
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
        style={{ width: "90%" }}
      />
      <Typography style={{ width: "10%", textAlign: "right" }}>
        {props.value}
      </Typography>
    </Stack>
  </Control>
);

export const SelectControl = (props: {
  name: string;
  value: number;
  options: { [key: number]: string };
  onChange: (val: number) => void;
}) => (
  <Control name={props.name}>
    <Select
      value={props.value}
      onChange={(e) => props.onChange(parseInt(e.target.value as string))}
      size="small"
    >
      {Object.entries(props.options).map(([value, label]) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  </Control>
);
