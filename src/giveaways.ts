import { askUser } from "./askUser.js";

import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";

import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  if (
    programData.users.some(
      (user) => user.email === email && user.password === password
    )
  ) {
    programData.userEmail = email;
    programData.users.at(0)
      ? (programData.isAdmin = true)
      : (programData.isAdmin = false);
    console.log("Bienvenid@.");
    saveData;
  } else {
    console.log("Los credenciales introducidos no son válidos");
    process.exit(1);
  }
};
