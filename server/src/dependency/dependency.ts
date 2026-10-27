import { Controller } from "../../src/controller/controller";
import { Service } from "../../src/service/service";
import { Repository } from "../../src/repository/repository";
import { Utility } from "../../src/utility/utility";
import { Cache } from "../../src/cache/cache";
import { PrismaClient } from "../../../db/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const cache = new Cache();
const utility = new Utility(cache);
const repository = new Repository(prisma);
const service = new Service(repository, utility, cache);

export const controller = new Controller(service);