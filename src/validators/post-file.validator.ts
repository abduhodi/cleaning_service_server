import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export class PostFileValidator extends FileValidator {
  isValid(file?: any): boolean | Promise<boolean> {
    if (file) {
      if (
        !(
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpeg' ||
          file.mimetype == 'video/mp4'
        )
      ) {
        return false;
      }
      if (file.size > 10000000) {
        return false;
      }
    }
    return true;
  }
  buildErrorMessage(file: any): string {
    if (file) {
      if (
        !(
          file.mimetype == 'image/png' ||
          file.mimetype == 'image/jpeg' ||
          file.mimetype == 'video/mp4'
        )
      ) {
        return 'Image type must be png/jpeg/mp4';
      }
      if (file.size > 10000000) {
        return 'Image size must be less than 10 MB';
      }
    }
  }
}
