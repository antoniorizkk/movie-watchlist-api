import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts";
import pg from "pg"
import "dotenv/config";

const pool = new pg.Pool({
    connectionString : process.env.DATABASE_URL
})

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    adapter:adapter
});

const connectDB = async () => {
    try {
        await prisma.$connect(); // Keeps the fixed $ method
        console.log("DB Connected via Prisma");
    } catch (error) {
        console.error(`Database connection error: ${error.message}`);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect(); // Keeps the fixed $ method
};

export default { prisma, connectDB, disconnectDB };