import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateExpenseDto {

  @IsString()
  @IsNotEmpty()
  expenseType: string;

  @IsInt()
  @IsNotEmpty()
  value: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(400)
  description: string;

  @IsString()
  @IsOptional()
  paymentType: string;

  // expenseAttachment: CreateExpenseAttachmentDto
}