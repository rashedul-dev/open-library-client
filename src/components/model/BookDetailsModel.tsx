import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetBookQuery } from "@/redux/api/baseApi";
import type { BookModalProps } from "@/types";

const BookDetailsModel = ({ bookId, open, onOpenChange }: BookModalProps) => {
  const { data, isLoading, error } = useGetBookQuery(bookId, {
    skip: !bookId,
  });

  const book = data?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Book Details</DialogTitle>
        </DialogHeader>

        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading book</p>}
        {book && (
          <div className="space-y-2 text-sm">
            <p>
              <strong>Title:</strong> {book.title}
            </p>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Genre:</strong>{" "}
              {book.genre.charAt(0).toUpperCase() +
                book.genre.slice(1).toLowerCase()}
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Copies:</strong> {book.copies}
            </p>
            <p>
              <strong>Availability:</strong>{" "}
              <span
                className={book.copies > 0 ? "text-green-600" : "text-red-600"}
              >
                {book.copies > 0 ? "Available" : "Not Available"}
              </span>
            </p>

            <p>
              <strong>Description:</strong> {book.description}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookDetailsModel;
