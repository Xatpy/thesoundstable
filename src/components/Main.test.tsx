import { act, fireEvent, render, screen } from "@testing-library/react";
import { Main } from "./Main";

const data = {
  title: "Test board",
  sounds: [
    { text: "Primer sonido", soundURL: "https://example.com/one.mp3" },
    { text: "Segundo sonido", soundURL: "https://example.com/two.mp3" },
  ],
};

describe("Main", () => {
  const makeAudioFactory = () => {
    const calls: string[] = [];
    const errors: Array<() => void> = [];
    return {
      calls,
      errors,
      createAudio: ((urlSound: string, onError: () => void) => {
        calls.push(urlSound);
        errors.push(onError);
        return { play: () => undefined, unload: () => undefined };
      }),
    };
  };

  it("does not create audio until a sound is selected", () => {
    const { calls, createAudio } = makeAudioFactory();
    render(<Main data={data} createAudio={createAudio} />);

    expect(calls).toHaveLength(0);

    fireEvent.click(screen.getByRole("button", { name: "Reproducir Primer sonido" }));

    expect(calls).toEqual([data.sounds[0].soundURL]);
  });

  it("reuses an already-created audio instance", () => {
    const { calls, createAudio } = makeAudioFactory();
    render(<Main data={data} createAudio={createAudio} />);
    const button = screen.getByRole("button", { name: "Reproducir Primer sonido" });

    fireEvent.click(button);
    fireEvent.click(button);

    expect(calls).toHaveLength(1);
  });

  it("filters sounds without initializing audio", () => {
    const { calls, createAudio } = makeAudioFactory();
    render(<Main data={data} createAudio={createAudio} />);

    fireEvent.change(screen.getByRole("textbox", { name: "Filtrar sonidos por texto" }), {
      target: { value: "segundo" },
    });

    expect(screen.queryByRole("button", { name: "Reproducir Primer sonido" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Reproducir Segundo sonido" })).toBeInTheDocument();
    expect(calls).toHaveLength(0);
  });

  it("shows a retry action when audio loading fails", () => {
    const { calls, createAudio, errors } = makeAudioFactory();
    render(<Main data={data} createAudio={createAudio} />);

    fireEvent.click(screen.getByRole("button", { name: "Reproducir Primer sonido" }));
    act(() => errors[0]());

    expect(screen.getByRole("alert")).toHaveTextContent("No se ha podido cargar el audio.");

    fireEvent.click(screen.getByRole("button", { name: "Reintentar" }));

    expect(calls).toHaveLength(2);
  });
});
