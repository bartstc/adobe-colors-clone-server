interface CreatePaletteInput {
  name: string;
  colors: string[];
  tags?: string[];
}

export interface CreatePaletteDTO {
  input: CreatePaletteInput;
}
