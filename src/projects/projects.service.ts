import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProjectsService extends PrismaClient implements OnModuleInit{
  private readonly logger = new Logger();
  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected');
  }

  create(createProjectDto: CreateProjectDto) {
    return this.project.create({
      data: createProjectDto
    });
    // return createProjectDto;
  }

  async findAll(paginationDto: PaginationDto) {

    const { page, limit } = paginationDto;

    const totalPages = await this.project.count();

    // const lastPage = Math.ceil( totalPages / limit!);

    return {
      data: await this.project.findMany({
        skip: ( page! - 1) * limit!,
        take: limit,
      }),
      meta: {
        total: totalPages,
        page,
      }
    }

  }

  async findOne(id: number) {
    const project = await this.project.findFirst({
      where: { id }
    });

    if( !project ){
      throw new NotFoundException(`Project with id ${id} not found`)
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {

    await this.findOne(id);

    const {id:_, ...data} = updateProjectDto;

    return await this.project.update({
      where: { id },
      data: data
    });
  }

  async remove(id: number) {

    await this.findOne(id);

    return this.project.delete({
      where: {id}
    });
  }
}
