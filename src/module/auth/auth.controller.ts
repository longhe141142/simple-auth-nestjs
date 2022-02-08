import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Req,
  Body,
  Render,
  Redirect,
  UseFilters,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard} from "./guard/jwt.guard";
import { UserService} from "../user/user.service";
import { CreateUserDto} from "./dto/register.dto";
import { validateOrReject, validate } from 'class-validator';
import { HttpExceptionFilter} from "../../untils/http-exception.filter";
import { BaseController} from "../../base";
import { UserRepository} from "../user/user.repository";
import {User} from "../../entity/user";


@Controller('auth')
export class AuthController extends BaseController<User> {
  constructor(
      private readonly authService: AuthService,
      private readonly UserService: UserService,
  ) {
    super(authService);
  }

  @UseGuards(AuthGuard(['local']))
  @Post('login')
  @Render('/index')
  async login(@Request() req, @Body() body) {
    let data = await this.authService.login(body);
    return {
      data,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('login')
  @Render('/login/login')
  renderLogin() {
    return {
      title: 'welcome',
    };
  }

  @Post('register')
  @UseFilters(new HttpExceptionFilter())
  async create(@Req() req, @Body() body: CreateUserDto) {
    let rel = await this.authService.register(body);
    return rel;
  }

}
