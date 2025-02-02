import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

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
  }

  async findAll(id: string) {
    return {
      data: await this.project.findMany({
        where: { teamId: id },
      })
    }
  }

  async findOne(id: number) {
    const project = await this.project.findFirst({
      where: { id }
    });

    if( !project ){
      throw new RpcException({
        message: `Project with id ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      });
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
