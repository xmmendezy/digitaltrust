import {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Redirect,
	Req,
	Res,
	Body,
	Param,
	Query,
	Render,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response, NextFunction } from 'express';

type RequestApi = Request;

export {
	Controller,
	Get,
	Post,
	Patch,
	Delete,
	Redirect,
	Req,
	Res,
	Body,
	Param,
	Query,
	Render,
	UploadedFile,
	UseInterceptors,
	FileInterceptor,
	RequestApi as Request,
	Response,
	NextFunction,
};
