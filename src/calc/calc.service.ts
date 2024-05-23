/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto) {
    let expression = calcBody.expression;

    if (!/^[0-9+\-*/\s]+$/.test(expression)) {
      throw new BadRequestException('Invalid expression');
    }
    expression = expression.replace(/\s+/g, '');

    const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g);
    if (!tokens || tokens.length % 2 === 0) {
      throw new BadRequestException('Invalid expression');
    }

    const operate = (a: number, b: number, operator: string): number => {
      switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: throw new BadRequestException('Invalid operator');
      }
    };

    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      const operator = tokens[i];
      const operand = parseFloat(tokens[i + 1]);
      result = operate(result, operand, operator);
    }

    return result;
  }
}
