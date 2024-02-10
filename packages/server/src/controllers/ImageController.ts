import {
  Controller,
  Inject,
  Post,
  Get,
  PathParams,
  Res,
} from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { ImageModel } from "../models/image";
import { MulterOptions, MultipartFile, PlatformMulterFile } from "@tsed/common";

@Controller("/image")
export class UploadController {
  @Inject(ImageModel) private model: MongooseModel<ImageModel>;
  @Post("/upload/:id")
  private async uploadFile(
    @MultipartFile("file") file: PlatformMulterFile,
    @PathParams("id") id: string,
    @Res() response: any
  ) {
    let image = {
      _id: id,
      data: Buffer.from(file.buffer as any, "base64"),
      type: file.mimetype,
    };
    const savedImage = new this.model(image);
    await savedImage.save();
  }
  @Get("/:id")
  public async loadImage(@PathParams("id") id: string) {
    const image = await this.model.findOne({ _id: id }).lean().exec();
    return image;
  }
  @Get("/:name/:from")
  public async findImageId(
    @PathParams("id") name: string,
    @PathParams("from") from: string
  ) {}
}
