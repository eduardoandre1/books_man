import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import prisma from "../database"

export async function getBooks():Promise<Book[]> {
	const result = await prisma.book.findMany();
	return result;
}

export async function getBook(id: number):Promise<Book> {
	const result = await prisma.book.findUnique({where:{id}})
	return result;
}

export async function createBook(book: CreateBook) {
	const { title, author, publisher,cover, purchaseDate } = book;
	const date = new Date(purchaseDate)
	const result = await prisma.book.create({data:{title:title, author:author,cover:cover, publisher:publisher, purchaseDate:date}})
	return result;
}

export async function reviewBook(bookReview: CreateReview) {
	const { bookId, grade, review } = bookReview;
	const result = await prisma.book.update({data:{read:true,grade:grade,review:review},where:{id:bookId}})
	return result;
}
