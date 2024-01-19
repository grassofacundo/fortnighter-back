import jws from "jsonwebtoken";
import { setError } from "./error-setter.mjs";

// sign jwt
export function signJWT(payload, expiresIn) {
    if (!payload) setError("Payload has invalid information", 500);

    return jws.sign(payload, process.env.JSW_SECRET, { expiresIn });
}

// verify jwt
export function verifyJWT(token) {
    try {
        const decoded = jws.verify(token, process.env.JSW_SECRET);
        return { payload: decoded, expired: false };
    } catch (error) {
        return {
            payload: null,
            expired: error.message.includes("jwt expired"),
        };
    }
}
