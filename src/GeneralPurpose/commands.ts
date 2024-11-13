import * as fs from "node:fs/promises";
import {
  CreateExpenseRecordTypes,
  DeleteExpensesRecordTypes,
  UpdateExpenseRecordTypes,
} from "./TypeChecking/expense_generic_record.js";
import ExpenseModel from "./model/expense_model.js";

const dirPath = decodeURIComponent(
  new URL("data", import.meta.url).pathname.slice(1)
);
await fs.mkdir(dirPath, { recursive: true });
const filePath = decodeURIComponent(
  new URL("data/rawData.json", dirPath).toString()
);

let expenses: any[];

try {
  expenses = JSON.parse(await fs.readFile(filePath, "utf8"));
} catch (e) {
  expenses = [];
  await fs.writeFile(filePath, JSON.stringify(expenses, null, 2), "utf8");
}

export default class Expenses {
  private static monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  private static getCurrentDate = () => {
    return new Date().toISOString();
  };

  private static generateId() {
    if (expenses.length === 0) return 1;
    const maxId = Math.max(...expenses.map((expense) => expense.id));
    return maxId + 1;
  }

  static async add(CreateExpensesRecordOptions: CreateExpenseRecordTypes) {
    const { description, amount, category } = CreateExpensesRecordOptions;

    const addExpenses = {
      id: this.generateId(),
      description: description,
      amount: amount,
      category: category,
      createdAt: this.getCurrentDate(),
      updatedAt: null,
    };

    expenses.push(addExpenses);

    await fs.writeFile(filePath, JSON.stringify(expenses, null, 2), "utf8");
    console.log(`>> Successfully added expense to Record`);
  }

  private static async getExpenseById(id: number): Promise<{
    id: number;
    amount: number;
    category: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }> {
    const data = await JSON.parse(await fs.readFile(filePath, "utf8"));
    const record = await data.find((items: ExpenseModel) => items.id === id);

    if (!record)
      console.error(`Expense Record with this id: ${id} does not exist!`);

    return record;
  }

  static async update(UpdateExpensesRecordOptions: UpdateExpenseRecordTypes) {
    const { id, description, amount, category } = UpdateExpensesRecordOptions;

    const dataFound = await this.getExpenseById(id!);

    if (dataFound) {
      if (amount) dataFound.amount = amount;
      if (category) dataFound.category = category;
      if (description) dataFound.description = description;
      dataFound.updatedAt = new Date().toISOString();

      const index = expenses.findIndex((expense) => expense.id === id);

      if (index !== -1) {
        expenses[index] = dataFound;
      }

      await fs.writeFile(filePath, JSON.stringify(expenses, null, 2), "utf-8");
      console.log(`>> Successfully Updated Expense Record`);
    }
  }

  static async delete(DeleteExpensesRecordOptions: DeleteExpensesRecordTypes) {
    const { id } = DeleteExpensesRecordOptions;

    const data = await this.getExpenseById(id);

    if (data) {
      const index = expenses.findIndex((expense) => expense.id === id);
      if (index !== -1) {
        expenses.splice(index, 1);
        await fs.writeFile(
          filePath,
          JSON.stringify(expenses, null, 2),
          "utf-8"
        );
        console.log(`>> Successfully Deleted Expense Record`);
      }
    }
  }

  static async list() {
    const expenses = JSON.parse(await fs.readFile(filePath, "utf-8"));
    console.log(expenses);
  }

  static async summary(month?: number) {
    const getExpenses = JSON.parse(await fs.readFile(filePath, "utf-8"));

    if (month) {
      const convertMonth = month < 10 ? `0${month}` : `${month}`;

      const monthIndex = month - 1;
      const monthName = Expenses.monthNames[monthIndex];

      const filterByMonth = getExpenses.map((expense: any) => {
        const expenseMonth = expense.createdAt.slice(5, 7);
        return expenseMonth === convertMonth;
      });
      const totalAmountbyMonth = getExpenses
        .filter((expense: any) => filterByMonth[getExpenses.indexOf(expense)])
        .reduce((acc: number, expense: any) => acc + Number(expense.amount), 0);

      console.log(
        `Your total expenses for ${monthName} ${month} is $${totalAmountbyMonth}`
      );
    } else {
      const mapped = getExpenses.map((expense: ExpenseModel) =>
        Number(expense.amount)
      );

      const addedNumbers = mapped.reduce(
        (acc: number, curr: number) => acc + curr,
        0
      );
      console.log(`>> Your total expenses amount is: ${addedNumbers}`);
    }
  }
}
