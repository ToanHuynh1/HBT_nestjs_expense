import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';
import {ReportType, data} from './data';
import { report } from 'process';
import { type } from 'os';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllReports(@Param('type') type:string) {
    const reportType = (type === "income") ? ReportType.INCOME: ReportType.EXPENSE
    return data.reports.filter(report => report.type === reportType)
  }

  @Get('/:id')
  getReportById(@Param('id') id:string,
    @Param('type') type:string
  )
  {

    const reportType = (type === "income") ? ReportType.INCOME: ReportType.EXPENSE

    return data.reports.filter((report) => report.type === reportType)
                       .find(report => report.id === id)
  }

  @Post()
  postReports(@Body() {amount, source}: {
    amount: number,
    source: string
  }, @Param('type') type:string) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: (type === "income") ? ReportType.INCOME: ReportType.EXPENSE
    }

    data.reports.push(newReport)

    return {newReport};
  }

  @Put('/:id')
  updateReports(@Param('type') type:string, @Param('id') id:string , @Body() body: 
  {
    amount: number,
    source: string
  }) {

    const reportType = (type === "income") ? ReportType.INCOME: ReportType.EXPENSE

    const reportToUpdate = data.reports.filter((report) => report.type === reportType)
                       .find(report => report.id === id)
    
    if (!report) {
      return
    }       
    
    const reportIndex = data.reports.findIndex((report) => report.id === reportToUpdate.id)

    data.reports[reportIndex] = {
      ...data.reports[reportIndex],
      ...body
    }

    return data.reports[reportIndex]
  }

  @HttpCode(204)
  @Delete('/:id')
  deleteReports(@Param('id') id:string) {

    const reportIndex = data.reports.findIndex((report) => report.id === id) 
    
    if (reportIndex === -1)
    {
      return
    }

    data.reports.splice(reportIndex, 1)
    return data.reports;
  }
}
