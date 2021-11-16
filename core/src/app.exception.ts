import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from '@app/http';
import { existsSync } from 'fs';
import mime from 'mime';

@Catch(HttpException)
export class AppException extends HttpException {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception.getStatus();

		if (status === 404) {
			const domain = request.get('host');
			if (request.url.startsWith('/app')) {
				let redirect = '/dt_app';
				if (domain.match('(.*)\bdigitaltrustonline\b.*')) {
					redirect = '/dt_app';
				} else if (domain.match('(.*)\btradingdiital\b.*')) {
					redirect = '/td_app';
				} else if (domain.match('(.*)\blocalhost\b.*')) {
					redirect = '/dt_app';
				}
				response.redirect(redirect);
				/* const url = '/' + request.url.split('/app/')[1];
				if (url.includes('.') && existsSync(root_dir + url)) {
					response.contentType((mime as any).getType(root_dir + url));
					response.sendFile(url, {
						root: root_dir,
					});
				} else if (existsSync(root_dir + '/index.html')) {
					response.sendFile('index.html', {
						root: root_dir,
					});
				} else {
					response.status(status).json({
						statusCode: status,
						timestamp: new Date().toISOString(),
						path: request.url,
					});
				} */
			} else {
				let root_dir = 'dt_view';
				if (domain.match('(.*)\bdigitaltrustonline\b.*')) {
					root_dir = 'dt_view';
				} else if (domain.match('(.*)\btradingdiital\b.*')) {
					root_dir = 'td_view';
				} else if (domain.match('(.*)\blocalhost\b.*')) {
					root_dir = 'dt_view';
				}
				let url = request.url;
				if (url.endsWith('/es')) {
					url = url + '/';
				}
				if (url.includes('.') && existsSync(root_dir + url)) {
					response.contentType((mime as any).getType(root_dir + url));
					response.sendFile(url, {
						root: root_dir,
					});
				} else if (url.endsWith('/') && existsSync(root_dir + '/index.html')) {
					response.sendFile(url + 'index.html', {
						root: root_dir,
					});
				} else if (existsSync(root_dir + url + '.html')) {
					response.sendFile(url + '.html', {
						root: root_dir,
					});
				} else {
					response.status(status).json({
						statusCode: status,
						timestamp: new Date().toISOString(),
						path: request.url,
					});
				}
			}
		} else {
			response.status(status).json({
				statusCode: status,
				timestamp: new Date().toISOString(),
				path: request.url,
			});
		}
	}
}