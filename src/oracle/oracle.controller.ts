import { Controller, Get, Param } from '@nestjs/common';
import { OracleService } from './oracle.service';

@Controller('oracle')
export class OracleController {
    constructor(private readonly oracleService: OracleService) { }

    // Fetch tables from a schema
    @Get('schema/:schema/tables')
    async getTables(@Param('schema') schema: string) {
        return await this.oracleService.getTables(schema);
    }

    // Fetch columns from a specific table
    @Get('schema/:schema/table/:table/columns')
    async getColumns(@Param('schema') schema: string, @Param('table') table: string) {
        return await this.oracleService.getColumns(schema, table);
    }

    @Get('schema/:schema/tables')
    async getTables2(@Param('schema') schema: string) {
        return await this.oracleService.getTables(schema);
    }


    @Get('connect')
    connect() {
        return this.oracleService.connect();
    }

}
