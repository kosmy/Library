import { Genre } from './genre';

export class Book {
    constructor(
        public id: string,
        public author: string,
        public name: string,
        public pages: number,
        public genre: string
    ) { }
}