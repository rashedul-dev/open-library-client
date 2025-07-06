import { createBrowserRouter } from "react-router";
import App from "../App";
import Books from "@/pages/Books";
import AddBooks from "@/pages/AddBooks";
import BorrowSummary from "@/pages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Books,
      },
      {
        path: "books",
        Component: Books,
      },
      {
        path: "create-books",
        Component: AddBooks,
      },
      {
        path: "borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);

export default router;
