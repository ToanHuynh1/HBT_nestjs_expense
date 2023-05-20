import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { CreateReportDto, ReportReponseDto } from './dtos/report.dto';
import { report } from 'process';

interface Report { amount: number, source: string}


interface UpdateReport { amount?: number, source?: string}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ReportReponseDto[]{
    return data.reports.filter(report => report.type === type).map(report => new ReportReponseDto(report))
  }

  getReportById(type:ReportType , id:string): ReportReponseDto
  {
    const reponse = data.reports.filter((report) => report.type === type)
    .find(report => report.id === id)

    if (!reponse) return

    return new ReportReponseDto(reponse)
  }

  createReport(type : ReportType, {amount, source}: Report): ReportReponseDto{
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }

    data.reports.push(newReport)

    return new ReportReponseDto(newReport)
  }


  updateReport(type: ReportType, id:string , body: UpdateReport): ReportReponseDto {
    const reportToUpdate = data.reports.filter((report) => report.type === type)
    .find(report => report.id === id)

    if (!reportToUpdate) {
    return
    }       

    const reportIndex = data.reports.findIndex((report) => report.id === reportToUpdate.id)

    data.reports[reportIndex] = {
    ...data.reports[reportIndex],
    ...body,
    updated_at: new Date(),
    }

    return new ReportReponseDto(data.reports[reportIndex])
  }

  deleteReport(id:string){
    const reportIndex = data.reports.findIndex((report) => report.id === id) 
    
    if (reportIndex === -1)
    {
      return
    }

    data.reports.splice(reportIndex, 1)
    return data.reports; 
  }
}
