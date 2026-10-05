import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import { authenticateToken } from "./middleware/auth.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "./generated/prisma/client.ts";
import { PrismaPg } from "@prisma/adapter-pg";

const app = express();

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
    adapter
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

const PORT = 5000;

app.get("/", (req, res) => {
    res.json({
        message: "Backend is running",
        status: "success"
    });
});

app.get("/api/hello", (req, res) => {
    res.json({
        message: "Hello from my first API!",
        project: "Full Stack App"
    });
});

app.get("/api/users", authenticateToken, async (req, res) => {
    try {
        const users = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                created_at: true
            }
        });

        res.json(users);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch users"
        });
    }
});
app.post("/api/users", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                error: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: "Password must be at least 6 characters"
            });
        }

        // 2. Check whether email already exists
        const existingUser = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(409).json({
                error: "Email is already registered"
            });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        // 5. Never send password back to client
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create user"
        });
    }
});
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Check that email and password were provided
        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        // 2. Find the user by email
        const user = await prisma.users.findUnique({
            where: {
                email: email
            }
        });

        // 3. If user doesn't exist
        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        // 4. Compare entered password with stored hash
        const passwordIsCorrect = await bcrypt.compare(
            password,
            user.password
        );

        // 5. If password is wrong
        if (!passwordIsCorrect) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        // 6. Login successful
        const token = jwt.sign(
    {
        userId: user.id
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

res.json({
    message: "Login successful",
    token: token,
    user: {
        id: user.id,
        name: user.name,
        email: user.email
    }
});

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Login failed"
        });
    }
});
app.get("/api/profile", authenticateToken, async (req, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: req.user.userId
            }
        });

        if (!user) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch profile"
        });
    }
});
app.post("/api/expenses", authenticateToken, async (req, res) => {
    try {
        const { title, amount, category, date } = req.body;

        if (!title || !amount || !category || !date) {
            return res.status(400).json({
                error: "All expense fields are required"
            });
        }

        const expense = await prisma.expenses.create({
            data: {
                user_id: req.user.userId,
                title,
                amount,
                category,
                date: new Date(date)
            }
        });

        res.status(201).json({
            message: "Expense created successfully",
            expense
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to create expense"
        });
    }
});
app.delete("/api/expenses/:id", authenticateToken, async (req, res) => {
    try {
        const expenseId = Number(req.params.id);

        const expense = await prisma.expenses.findFirst({
            where: {
                id: expenseId,
                user_id: req.user.userId
            }
        });

        if (!expense) {
            return res.status(404).json({
                error: "Expense not found"
            });
        }

        await prisma.expenses.delete({
            where: {
                id: expenseId
            }
        });

        res.json({
            message: "Expense deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to delete expense"
        });
    }
});
app.post("/api/income", authenticateToken, async (req, res) => {
    try {
        const { amount, source, date } = req.body;

        if (!amount || !source || !date) {
            return res.status(400).json({
                error: "All income fields are required"
            });
        }

        const income = await prisma.income.create({
            data: {
                user_id: req.user.userId,
                amount,
                source,
                date: new Date(date)
            }
        });

        res.status(201).json({
            message: "Income added successfully",
            income
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to add income"
        });
    }
});
app.get("/api/income", authenticateToken, async (req, res) => {
    try {
        const income = await prisma.income.findMany({
            where: {
                user_id: req.user.userId
            },
            orderBy: {
                date: "desc"
            }
        });

        res.json(income);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch income"
        });
    }
});
app.get("/api/expenses", authenticateToken, async (req, res) => {
    try {
        const expenses = await prisma.expenses.findMany({
            where: {
                user_id: req.user.userId
            },
            orderBy: {
                date: "desc"
            }
        });

        res.json(expenses);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "Failed to fetch expenses"
        });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});