
import { Pool, neonConfig } from '@neondatabase/serverless'
import { PrismaNeon } from '@prisma/adapter-neon'
import { PrismaClient } from '@prisma/client';
// import ws from 'ws'
// neonConfig.webSocketConstructor = ws

const prismaClientSingleton = (() => {
    let instance;
    return () => {
        if (!instance) {
            const connectionString = process.env.DATABASE_URL;
            const pool = new Pool({ connectionString });
            const adapter = new PrismaNeon(pool);
            // PrismaClient.connect({ adapter });

            instance = new PrismaClient({ adapter });
        }
        return instance;
    };
})();

const prisma = prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
