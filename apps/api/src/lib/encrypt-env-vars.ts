import { bytesToHex, hexToBytes } from "./helpers"

export async function encryptEnvVars (env_vars: Record<string, string>, masterKeyHex: string) {
    /* 
     * Generating dataKey's bytes from which the DEK key is generated
    **/
    const dataKeyBytes = crypto.getRandomValues(new Uint8Array(32))

    // DEK key generated from dataKeyBytes
    const dataKey = await crypto.subtle.importKey("raw", dataKeyBytes, { name: "AES-GCM" }, false, ["encrypt"])

    /* 
     * Encrypting the env vars using DEK, in this process convert the env vars provided into JSON.
    **/
    const envAsTxt = new TextEncoder().encode(JSON.stringify(env_vars))
    const envIv = crypto.getRandomValues(new Uint8Array(12))
    const lockedEnv = await crypto.subtle.encrypt({ name: "AES-GCM", iv: envIv }, dataKey, envAsTxt)

    /* 
     * Encrypting the DEK with KEK, known as Envelope encryption.
    **/
    const masterKey = await crypto.subtle.importKey("raw", hexToBytes(masterKeyHex) as BufferSource, { name: "AES-GCM" }, false, ["encrypt"]);
    const keyIv = crypto.getRandomValues(new Uint8Array(12));
    const lockedDataKey = await crypto.subtle.encrypt({ name: "AES-GCM", iv: keyIv }, masterKey, dataKeyBytes);

    return {
        lockedEnv: bytesToHex(new Uint8Array(lockedEnv)),
        envIv: bytesToHex(envIv),
        lockedDataKey: bytesToHex(new Uint8Array(lockedDataKey)),
        keyIv: bytesToHex(keyIv)
    }
}   


