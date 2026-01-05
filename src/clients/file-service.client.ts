import axios, { AxiosInstance } from "axios";
import FormData from "form-data";
import { FileCategory } from "../enums/file-category.enum";

export class FileServiceClient {
  private axiosInstance: AxiosInstance;

  constructor(fileServiceUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: fileServiceUrl,
    });
  }

  async uploadFiles(
    files: Express.Multer.File[],
    category: FileCategory,
    userId: string
  ): Promise<string[]> {
    if (!files || files.length === 0) {
      return [];
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    });
    formData.append("category", category);
    formData.append("userId", userId);

    const response = await this.axiosInstance.post<{ fileUrls: string[] }>(
      "/files/upload",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    return response.data.fileUrls || [];
  }

  async deleteFiles(fileUrls: string[]): Promise<void> {
    if (!fileUrls || fileUrls.length === 0) {
      return;
    }

    await this.axiosInstance.delete("/files", {
      data: { fileUrls },
    });
  }
}
