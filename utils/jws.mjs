import { setError } from "./error-setter.mjs";

const secret = process.env.JSW_SECRET;

// sign jwt
export function signJWT(payload, expiresIn) {
    if (!payload.email || !payload.userId)
        setError("Payload has invalid information", 500);

    return jwt.sign(payload, secret, { algorithm: "RS256", expiresIn });
}

// verify jwt
export function verifyJWT(token) {
    try {
        const decoded = jwt.verify(token, secret);
        return { payload: decoded, expired: false };
    } catch (error) {
        return {
            payload: null,
            expired: error.message.includes("jwt expired"),
        };
    }
}
