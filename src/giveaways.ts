import { askUser } from "./askUser.js";

import { programData, saveData } from "./storage.js";

import { Giveaway } from "./types.js";

import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const isRegisteredUser = programData.users.some(
    (user) => user.email === email && user.password === password
  );
  if (isRegisteredUser) {
    programData.userEmail = email;
    const adminUser = programData.users.find((user) => user.isAdmin);
    email === adminUser?.email && password === adminUser.password
      ? (programData.isAdmin = true)
      : (programData.isAdmin = false);
    console.log("Bienvenid@.");
    saveData();
  } else {
    console.log("Los credenciales introducidos no son válidos");
    process.exit(1);
  }
};

export const createGiveaway = (): void => {
  const giveawayInfo = askUserNewGiveawayData();
  const newGiveaway: Giveaway = {
    name: giveawayInfo.giveawayName,
    socialNetwork: giveawayInfo.giveawaySocialNetwork,
    participants: [],
  };
  programData.giveaways.push(newGiveaway);
  console.log("Sorteo creado correctamente");
  saveData();
};

export const listGiveaways = (): void => {
  const availableGiveawaysTotal = programData.giveaways.length;
  if (availableGiveawaysTotal) {
    console.log(
      `Estos son los ${availableGiveawaysTotal} sorteos disponibles:`
    );
    for (let position in programData.giveaways) {
      const giveawayName = programData.giveaways[position].name;
      const giveawaySocialNetwork =
        programData.giveaways[position].socialNetwork;
      console.log(
        `${
          Number(position) + 1
        }. Sorteo de un/a ${giveawayName} en ${giveawaySocialNetwork}.`
      );
    }
  } else if (!availableGiveawaysTotal) {
    console.log("No hay sorteos disponibles :(");
  }
  saveData();
};

export const deleteGiveaway = (number: number): void => {
  number = number - 1;
  for (const position in programData.giveaways) {
    if (number < 0 || number > programData.giveaways.length) {
      console.log(
        "El número indicado no coincide con ningún sorteo disponible."
      );
    } else if (number === Number(position)) {
      programData.giveaways.splice(Number(position), 1);
      console.log(
        `Sorteo "${programData.giveaways[position].name}" eliminado correctamente.`
      );
      saveData();
    }
  }
};
