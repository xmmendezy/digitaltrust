import { Controller } from '@api/http';
import { ApiService } from './api.service';

@Controller()
export class ApiController {
	constructor(private readonly apiService: ApiService) {}
}
