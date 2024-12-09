import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as oracledb from 'oracledb';

@Injectable()
export class OracleService implements OnModuleDestroy {
    private connection: oracledb.Connection;

    constructor(private configService: ConfigService) { }

    async connect() {
        try {
            const dbConfig = {
                user: this.configService.get('DB_USER'),
                password: this.configService.get('DB_PASSWORD'),
                connectString: `${this.configService.get('DB_HOST')}:${this.configService.get('DB_PORT')}/${this.configService.get('DB_SID')}`,
            };

            this.connection = await oracledb.getConnection(dbConfig);
            console.log('Connected to Oracle DB');
        } catch (error) {
            console.error('Error connecting to Oracle DB:', error.message);
            throw error;
        }
    }

    // Fetch schema tables
    async getTables(schema: string) {
        try {
            const query = `SELECT table_name FROM all_tables WHERE owner = :schema`;
            const result = await this.connection.execute(query, [schema]);
            return result.rows;
        } catch (error) {
            console.error('Error fetching tables:', error.message);
            throw error;
        }
    }

    // Fetch columns for a specific table
    async getColumns(schema: string, table: string) {
        try {
            const query = `SELECT column_name, data_type FROM all_tab_columns WHERE owner = :schema AND table_name = :table`;
            const result = await this.connection.execute(query, [schema, table]);
            return result.rows;
        } catch (error) {
            console.error(`Error fetching columns for ${table}:`, error.message);
            throw error;
        }
    }

    // Close the connection
    async close() {
        try {
            if (this.connection) {
                await this.connection.close();
                console.log('Oracle DB connection closed');
            }
        } catch (error) {
            console.error('Error closing Oracle DB connection:', error.message);
            throw error;
        }
    }

    // Cleanup on module destroy
    async onModuleDestroy() {
        await this.close();
    }
}
