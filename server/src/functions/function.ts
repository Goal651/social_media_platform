import crypto from 'crypto';

interface KeyPair {
    publicKey: string;
    privateKey: string;
}

const AES_KEY_LENGTH = 32; // Assuming AES-256, which uses a 32-byte key

interface GroupKeys {
    privateKey: string;
    iv: string;
}


const generateKeyPair = async (): Promise<KeyPair> => {
    return new Promise<KeyPair>((resolve, reject) => {
        crypto.generateKeyPair(
            'rsa',
            {
                modulusLength: 2048,
                publicKeyEncoding: { type: 'spki', format: 'pem' },
                privateKeyEncoding: {
                    type: 'pkcs8',
                    format: 'pem',
                    cipher: 'aes-256-cbc',
                    passphrase: process.env.KEY_PASSPHRASE || '', // Ensure passphrase is a string
                },
            },
            (err, publicKey, privateKey) => {
                if (err) return reject(err);
                resolve({ publicKey, privateKey });
            }
        );
    });
};


const generateGroupKeys = (): GroupKeys => {
    try {
        const privateKey= crypto.randomBytes(32).toString('hex');
        const iv = crypto.randomBytes(16).toString('hex');

        return { privateKey, iv };
    } catch (err) {
        throw err;
    }
};

export default {
    generateKeyPair,
    generateGroupKeys
}
