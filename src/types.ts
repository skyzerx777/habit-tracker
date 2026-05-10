export interface IHabit {
	id: string;
	name: string;
	description?: string;
	icon: string;
	color: string;
	createdAt: string;
	completedDates: string[];
}
