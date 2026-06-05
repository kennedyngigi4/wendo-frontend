import NextAuth from "next-auth"
import Credentials  from "next-auth/providers/credentials";


export const { handlers, signIn, signOut, auth } = NextAuth({

    pages: {
        signIn: "/auth/login",
    },

    providers: [
        Credentials({
            name: "Credentials",
            
            credentials: {
                email: {},
                password: {}
            },

            async authorize(credentials) {
                const response = await fetch(`http://127.0.0.1:8000/v1/account/login/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password
                    }),
                });
                const data = await response.json();

                if(!response.ok) {
                    throw new Error(data?.errors || "Login failed");
                }

                return data.data;
            },
        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {

        async jwt({ token, user }){
            if(user){
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
                token.role = user.role;
                token.accessToken = user.access;
            }

            return token;
        },

        async session({ session, token}) {
            session.user.id = token.id;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.role = token.role;
            session.accessToken = token.accessToken;

            return session;
        }
    }
})