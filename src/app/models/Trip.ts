
/**
 * Represents a golf trip
 */
export class Trip {

    constructor(
        public id: number,
        public name: string,
        public description: string,
        public tripDate: any,
        public imageURL: string,
        public imageSmallURL: string,
        public coordinator: number,
        public coordinatorName: string
    ) {}
}