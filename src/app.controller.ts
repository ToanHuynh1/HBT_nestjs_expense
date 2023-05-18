import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
 
@Controller('report/income')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports() {
    return [];
  }

  @Get('/:id')
  getReportById(@Param('id', ParseIntPipe) id:number){
    return {id}
  }

  @Post()
  postReports() {
    return "Created";
  }

  @Put('/:id')
  updateReports() {
    return "Updated";
  }

  @Delete('/:id')
  deleteReports() {
    return "Deleted";
  }
}
