export interface MakeResponse {
  url: string;
}

export interface BinParams {
  size_x: number;
  size_y: number;
  size_z: number;

  div_x: number;
  div_y: number;

  tab: number;
  scoop: number;
  lip: number;
}

export async function makeBin(params: BinParams) {
  const res = await fetch("/api/make/bin", {
    method: "POST",
    body: JSON.stringify(params),
  });
  return (await res.json()) as MakeResponse;
}
