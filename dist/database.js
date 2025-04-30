"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class Database {
    constructor(tableName) {
        this.data = [];
        this.tablePath = path.join(__dirname, `${tableName}.json`);
    }
    loadData() {
        if (fs.existsSync(this.tablePath)) {
            const fileContent = fs.readFileSync(this.tablePath, 'utf-8');
            this.data = JSON.parse(fileContent);
        }
        else {
            this.data = [];
            this.saveData();
        }
    }
    saveData() {
        fs.writeFileSync(this.tablePath, JSON.stringify(this.data, null, 2));
    }
    create(record) {
        const newRecord = Object.assign(Object.assign({}, record), { id: Date.now() });
        this.data.push(newRecord);
        this.saveData();
        return newRecord;
    }
    update(id, updates) {
        const record = this.data.find((record) => record.id == id);
        if (record) {
            Object.assign(record, updates);
            this.saveData();
        }
        return record;
    }
    delete(id) {
        const recordIndex = this.data.findIndex((record) => record.id === id);
        if (recordIndex === -1)
            return undefined;
        const [deletedRecord] = this.data.splice(recordIndex, 1);
        this.saveData();
        return deletedRecord;
    }
    read() {
        return this.data;
    }
}
exports.Database = Database;
