/* eslint-disable prettier/prettier */
import { Body, Controller, Post, HttpException, HttpStatus, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CalcService } from './calc.service';
import { CalcDto } from './calc.dto';

@Controller('calc')
export class CalcController {
  constructor(private readonly calcService: CalcService) { }

  @Post('/')
  async calc(@Body() calcBody: CalcDto, @Req() req: Request, @Res() res: Response) {
    try {
      const startTime = Date.now();
      const result = await this.calcService.calculateExpression(calcBody);

      const elapsedTime = Date.now() - startTime;
      console.log(`${req.method} ${req.url}  ${res.statusCode}  ${elapsedTime} ms`);
      console.log(result)
      res.status(HttpStatus.OK).json({ result });

    }
    catch (error) {
      throw new HttpException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid expression provided',
        error: 'Bad Request'
      }, HttpStatus.BAD_REQUEST);
    }
  }

}
