import { defineContract } from "@prisma/orm-postgres/contract-builder";

export const contract = defineContract({}, ({ field, model, rel }) => {
  const User = model("User", {
    fields: {
      id: field.text().id(),
      username: field.text().unique(),
      password: field.text(),
      createdAt: field.temporal.createdAt(),
    },
  });

  const Token = model("Token", {
    fields: {
      id: field.text().id(),
      code: field.text(),
      userId: field.text(),
      createdAt: field.temporal.createdAt(),
      updatedAt: field.temporal.updatedAt(),
    },
  });

  return {
    models: {
      User: User.relations({
        tokens: rel.hasMany(Token, { by: "userId" }),
      }).sql({ table: "User" }),
      Token: Token.relations({
        user: rel.belongsTo(User, { from: "userId", to: "id" }).sql({ fk: { name: "Token_userId_fkey" } }),
      }).sql({ table: "Token" }),
    },
  };
});   