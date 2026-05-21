export interface IHabit {
	id: string;
	name: string;
	description?: string;
	icon: string;
	color: string;
	createdAt: string;
	completedDates: string[];
}

export interface ICalendarDay {
	date: string;
	dayNumber: number;
	currentMonth: boolean;
	today: boolean;
	completed: boolean;
}
