import { IsInt, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreateExpenseDto {

  @IsString()
  @IsNotEmpty()
  expenseType: string;

  @IsInt()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  @Length(400)
  description: string;

  @IsString()
  @IsOptional()
  paymentType: string;

  // expenseAttachment: CreateExpenseAttachmentDto
}