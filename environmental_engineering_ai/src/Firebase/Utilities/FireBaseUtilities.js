import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from "../FirebaseConfig";

// Função para salvar mensagens no Firestore
export const saveMessage = async (userId, message) => {
  try {
    await addDoc(collection(db, 'conversations'), {
      userId,
      message,
      timestamp: new Date(),
    });
    console.log('Message saved successfully');
  } catch (error) {
    console.error('Error saving message: ', error);
  }
};

// Função para buscar mensagens do Firestore
export const fetchMessages = async (userId) => {
  const q = query(collection(db, 'conversations'), where('userId', '==', userId));

  try {
    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => doc.data());
    return messages;
  } catch (error) {
    console.error('Error fetching messages: ', error);
    return [];
  }
};