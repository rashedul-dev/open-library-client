import { useEffect, useState } from "react";
import type { BookModalProps } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import type { IBook } from "@/types";
import Loader from "../Loader";

type Genre = IBook["genre"]; // ✅ Reuse the genre type from your IBook model

const BookUpdateModal = ({ bookId, open, onOpenChange }: BookModalProps) => {
  const { data, isLoading, error } = useGetBookQuery(bookId, {
    skip: !bookId,
  });

  const book = data?.data;

  const [formData, setFormData] = useState<{
    title: string;
    author: string;
    genre: Genre;
    isbn: string;
    description: string;
    copies: number;
  }>({
    title: "",
    author: "",
    genre: "FICTION",
    isbn: "",
    description: "",
    copies: 1,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "FICTION",
        isbn: book.isbn || "",
        description: book.description || "",
        copies: book.copies || 1,
      });
    }
  }, [book]);

  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleGenreChange = (value: Genre) => {
    setFormData((prev) => ({ ...prev, genre: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookId) return;
    try {
      await updateBook({ bookId, bookData: formData }).unwrap();
      toast.success("Book updated successfully");
      onOpenChange(false);
    } catch (error: any) {
      toast.error("Update failed");
    }
  };

  if (isUpdating) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error loading book</p>}

      {book && (
        <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Book</DialogTitle>
            <DialogDescription>
              Make changes to your book here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 p-3">
            {/* Title */}
            <div>
              <label className="block mb-1">📖 Title</label>
              <Input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Author */}
            <div>
              <label className="block mb-1">👤 Author</label>
              <Input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block mb-1">💠 Genre</label>
              <Select value={formData.genre} onValueChange={handleGenreChange}>
                <SelectTrigger className="w-full">
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
              <label className="block mb-1">🔑 ISBN</label>
              <Input
                type="text"
                name="isbn"
                placeholder="ISBN"
                value={formData.isbn}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1">📝 Description</label>
              <Input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Copies */}
            <div>
              <label className="block mb-1">📂 Copies</label>
              <Input
                type="number"
                name="copies"
                min={1}
                placeholder="Enter number of copies"
                value={formData.copies}
                onChange={handleChange}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default BookUpdateModal;
