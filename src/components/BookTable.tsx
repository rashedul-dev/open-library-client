
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import type { IBook } from "@/types";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  BookCheck,
  NotebookPen,
  NotebookTabs,
  Trash,
} from "lucide-react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import BookDetailsModel from "./model/BookDetailsModel";
import BookUpdateModel from "./model/BookUpdateModel";
import BookBorrowModel from "./model/BookBorrowModel";

const BookTable = ({ books }: { books: IBook[] }) => {
  const [selectedBookId, setSelectedBookId] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [deleteBook] = useDeleteBookMutation();
  console.log(books);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-md border dark:border-zinc-700 flex flex-col justify-between gap-4"
          >
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-sm text-muted-foreground">by {book.author}</p>
              <p className="text-sm">
                <span className="font-medium">Genre:</span>{" "}
                {book.genre.charAt(0).toUpperCase() +
                  book.genre.slice(1).toLowerCase()}
              </p>
              <p className="text-sm">
                <span className="font-medium">ISBN:</span> {book.isbn}
              </p>
              <p className="text-sm">
                <span className="font-medium">Copies:</span> {book.copies}
              </p>
              <p className="text-sm">
                <span className="font-medium">Availability:</span>{" "}
                {book.copies > 0 ? (
                  <span className="text-green-600 dark:text-green-400">
                    YES
                  </span>
                ) : (
                  <span className="text-red-600 dark:text-red-400">NO</span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
              {/* Edit Book */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <NotebookPen
                    className="text-cyan-700 dark:text-cyan-500 hover:scale-90 transition w-5 h-5 cursor-pointer"
                    onClick={() => {
                      setSelectedBookId(book._id);
                      setUpdateOpen(true);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>Edit Book</TooltipContent>
              </Tooltip>

              {/* Delete Book */}
              <AlertDialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <AlertDialogTrigger asChild>
                      <Trash className="text-red-500 hover:scale-90 transition w-5 h-5 cursor-pointer" />
                    </AlertDialogTrigger>
                  </TooltipTrigger>
                  <TooltipContent>Delete Book</TooltipContent>
                </Tooltip>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Once deleted, the book is gone forever. Please confirm.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={async () => {
                        try {
                          await deleteBook(book._id).unwrap();
                          toast.success("Book deleted successfully!");
                        } catch (err) {
                          toast.error("Failed to delete the book.");
                        }
                      }}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* View Book Details */}
              <Tooltip>
                <TooltipTrigger>
                  <NotebookTabs
                    className="text-cyan-700 dark:text-cyan-500 hover:scale-90 transition w-5 h-5 cursor-pointer"
                    onClick={() => {
                      setSelectedBookId(book._id);
                      setDetailsOpen(true);
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>Book Description</TooltipContent>
              </Tooltip>

              {/* Borrow Book */}
              <Tooltip>
                <TooltipTrigger>
                  <BookCheck
                    className={cn(
                      "transition w-5 h-5",
                      book.copies > 0
                        ? "text-cyan-700 dark:text-cyan-500 hover:scale-90 transition w-5 h-5 cursor-pointer"
                        : "text-gray-400 cursor-not-allowed"
                    )}
                    onClick={() => {
                      if (book.copies > 0) {
                        setSelectedBookId(book._id);
                        setBorrowOpen(true);
                      }
                    }}
                  />
                </TooltipTrigger>
                <TooltipContent>Borrow Book</TooltipContent>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      <BookDetailsModel
        bookId={selectedBookId}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <BookUpdateModel
        bookId={selectedBookId}
        open={updateOpen}
        onOpenChange={setUpdateOpen}
      />

      <BookBorrowModel
        bookId={selectedBookId}
        open={borrowOpen}
        onOpenChange={setBorrowOpen}
      />
    </>
  );
};

export default BookTable;
