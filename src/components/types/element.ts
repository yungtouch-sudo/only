export type Slide = {
		age: number;
		text: string;
}

export type Element = {
	id: number;
	type: string;
	slides: Slide[];
}