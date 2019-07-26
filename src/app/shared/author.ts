import { Book } from 'src/app/shared/book'

export class Author {
    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public fName: string,
        public birthday: Date,
        public books: string[]
    ) { }
}