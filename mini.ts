// Book and Genre definitions
enum Genre {
  Fiction = "Fiction",
  NonFiction = "Non-Fiction",
  Science = "Science",
  History = "History"
}

interface Book {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  publishedYear: number;
  availability: boolean;
}

// Library class
class Library {
  private books: Book[] = [];

  // Add a book to the library
  addBook(book: Book): void {
    this.books.push(book);
    console.log(`Book titled "${book.title}" has been added.`);
  }

  // List all books in the library
  listBooks(): void {
    if (this.books.length === 0) {
      console.log("No books available.");
    } else {
      this.books.forEach(book => {
        console.log(
          `${book.id}: ${book.title} by ${book.author}, Genre: ${book.genre}, Published Year: ${book.publishedYear}, Available: ${book.availability}`
        );
      });
    }
  }

  // Search books by any property
  searchBooks<T extends keyof Book>(key: T, value: Book[T]): Book[] {
    return this.books.filter(book => book[key] === value);
  }

  // Update book details by ID
  updateBook(id: number, update: Partial<Book>): void {
    const book = this.books.find(book => book.id === id);
    if (book) {
      Object.assign(book, update);
      console.log(`Book with ID ${id} has been updated.`);
    } else {
      console.log(`Book with ID ${id} not found.`);
    }
  }

  // Delete a book by ID
  deleteBook(id: number): void {
    const index = this.books.findIndex(book => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      console.log(`Book with ID ${id} has been deleted.`);
    } else {
      console.log(`Book with ID ${id} not found.`);
    }
  }
}

// Example usage
const library = new Library();

// Adding books
library.addBook({
  id: 1,
  title: "1984",
  author: "George Orwell",
  genre: Genre.Fiction,
  publishedYear: 1949,
  availability: true
});

library.addBook({
  id: 2,
  title: "A Brief History of Time",
  author: "Stephen Hawking",
  genre: Genre.Science,
  publishedYear: 1988,
  availability: false
});

// Listing books
library.listBooks();

// Searching books by title
const searchResult = library.searchBooks("title", "1984");
console.log('Search Result:', searchResult);

// Updating a book
library.updateBook(1, { availability: false });
library.listBooks();

// Deleting a book
library.deleteBook(2);
library.listBooks();
