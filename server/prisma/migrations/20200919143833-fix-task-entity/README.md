# Migration `20200919143833-fix-task-entity`

This migration has been generated by Alexandre Mouton-Brady at 9/19/2020, 4:38:33 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Task" ("id", "title", "description", "status", "createdAt", "updatedAt") SELECT "id", "title", "description", "status", "createdAt", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200919141952-initial-migration..20200919143833-fix-task-entity
--- datamodel.dml
+++ datamodel.dml
@@ -2,19 +2,19 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
 }
 model Task {
-  id          Int      @id
+  id          Int      @id @default(autoincrement())
   title       String
-  description String
+  description String?
   status      String
   createdAt   DateTime @default(now())
   updatedAt   DateTime @updatedAt
 }
```


