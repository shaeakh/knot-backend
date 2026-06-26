import EnvConstant from './constants/envConstants';
import express, { Request, Response } from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import cookieParser from 'cookie-parser';
import errorHandler from '@/middlewares/errorHandler';
import accessControllRoutes from '@/routes/accessControllRoutes';
import tshirtRoutes from '@/routes/tshirtRoutes';

const app = express();
const PORT = EnvConstant.PORT;

app.use(
  cors({
    origin: EnvConstant.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'welcome to Knot' });
});

app.use('/api/auth', authRoutes);
app.use('/api/access', accessControllRoutes);
app.use('/api/tshirts', tshirtRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
