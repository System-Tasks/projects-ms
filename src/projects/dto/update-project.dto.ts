import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {

    @IsNumber()
    @IsPositive()
    id: number;
}
