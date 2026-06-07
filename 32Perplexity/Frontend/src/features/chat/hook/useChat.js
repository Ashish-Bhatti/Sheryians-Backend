import { useDispatch } from 'react-redux';
import { initializeSocketConnection } from '../service/chat.socket';
import { addMessages, addNewMessage, createNewChat, setChats, setCurrentChatId, setLoading } from '../chat.slice';
import { getChats, getMessages, sendMessage } from '../service/api.chat';

export const useChat = () => {
    const dispatch = useDispatch();

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true));
        const data = await sendMessage({ message, chatId });
        const { chat, aiMessage } = data;
        if (!chatId) {
            dispatch(
                createNewChat({
                    chatId: chat._id,
                    title: chat.title,
                })
            );
        }

        dispatch(
            addNewMessage({
                chatId: chatId || chat._id,
                content: message,
                role: 'user',
            })
        );

        dispatch(
            addNewMessage({
                chatId: chatId || chat._id,
                content: aiMessage.content,
                role: aiMessage.role,
            })
        );

        dispatch(setCurrentChatId(chatId || chat._id));
        dispatch(setLoading(false));
    }

    async function handleGetChats() {
        dispatch(setLoading(true));
        const data = await getChats();
        const { chats } = data;
        dispatch(
            setChats(
                chats.reduce((acc, chat) => {
                    acc[chat._id] = {
                        id: chat._id,
                        title: chat.title,
                        messages: [],
                        lastUpdated: chat.updateAt,
                    };

                    return acc;
                }, {})
            )
        );
        dispatch(setLoading(false));
    }
    async function handleOpenChat(chatId, chats) {
        console.log(chats[chatId]?.messages.length);

        if (chats[chatId]?.messages?.length === 0) {
            const data = await getMessages(chatId);
            const { messages } = data;
            console.log(data);

            const formattedMessages = messages.map((msg) => ({
                content: msg.content,
                role: msg.role,
            }));

            dispatch(
                addMessages({
                    chatId,
                    messages: formattedMessages,
                })
            );
        }
        dispatch(setCurrentChatId(chatId));
    }

    function handleNewChat() {
        dispatch(setCurrentChatId(null));
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        handleGetChats,
        handleOpenChat,
        handleNewChat,
    };
};
