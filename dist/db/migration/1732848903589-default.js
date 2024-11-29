"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default1732848903589 = void 0;
class Default1732848903589 {
    constructor() {
        this.name = 'Default1732848903589';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "users" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_a3ffb1c0c8416b9fc6f907b7433" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "email" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "createdAt" datetime NOT NULL CONSTRAINT "DF_204e9b624861ff4a5b268192101" DEFAULT getdate(), "deletedAt" datetime, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "baterponto" ("id" int NOT NULL IDENTITY(1,1), "userId" nvarchar(255) NOT NULL, "checkInHorario" nvarchar(255) NOT NULL, "checkOutHorario" nvarchar(255) NOT NULL, "intervalEntradaHorario" nvarchar(255) NOT NULL, "checkInData" nvarchar(255) NOT NULL, "checkOutData" nvarchar(255) NOT NULL, "intervalEntradaData" nvarchar(255) NOT NULL, "intervalSaidaData" nvarchar(255) NOT NULL, "intervalSaidaHorario" nvarchar(255) NOT NULL, CONSTRAINT "PK_fb4b670368d0546fa4a97896ad2" PRIMARY KEY ("id"))`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP TABLE "baterponto"`);
            yield queryRunner.query(`DROP TABLE "users"`);
        });
    }
}
exports.Default1732848903589 = Default1732848903589;
