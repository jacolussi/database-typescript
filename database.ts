import * as fs from 'fs';
import * as path from 'path';

export class Database<T extends { id: number }> {

    private tablePath: string;
    private data: T[] = [];

    constructor(tableName: string) {
        this.tablePath = path.join(__dirname, `${tableName}.json`);
    }

    private loadData() {
        if(fs.existsSync(this.tablePath)) {
            const fileContent = fs.readFileSync(this.tablePath, 'utf-8');
            this.data = JSON.parse(fileContent) as T[];
        } else {
            this.data = [];
            this.saveData();
        }
    }

    private saveData() {
        fs.writeFileSync(this.tablePath, JSON.stringify(this.data, null, 2));
    }

    create(record: Omit<T, 'id'>) : T {
        const newRecord = { ...record, id: Date.now() } as T;
        this.data.push(newRecord);
        this.saveData();

        return newRecord;
    }

    update(id: number, updates: Partial<Omit<T, 'id'>>) : T | undefined {
        const record = this.data.find((record) => record.id == id);

        if(record) {
            Object.assign(record, updates);
            this.saveData();
        }

        return record;
    }

    delete(id: number) : T | undefined {
        const recordIndex = this.data.findIndex((record) => record.id === id);

        if(recordIndex === -1) return undefined;

        const [deletedRecord] = this.data.splice(recordIndex, 1);

        this.saveData()
        return deletedRecord;
    }

    read() : T[] {
        return this.data;
    }
}