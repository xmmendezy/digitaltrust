interface ITimeZone {
	id: string;
	value: string;
}

interface ICountry {
	id: string;
	name: string;
	code: string;
	locale: string;
	telephone_code: string;
	time_zones: ITimeZone[];
}


export { ICountry, ITimeZone };
