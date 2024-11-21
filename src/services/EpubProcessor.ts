import AdmZip from "adm-zip";

/**
 *
 */
export class EpubProcessor {
  contents: string[] = [];
  file: File;

  /**
   *
   * @param epub
   */
  constructor(epub: File) {
    this.file = epub;
  }

  /**
   *
   */
  async run() {
    const zip = new AdmZip(await this.fileToBuffer());
    const opfPath = this.getOpfPath(zip);
    const opfContent = zip.getEntry(opfPath)?.getData().toString("utf8");

    if (!opfContent) {
      throw new Error("Could not read OPF file");
    }

    // Get the directory containing the OPF file to resolve relative paths
    const baseDir = opfPath.split("/").slice(0, -1).join("/");
    console.log(baseDir);
  }

  /**
   *
   */
  private async fileToBuffer(): Promise<Buffer> {
    const arrayBuffer = await this.file.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   *
   * @param zip
   * @returns
   */
  private getOpfPath(zip: AdmZip): string {
    const containerEntry = zip.getEntry("META-INF/container.xml");
    if (!containerEntry) {
      throw new Error("Invalid EPUB: missing container.xml");
    }

    const containerContent = containerEntry.getData().toString("utf8");
    const match = containerContent.match(/full-path="([^"]+)"/);
    if (!match) {
      throw new Error("Could not find OPF path in container.xml");
    }
    return match[1];
  }
}
