import prisma from '@repo/db/client'

class ChatService{
    async chatsList(email:string){
        const currentUser = await prisma.user.findUnique({
            where: {
              email
            }
        });

        if (!currentUser) {
            throw new Error('User not found');
        }

        const userId = currentUser.id;
        
        const matches = await prisma.match.findMany({
            where: {
              OR: [
                { userAId: userId },
                { userBId: userId }
              ]
            },
            include: {
              userA: {
                select: {
                  id: true,
                  name: true
                }
              },
              userB: {
                select: {
                  id: true,
                  name: true
                }
              }
            }
        });

        const chatPartners = matches.map(match =>{
            const otherUser = match.userAId === userId ? match.userB: match.userA
            return otherUser.name
        })
        return chatPartners

    }
}

export const chatService = new ChatService()