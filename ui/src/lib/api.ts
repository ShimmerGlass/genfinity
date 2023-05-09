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

export interface FrameParams {
  size_x: number;
  size_y: number;
}

export async function makeModel(type: string, params: any) {
  const res = await fetch(`/api/make/${type}`, {
    method: "POST",
    body: JSON.stringify(params),
  });
  return (await res.json()) as MakeResponse;
}
