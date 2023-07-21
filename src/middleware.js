export { default } from "next-auth/middleware"

export const config = { matcher: ["/evaluator/:path*", "/profile"] }