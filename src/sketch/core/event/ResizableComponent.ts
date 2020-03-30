export abstract class ResizableComponent {
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  protected onResize?: (width: number, height: number) => void;

  public handleResize = (width: number, height: number) => {
    this.width = width;
    this.height = height;

    if (this.onResize) {
      this.onResize(this.width, this.height);
    }
  };
}
