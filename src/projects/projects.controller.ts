import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  // @Post()
  @MessagePattern({ cmd:'create_project' })
  create(@Payload() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  // @Get()
  @MessagePattern({ cmd:'find_all_projects' })
  findAll( @Payload() paginationDto:PaginationDto) {
    return this.projectsService.findAll(paginationDto);
  }

  // @Get(':id')
  @MessagePattern({ cmd:'find_one_project' })
  findOne(@Payload('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  // @Patch(':id')
  @MessagePattern({ cmd:'update_project' })
  update(
    // @Param('id') id: string, 
    // @Body() updateProjectDto: UpdateProjectDto
    @Payload() updateProjectDto: UpdateProjectDto
  ) {
    return this.projectsService.update(updateProjectDto.id, updateProjectDto);
  }

  // @Delete(':id')
  @MessagePattern({ cmd:'delete_project' })
  remove(@Payload('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
