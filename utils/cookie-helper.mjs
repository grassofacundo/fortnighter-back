export function getCookieProperties(maxAge) {
    return {
        maxAge: maxAge ?? 60000 * 60,
        sameSite: "None",
        Secure: true,
        //domain: process.env.FRONT_URL,
    };
}
