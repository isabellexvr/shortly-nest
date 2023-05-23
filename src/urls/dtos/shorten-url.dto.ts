import { IsUrl } from "class-validator";

export class ShortenUrlDTO {
    @IsUrl()
    url: string;
}