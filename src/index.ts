#!/usr/bin/env node
import Expenses from "./GeneralPurpose/commands.js";
import { Command } from "commander";

const program = new Command();

program
  .name("expense")
  .description("This is a CLI that can be used to carry out CRUD operations.")
  .version("0.0.1");

program
  .command("set")
  .description("Choose the currency by which you want to store your expenses")
  .option(
    "-cc --currency <string>",
    "This allows you to choose the right currency for your application",
    ["Naira", "Dollar", "KuwaitDinar", "Yen", "Euro", "Pound", "Shekel"]
  )
  .action(async (option) => {
    const { currency } = option;

    // await Expenses.setCurrency(currency);
  });

program
  .command("add")
  .requiredOption(
    "-d, --description <string>",
    "This takes in the description of the expense"
  )
  .requiredOption(
    "-a, --amount <number>",
    "This takes the amount of the expense"
  )
  .option(
    "-c, --category <string>",
    "This takes in the category of the expense"
  )
  .action(async (options) => {
    const { description, amount, category } = options;

    if (isNaN(Number(amount))) {
      console.error(`Error: amount must be a number`);
      process.exit(1);
    }

    const numericAmount = Number(amount);

    await Expenses.add({ amount: numericAmount, category, description });
  });

program
  .command("update")
  .requiredOption("--id <number>")
  .option("-a --amount <number>")
  .option("-c --category <string>")
  .option("-d --description <string>")
  .action(async (options) => {
    const { id, description, amount, category } = options;

    if (isNaN(Number(id)) || isNaN(Number(amount))) {
      console.error("Error: amount or id must be a number.");
      process.exit(1);
    }

    const numericId = Number(id);
    const numericAmount = Number(amount);

    if (numericAmount < 0 || numericAmount < 0) {
      console.error(`Error: amount or id can't be negative`);
      process.exit(1);
    }

    await Expenses.update({
      id: numericId,
      description,
      amount: numericAmount,
      category,
    });
  });

program
  .command("delete")
  .description("This gives you the ability to delete an expense on the record")
  .requiredOption("--id <number>", "The id of the expense")
  .action(async (options) => {
    const { id } = options;

    if (isNaN(id)) {
      console.error("Error: id must be a number");
      process.exit(1);
    }
    const numericId = Number(id);

    if (numericId < 0) {
      console.error(`Error: id can't be negative`);
      process.exit(1);
    }

    await Expenses.delete({ id: numericId });
  });

program
  .command("list")
  .description("This gives you the ability to list all expenses")
  .action(async () => {
    await Expenses.list();
  });

program
  .command("summary")
  .description("This returns the total expenses amount")
  .option("-m, --month <number>", "month of the expense")
  .action(async (option) => {
    const { month } = option;

    if (isNaN(Number(month))) {
      console.error("Error: Month must be a number");
      process.exit(1);
    }

    const numericMonth = Number(month);

    if (numericMonth < 0) {
      console.error(`Error: month number can't be negative`);
      process.exit(1);
    }

    if (month) {
      await Expenses.summary(numericMonth);
    } else {
      await Expenses.summary();
    }
  });

program.parse(process.argv);
