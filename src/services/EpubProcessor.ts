export class EpubProcessor {
  contents: string[] = [];
  file;
  constructor(epub: unknown) {
    this.file = epub;
  }
}

