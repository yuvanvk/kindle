export function normalizePrivateKey(privateKey: string): string {
    let key = privateKey.trim();

    if (key.includes("\\n")) {
        key = key.replace(/\\n/g, "\n");
    }

    if (!key.includes("\n") && key.includes("'")) {
        key = key.replace(/'/g, "\n");
    }

    if (!key.includes("\n") && key.includes("-----BEGIN")) {
        key = key
            .replace(/(-----BEGIN [A-Z ]+-----)/, "$1\n")
            .replace(/(-----END [A-Z ]+-----)/, "\n$1");
    }

    return key;
}
