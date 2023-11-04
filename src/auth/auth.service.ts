import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Admin } from './models/auth.model';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin) private readonly adminModel: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async createAdmin(createAdminDto: AuthDto) {
    try {
      const exist = await this.adminModel.findOne({
        where: { username: createAdminDto.username },
      });
      if (exist) {
        throw new BadRequestException('Username is already exists');
      }
      const password = await bcrypt.hash(createAdminDto.password, 7);
      const admin = await this.adminModel.create({
        username: createAdminDto.username,
        password,
      });
      return {
        status: HttpStatus.CREATED,
        data: { admin },
        error: null,
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        error: error.message,
      };
    }
  }

  async login(loginDto: AuthDto) {
    const admin = await this.adminModel.findOne({
      where: { username: loginDto.username },
    });
    if (!admin) {
      throw new BadRequestException('username or password is incorrect');
    }
    if (!bcrypt.compareSync(loginDto.password, admin.password)) {
      throw new BadRequestException('Username or password is incorrect');
    }
    const token = this.jwtService.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      },
    );
    admin.token = token;
    await admin.save();
    return {
      status: HttpStatus.OK,
      data: { admin },
      error: null,
    };
  }

  async logout(req: any) {
    const payload = req?.user;
    const admin = await this.adminModel.findByPk(payload?.id);
    if (!admin) {
      throw new UnauthorizedException();
    }
    admin.token = '';
    await admin.save();
    return {
      status: HttpStatus.OK,
      data: { message: 'Logout success' },
      error: null,
    };
  }

  async findById(id: number) {
    return this.adminModel.findByPk(id);
  }
}
