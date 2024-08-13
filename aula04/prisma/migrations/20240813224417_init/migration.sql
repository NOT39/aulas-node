-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "hash_senha" TEXT NOT NULL,
    "descricao" TEXT,
    "avatar_url" TEXT,
    "cover_url" TEXT,
    "fl_admin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "Projeto" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem_url" TEXT,
    "like_amount" INTEGER NOT NULL DEFAULT 0,
    "dislike_amount" INTEGER NOT NULL DEFAULT 0,
    "fl_fixed" BOOLEAN NOT NULL DEFAULT false,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Projeto_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
