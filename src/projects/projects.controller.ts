import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @MessagePattern({ cmd:'create_project' })
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @MessagePattern({ cmd:'find_all_projects' })
  findAllProjectsTeam(@Payload('id') id: string) {
    return this.projectsService.findAll(id);
  }

  @MessagePattern({ cmd:'find_one_project' })
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  @MessagePattern({ cmd:'update_project' })
  update(
    @Payload() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectsService.update(updateProjectDto.id, updateProjectDto);
  }

  @MessagePattern({ cmd:'delete_project' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.projectsService.remove(id);
  }
}
