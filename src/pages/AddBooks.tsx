import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import type { IBook } from "@/types";
const AddBook = () => {
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();

  const [bookData, setBookData] = useState<
    Omit<IBook, "_id" | "createdAt" | "updatedAt">
  >({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBookData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleGenreChange = (value: IBook["genre"]) => {
    setBookData((prev) => ({
      ...prev,
      genre: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = {
      ...bookData,
      available: Number(bookData.copies) > 0,
    };

    try {
      await createBook(dataToSend).unwrap();
      toast.success("Successfully Added The Book");
      navigate("/");
    } catch (err) {
      toast.error("Failed to add book");
      console.error(err);
    }
  };

  return (
    <div className="w-full md:w-1/2 border shadow-xl p-6 rounded-xl mx-auto my-10">
      <h1 className="font-bold text-2xl text-center py-6">Add a Book</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label>📖 Title</label>
          <Input
            name="title"
            value={bookData.title}
            onChange={handleChange}
            placeholder="Title"
          />
        </div>

        {/* Author */}
        <div>
          <label>👤 Author</label>
          <Input
            name="author"
            value={bookData.author}
            onChange={handleChange}
            placeholder="Author"
          />
        </div>

        {/* Genre */}
        <div>
          <label>💠 Genre</label>
          <Select value={bookData.genre} onValueChange={handleGenreChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FICTION">Fiction</SelectItem>
              <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
              <SelectItem value="SCIENCE">Science</SelectItem>
              <SelectItem value="HISTORY">History</SelectItem>
              <SelectItem value="BIOGRAPHY">Biography</SelectItem>
              <SelectItem value="FANTASY">Fantasy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ISBN */}
        <div>
          <label>🔑 ISBN</label>
          <Input
            name="isbn"
            value={bookData.isbn}
            onChange={handleChange}
            placeholder="ISBN"
          />
        </div>

        {/* Description */}
        <div>
          <label>📝 Description</label>
          <Textarea
            name="description"
            value={bookData.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

        {/* Copies */}
        <div>
          <label>📂 Copies</label>
          <Input
            name="copies"
            type="number"
            min={1}
            value={bookData.copies}
            onChange={handleChange}
            placeholder="Enter number of copies"
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddBook;
