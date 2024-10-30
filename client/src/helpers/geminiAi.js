import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyCur-0dPhK3dIPq9GsgX0Dy_dPHF3N1cUU');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

export default model;
