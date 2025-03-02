import { askUser } from "./askUser.js";

import { programData, saveData } from "./storage.js";

import { Giveaway, User } from "./types.js";

import { askUserNewGiveawayData } from "./ui.js";

export const loginUser = (email: string, password: string): void => {
  const isRegisteredUser = programData.users.some(
    (user) => user.email === email && user.password === password
  );
  if (isRegisteredUser) {
    programData.userEmail = email;
    const adminUser = programData.users.find((user) => user.isAdmin);
    if (email === adminUser?.email && password === adminUser.password) {
      programData.isAdmin = true;
    } else {
      programData.isAdmin = false;
    }
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

export const deleteGiveaway = (giveawayNumber: number): void => {
  const giveawayPosition = giveawayNumber - 1;
  const giveaways = programData.giveaways;
  const toRemoveGiveaway = giveaways[giveawayPosition];

  if (giveawayNumber > giveaways.length || giveawayNumber <= 0) {
    console.log("El número indicado no coincide con ningún sorteo disponible.");
  } else {
    for (let position = 0; position <= giveaways.length; position++) {
      if (giveawayPosition === position) {
        giveaways.splice(position, 1);
        saveData();
        console.log(
          `Sorteo "${toRemoveGiveaway.name!}" eliminado correctamente.`
        );
      }
    }
  }
};

export const enterGiveaway = (giveawayNumber: number): void => {
  const giveawayPosition = giveawayNumber - 1;
  if (giveawayNumber <= 0 || giveawayNumber > programData.giveaways.length) {
    console.log("El número indicado no coincide con ningún sorteo disponible.");
  } else {
    for (const position in programData.giveaways) {
      if (giveawayPosition === Number(position)) {
        const newParticipant = programData.users.find(
          (user) => user.email === programData.userEmail
        );
        programData.giveaways
          .at(Number(position))
          ?.participants.push(newParticipant!);
        saveData();
      }
    }
    console.log("Te has inscrito correctamente al sorteo seleccionado.");
  }
};

export const listUserGiveaways = (): void => {
  const giveaways = programData.giveaways;
  const userGiveaways = giveaways.filter((giveaway) =>
    giveaway.participants.some(
      (participant) => participant.email === programData.userEmail
    )
  );
  if (userGiveaways.length) {
    console.log(
      `Estás inscrit@ en el/los siguiente/s ${userGiveaways!.length} sorteo/s:`
    );
    userGiveaways.forEach((userGiveaway, index) => {
      console.log(
        `${index + 1}. Sorteo de un/a ${userGiveaway.name} en ${
          userGiveaway.socialNetwork
        }.`
      );
    });
  } else {
    console.log("No estás inscrit@ en ningún sorteo.");
  }
};
