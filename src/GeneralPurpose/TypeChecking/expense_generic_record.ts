import ExpenseModel from "../model/expense_model.js";

type CreateExpenseRecordTypes = Pick<ExpenseModel, "amount" | "description"> & {
  category?: string;
};

type UpdateExpenseRecordTypes = Partial<ExpenseModel>;

type DeleteExpensesRecordTypes = Pick<ExpenseModel, "id">;

export {
  CreateExpenseRecordTypes,
  UpdateExpenseRecordTypes,
  DeleteExpensesRecordTypes,
};
