interface CreatePaletteInput {
  name: string;
  colors: string[];
}

export interface CreatePaletteDTO {
  input: CreatePaletteInput;
}
