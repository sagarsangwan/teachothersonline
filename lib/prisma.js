


import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = (() => {
    let instance;
    return () => {
        if (!instance) {
            instance = new PrismaClient();
        }
        return instance;
    };
})();

const prisma = prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}
