import dotenv from 'dotenv';
dotenv.config();
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/userRepository';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const userRepository = new UserRepository();

export class AuthService {
  async googleSignIn(token: string) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email || !payload.sub) {
      throw new Error('INVALID_GOOGLE_TOKEN');
    }

    const { sub: googleId, email, name, picture: avatar } = payload;

    // 2. Fetch or create user via the Repository
    let user = await userRepository.findByGoogleId(googleId);

    if (!user) {
      // Fixed the syntax error and removed unreachable '??' operators
      user = await userRepository.createUser({
        googleId,
        email,
        name,
        avatar,
      });
    }

    // 3. Generate App Token
    const appToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '7d' },
    );

    return {
      token: appToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }
}
