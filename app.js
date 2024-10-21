const express = require("express");
const mongoose = require("mongoose");
const Expense = require("./models/expense.model.js");

const app = express();

app.set("views", "./views");
app.set("view engine", "pug");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View All Expenses
app.get("/", async (req, res) => {
  const expenses = await Expense.find({});
  //res.status(200).json(expenses);

  res.render("index", {
    title: "Expense Tracker",
    expenses: expenses,
  });
});

// Add Expense
app.get("/add", (req, res) => {
  res.render("add_expenses", {
    title: "Add Expenses",
  });
});

// Edit a Expense
app.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    res.render("edit_expenses", {
      title: "Edit Expenses",
      expenses: expense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a Expense
app.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (expense) alert("Areu sure delete ?");

    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/chart", (req, res) => {
  res.render("expense_chart", {
    title: "Expense Chart",
  });
});

// Add Expense
app.post("/add", async (req, res) => {
  try {
    await Expense.create(req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Expense
app.post("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndUpdate(id, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a Expense
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense delete successfully" });
    res.redirect("/");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://suragcoding:7ozSfXSvl932ULcL@cluster0.xxtgm.mongodb.net/expense-tracker?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to Database....");
    app.listen(3000, () => {
      console.log("server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection Failed");
  });
