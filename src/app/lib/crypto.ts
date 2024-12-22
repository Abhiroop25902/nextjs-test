import {hash, verify} from "argon2";

/**
 * generates hash using argon2
 * @param s
 */
export async function hashArgon2(s: string) {
    return await hash(s);
}

/**
 * verify that argon2Hash of s and given hash matches
 * @param s
 * @param hash
 */
export async function hashMatches(s: string, hash: string) {
    return await verify(hash, s);
}