import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator"

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