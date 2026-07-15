import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { BoardPage } from "./BoardPage";

const board = {
  title: "Test board",
  sounds: [{ text: "Un sonido", soundURL: "https://example.com/test.mp3" }],
};

describe("BoardPage", () => {
  it("offers a retry when a board chunk cannot be loaded", async () => {
    const loadBoard = jest
      .fn()
      .mockRejectedValueOnce(new Error("network error"))
      .mockResolvedValueOnce(board);

    render(
      <BrowserRouter>
        <BoardPage board="ibai" loadBoard={loadBoard} />
      </BrowserRouter>
    );

    expect(await screen.findByRole("alert")).toHaveTextContent("No se han podido cargar los sonidos.");

    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(await screen.findByText("Test board")).toBeInTheDocument();
    expect(loadBoard).toHaveBeenCalledTimes(2);
  });
});
