export class BoardClass {
  width: number = 800
  height: number = 800
  bgColor: string = '#dab490'

  constructor(data: Partial<BoardClass> = {}) {
    Object.assign(this, data);
  }
}
