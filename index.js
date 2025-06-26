const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "1984", author: "George Orwell" }
];

// Home route
app.get("/", (req, res) => {
  res.send("📘 Welcome to the Book API! Try accessing /books to see all books.");
});

// GET all books
app.get("/books", (req, res) => {
  res.json({ success: true, data: books });
});

// POST a new book
app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ success: false, message: "Title and Author are required" });
  }

  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json({ success: true, message: "Book added", book: newBook });
});

// UPDATE book by ID
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const bookIndex = books.findIndex(b => b.id === bookId);

  if (bookIndex === -1) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  if (title) books[bookIndex].title = title;
  if (author) books[bookIndex].author = author;

  res.json({ success: true, message: "Book updated", book: books[bookIndex] });
});

// DELETE book by ID
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const originalLength = books.length;
  books = books.filter(b => b.id !== bookId);

  if (books.length === originalLength) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  res.json({ success: true, message: `Book with ID ${bookId} deleted.` });
});

app.listen(PORT, () => {
  console.log(`📚 Book API running on http://localhost:${PORT}`);
});
