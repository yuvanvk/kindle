import { bytesToHex, hexToBytes } from "./helpers"

export async function encryptEnvVars (env_vars: Record<string, string>, masterKeyHex: string) {
    const dataKeyBytes = crypto.getRandomValues(new Uint8Array(32))
    const dataKey = await crypto.subtle.importKey("raw", dataKeyBytes, {name: "AES-GCM"}, false, ["encrypt"])

    const envAsTxt = new TextEncoder().encode(JSON.stringify(env_vars))
    const envIv = crypto.getRandomValues(new Uint8Array(12))
    const lockedEnv = await crypto.subtle.encrypt({ name: "AES-GCM", iv: envIv }, dataKey, envAsTxt)

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


