import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';
import axios from 'axios';

export const Options = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text", placeholder: "E-Mail" },
                password: {  label: "password", type: "Password" }
            },

            async authorize(credentials, req) {
                try {
                    const authResponse = await axios.post(`${process.env.STRAPI_URL}/api/auth/local`, {
                      identifier: credentials.email,
                      password: credentials.password
                    }).catch(error => {return error.response});

                    console.log(authResponse.data)

                    const jwt = authResponse.data.jwt;
                    const user = authResponse.data.user;

                    const userResponse = await axios.get(`${process.env.STRAPI_URL}/api/users/me?populate=deep`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `bearer ${jwt}`
                        }
                    });

                    user.image = `${process.env.STRAPI_URL}${userResponse.data.avatar.url}` || '' ;
            
                    if (!user) return null;
                    return user;
                } catch (error) {
                    // Handle any errors that might occur during the requests
                    return null;
                }
            }
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID_TEST,
            clientSecret: process.env.FACEBOOK_SECRET_KEY_TEST
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
    ],
    pages: {
        signIn: '/signIn',
        signUp: '/signUp',
    },
    callbacks: {
        async jwt({ token, account }) {
          if(account?.provider === 'facebook'){
            token.facebookId = account.providerAccountId
            token.provider = account.provider
          }
          if(account?.provider === 'google'){
            token.googleId = account.providerAccountId
            token.provider = account.provider
          }
          if(account?.provider === 'local'){
            token.provider = account.provider
          }
          return token
        },
        async session({ session, token }) {
          if(session.provider === 'facebook'){
            session.facebookId = token.facebookId
          }
          if(session.provider === 'google'){
            session.googleId = token.googleId
          }
          if(token.provider === 'local'){
            session.provider = token.provider
          }
          return session
        },
    }
}

const handler = NextAuth(Options)

export { handler as GET, handler as POST }