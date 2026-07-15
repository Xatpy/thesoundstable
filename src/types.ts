export type Sound = {
  text: string;
  soundURL: string;
  tag?: string;
};

export type Board = {
  title: string;
  sounds: Sound[];
};
