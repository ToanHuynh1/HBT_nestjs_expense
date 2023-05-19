import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

interface Report { amount: number, source: string}

@Injectable()
export class AppService {
  getAllReports(type: ReportType){
    return data.reports.filter(report => report.type === type)

  }

  getReportById(type:string , id:string)
  {
    return data.reports.filter((report) => report.type === type)
    .find(report => report.id === id)
  }

  createReport(type : ReportType, {amount, source}: Report){
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }

    data.reports.push(newReport)

    return {newReport};
  }


  updateReport(type: ReportType, id:string , body: Report) {
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

    return data.reports[reportIndex]
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
