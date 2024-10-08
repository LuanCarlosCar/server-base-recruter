import dayjs from "dayjs";
import { client, db } from ".";
import { tlbEmpresa, tblUsuario } from "./schema";

async function seed() {
  await db.delete(tlbEmpresa);
  await db.delete(tblUsuario);

  // const result = await db
  //   .insert(goals)
  //   .values([
  //     { title: "Acordar cedo", desiredWeeklyFrequency: 5 },
  //     { title: "Treinar na academia", desiredWeeklyFrequency: 5 },
  //     { title: "Meditar", desiredWeeklyFrequency: 1 },
  //   ])
  //   .returning();

  // const startOfWeek = dayjs().startOf("week");

  // await db.insert(goalCompletions).values([
  //   { goalId: result[0].id, createdAt: startOfWeek.toDate() },
  //   { goalId: result[1].id, createdAt: startOfWeek.add(1, "day").toDate() },
  // ]);
}

seed().finally(() => {
  client.end();
});
