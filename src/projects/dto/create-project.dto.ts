import { IsOptional, IsString } from "class-validator";

export class CreateProjectDto {

    @IsString()
    public name: string;

    @IsString()
    public description: string;

    @IsOptional()
    public teamId: string;
}
