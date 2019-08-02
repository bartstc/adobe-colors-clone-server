import { HttpException } from './HttpException';

export class PaletteNotFoundException extends HttpException {
  constructor(id: number) {
    super(404, `Palette with id ${id} not found`);
  }
}
