import { IsUrl } from "class-validator";

export class ShortenUrlDTO {
    @IsUrl()
    originalUrl: string;
}