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

    async getChatByName(userEmail:string,chatName:string){
        const currentUser = await prisma.user.findUnique({
            where: {
            email: userEmail
            }
        });
        
        if (!currentUser) {
            throw new Error('Current user not found');
        }
        
        const otherUser = await prisma.user.findFirst({
            where: {
            name: chatName
            }
        });
        
        if (!otherUser) {
            throw new Error(`User with name "${chatName}" not found`);
        }
        
        const match = await prisma.match.findFirst({
            where: {
            OR: [
                { userAId: currentUser.id, userBId: otherUser.id },
                { userAId: otherUser.id, userBId: currentUser.id }
            ]
            },
            include: {
            chatMessages: {
                orderBy: {
                createdAt: 'asc'
                },
                include: {
                sender: {
                    select: {
                    id: true,
                    name: true,
                    profileImage: true
                    }
                }
                }
            }
            }
        });
        
        if (!match) {
            throw new Error(`No match found between you and ${chatName}`);
        }
        
        return {
            matchId: match.id,
            currentUser: {
            id: currentUser.id,
            name: currentUser.name
            },
            otherUser: {
            id: otherUser.id,
            name: otherUser.name,
            profileImage: otherUser.profileImage
            },
            messages: match.chatMessages
        };
    }
}

export const chatService = new ChatService()