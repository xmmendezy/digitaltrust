import { ValidationError, validateSync } from 'class-validator';

function extract_errors(obj: ValidationError): string[] {
	return (obj.constraints ? Object.values(obj.constraints) : []).concat(...(obj.children || []).map(extract_errors));
}

abstract class ClassBase {
	public validate(): string[] {
		return Array.from(new Set(([] as string[]).concat(...validateSync(this).map(extract_errors))));
	}
}

export { ClassBase };
