import prompt from "prompt-sync";

export const askUser = prompt();
export const askUserHidden = (ask: string) => askUser(ask, { echo: "*" });
