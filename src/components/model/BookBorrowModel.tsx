import { useEffect, useState } from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import toast from "react-hot-toast";
import type { BookModalProps, IBorrow } from "@/types";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import Loader from "../Loader";
import { useNavigate } from "react-router";
import { Calendar } from "../ui/calendar";

const BorrowBookModal = ({ bookId, open, onOpenChange }: BookModalProps) => {
  const { data, isLoading } = useGetBookQuery(bookId, {
    skip: !bookId,
    refetchOnMountOrArgChange: true,
  });

  const book = data?.data;
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [errors, setErrors] = useState<{ quantity?: string; dueDate?: string }>(
    {}
  );

  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!book || !bookId) return;

    const newErrors: typeof errors = {};
    if (!quantity || quantity < 1 || quantity > book.copies) {
      newErrors.quantity = `Quantity must be between 1 and ${book.copies}`;
    }
    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (!dueDate) return;
    const borrowData: IBorrow = {
      quantity,
      dueDate,
      book: bookId,
    };

    try {
      await borrowBook(borrowData).unwrap();
      toast.success("Successfully Borrowed The Book");
      resetForm();
      onOpenChange(false);
      navigate("/borrow-summary");
    } catch (error) {
      console.error("error borrowing book", error);
      toast.error("Borrowing failed");
    }
  };

  const resetForm = () => {
    setQuantity(1);
    setDueDate(undefined);
    setErrors({});
  };

  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] sm:mb-10 md:mb-10 overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>
            Choose how many copies you want and set a due date.
          </DialogDescription>
        </DialogHeader>

        {isLoading || !book ? (
          <div className="flex justify-center items-center h-[100vh]">
            <Loader />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 p-3">
            {/* Book Info */}
            <div className="text-sm text-muted-foreground space-y-3">
              <p>
                <span className="font-medium text-foreground">📖 Title:</span>{" "}
                {book.title}
              </p>
              <p>
                <span className="font-medium text-foreground">👤 Author:</span>{" "}
                {book.author}
              </p>
              <p>
                <span className="font-medium text-foreground">
                  📂 Copies Available:
                </span>{" "}
                {book.copies}
              </p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block mb-1 font-medium">📚 Quantity</label>
              <Input
                type="number"
                value={quantity}
                min={1}
                max={book.copies}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              {errors.quantity && (
                <p className="text-sm text-red-500 mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Due Date */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">📅 Due Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date < new Date("1900-01-01")
                    }
                    captionLayout="dropdown"
                  />
                </PopoverContent>
              </Popover>
              {errors.dueDate && (
                <p className="text-sm text-red-500 mt-1">{errors.dueDate}</p>
              )}
            </div>

            {/* Footer */}
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isBorrowing}>
                {isBorrowing ? "Borrowing..." : "Borrow Book"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BorrowBookModal;
