import { HttpException } from './HttpException';

export class AlreadySavedException extends HttpException {
  constructor() {
    super(400, 'palette is already saved');
  }
}
