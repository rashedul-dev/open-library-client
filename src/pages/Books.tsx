import { Button } from "@/components/ui/button";
import BookTable from "../components/BookTable";
import { Link } from "react-router-dom";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import { useState } from "react";
import Loader from "@/components/Loader";
import { CirclePlus, MoveLeft, MoveRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Books = () => {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("");

  const limit = 10;

  const { data, error, isLoading } = useGetBooksQuery(
    {
      page,
      limit,
      filter: genre,
    },
    {
      pollingInterval: 30000, // fetch every 30s
      refetchOnFocus: true, //  when browser regains focus
      refetchOnMountOrArgChange: true, //when args change (like page or genre)
      refetchOnReconnect: true, // when internet reconnects
    }
  );
  //   console.log(data);
  const books = data?.data || [];
  const totalPages = data?.meta?.totalPages || 1;
  console.log("Books", books);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-wrap md:justify-end gap-4 items-center mb-6">
        {/* Filter by Genre */}
        <Select
          onValueChange={(value) => {
            if (value === "ALL") {
              setGenre(""); //clears filter
            } else {
              setGenre(value);
            }
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="FICTION">Fiction</SelectItem>
            <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
            <SelectItem value="SCIENCE">Science</SelectItem>
            <SelectItem value="HISTORY">History</SelectItem>
            <SelectItem value="BIOGRAPHY">Biography</SelectItem>
            <SelectItem value="FANTASY">Fantasy</SelectItem>
          </SelectContent>
        </Select>
        <Link to={"/create-books"}>
          <Button className="flex justify-end">
            <CirclePlus></CirclePlus> Add Books
          </Button>
        </Link>
      </div>
      {error && <p>Error fetching books</p>}
      {books?.length > 0 ? (
        <BookTable books={books} />
      ) : (
        !isLoading && <p>No books found.</p>
      )}

      {/* pagination */}
      <div className="flex justify-center gap-2 mt-6 text-sm items-center">
        <Button
          disabled={page === 1}
          variant={"outline"}
          className="border-none"
          onClick={() => setPage((prev) => prev - 1)}
        >
          <MoveLeft className="w-4 h-4" />
          Prev
        </Button>
        <span className="px-3 py-1 rounded">
          Page {page} of {totalPages}
        </span>
        <Button
          disabled={page === totalPages}
          variant={"outline"}
          className="border-none"
          onClick={() => setPage((prev) => prev + 1)}
        >
          {" "}
          Next
          <MoveRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Books;
