import { Logger } from '@nestjs/common';

export class Log {
  static log(tag: string, message: string) {
    const logger = new Logger(tag);
    logger.log(message);
  }

  static info(tag: string, message: string) {
    const logger = new Logger(tag);
    logger.log(message);
  }
  static error(tag: string, message: string) {
    const logger = new Logger(tag);
    logger.error(message);
  }

  static warn(tag: string, message: string) {
    const logger = new Logger(tag);
    logger.warn(message);
  }

  static debug(tag: string, message: string) {
    const logger = new Logger(tag);
    logger.debug(message);
  }

  static verbose(tag: string, message: string) {
    const logger = new Logger(tag);
    logger.verbose(message);
  }

  static logObject(tag: string, message: any) {
    Log.log(tag, `\n${JSON.stringify(message, null, 2)}`);
  }

  static errorObject(tag: string, message: any) {
    Log.error(tag, `\n${JSON.stringify(message, null, 2)}`);
  }

  static warnObject(tag: string, message: any) {
    Log.warn(tag, `\n${JSON.stringify(message, null, 2)}`);
  }

  static debugObject(tag: string, message: any) {
    Log.debug(tag, `\n${JSON.stringify(message, null, 2)}`);
  }

  static verboseObject(tag: string, message: any) {
    Log.verbose(tag, `\n${JSON.stringify(message, null, 2)}`);
  }
}
