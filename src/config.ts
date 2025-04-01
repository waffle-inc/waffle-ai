import * as fs from 'fs';
import * as path from 'path';
import * as TOML from '@iarna/toml';

interface BotConfig {
    Bot: {
        botToken: string;
        adminIds: number[];
    };
}

interface DatabaseConfig {
    database: {
        name: string;
        password: string;
        url: string;
        port: string;
        database: string;
    };
}

function loadConfig(): BotConfig & DatabaseConfig {
    const configPath = path.resolve(process.cwd(), 'config.toml');
    const configFile = fs.readFileSync(configPath, 'utf-8');
    const config = TOML.parse(configFile) as unknown as BotConfig & DatabaseConfig;
    return config;
}

const config = loadConfig();

export default config;