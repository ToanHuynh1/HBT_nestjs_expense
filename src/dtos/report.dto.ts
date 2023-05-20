import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"
import { ReportType } from "src/data"
import { Exclude, Expose } from "class-transformer"

export class CreateReportDto {

    @IsNotEmpty()
    @IsNumber()
    // kiểm tra dương
    @IsPositive()
    amount: number

    @IsNotEmpty()
    @IsString()
    source: string
}

export class UpdateReportDto {
    // không bắt buộc có giá trị
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    // kiểm tra dương
    @IsPositive()
    amount: number

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    source: string
}

export class ReportReponseDto {
    id: string
    source: string
    amount: number

    // loại trừ phần tử
    @Exclude()
    created_at: Date

    @Exclude()
    updated_at: Date
    type: ReportType


    @Expose({name: "createdAt"})
    transformCreateAt(){
        return this.created_at
    }

    constructor(partial: Partial<ReportReponseDto>){
        Object.assign(this, partial)
    }
}