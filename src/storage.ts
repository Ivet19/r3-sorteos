import fs from "node:fs";
import path from "node:path";

import { Giveaway, User } from "./types";

type ProgramData = {
  isAdmin: boolean;
  userEmail: string;
  giveaways: Giveaway[];
  users: User[];
};

export let programData: ProgramData = {
  isAdmin: false,
  userEmail: "",
  giveaways: [],
  users: [
    {
      email: "admin@admin.com",
      name: "Admin",
      password: "admin1234",
      isAdmin: true,
    },
    {
      email: "luis@user.com",
      name: "Luis",
      password: "luis1234",
      isAdmin: false,
    },
    {
      email: "marta@user.com",
      name: "Marta",
      password: "marta1234",
      isAdmin: false,
    },
  ],
};

const dataPath = path.join(process.cwd(), "data", "data.json");

const createDataFileIfNotExists = (path: string): void => {
  const fileStats = fs.statSync(path, { throwIfNoEntry: false })!;

  if (fileStats) {
    return;
  }

  fs.writeFileSync(path, JSON.stringify(programData));
};

export const loadData = (): void => {
  try {
    createDataFileIfNotExists(dataPath);
    const data = fs.readFileSync(dataPath, "utf-8");
    programData = JSON.parse(data);
  } catch (error: unknown) {
    console.log("Error reading file: ", (error as Error).message);
    console.log((error as Error).stack);
  }
};

export const saveData = (): void => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(programData));
  } catch (error: unknown) {
    console.log("Error writing to disk: ", (error as Error).message);
    console.log((error as Error).stack);
  }
};
