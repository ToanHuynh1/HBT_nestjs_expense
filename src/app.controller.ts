import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, ParseUUIDPipe, Post, Put, ParseEnumPipe } from '@nestjs/common';
import { AppService } from './app.service';
import {ReportType, data} from './data';
import { report } from 'process';
import { type } from 'os';
import { v4 as uuid } from 'uuid';
import { CreateReportDto, ReportReponseDto, UpdateReportDto } from './dtos/report.dto';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type', new ParseEnumPipe(ReportType)) type:string): ReportReponseDto[] {
    const reportType = (type === "income") ? ReportType.INCOME: ReportType.EXPENSE
    return this.appService.getAllReports(reportType)
  }

  @Get('/:id')
  getReportById(@Param('id', ParseUUIDPipe) id:string,
    @Param('type', new ParseEnumPipe(ReportType)) type:string
  ): ReportReponseDto
  {

    const reportType = (type === "income") ? ReportType.INCOME: ReportType.EXPENSE

    return this.appService.getReportById(reportType,id)
  }

  @Post()
  postReports(@Body() {amount, source}: CreateReportDto, @Param('type', new ParseEnumPipe(ReportType)) type:string): ReportReponseDto {

    const reportType = (type === "income") ? ReportType.INCOME: ReportType.EXPENSE

    return this.appService.createReport(reportType, {amount, source})
  }

  @Put('/:id')
  updateReports(@Param('type', new ParseEnumPipe(ReportType)) type:string, @Param('id', ParseUUIDPipe) id:string , @Body() body: UpdateReportDto): ReportReponseDto {

    const reportType = (type === "income") ? ReportType.INCOME: ReportType.EXPENSE

    return this.appService.updateReport(reportType, id, body)
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteReports(@Param('id', ParseUUIDPipe) id:string) {
    return this.appService.deleteReport(id)
  }
}