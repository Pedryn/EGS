// Função para calcular CRC-16
function crc16(str: string): string {
    let crc = 0xFFFF;
    for (let i = 0; i < str.length; i++) {
        crc ^= str.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        }
    }
    return ((crc ^ 0) & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

// Função para gerar a payload Pix
export function gerarPayloadPix(valor: number, chavePix: string, nomeRecebedor: string, cidadeRecebedor: string): string {
    const pad = (str: string, len = 2) => (str.length < len ? '0'.repeat(len - str.length) + str : str);
    const valorStr = valor.toFixed(2).replace('.', ''); // Converte o valor para string sem ponto decimal

    const payload = [
        '000201', // Payload format indicator
        '010212', // Point of initiation method
        `26${pad(`0014br.gov.bcb.pix${pad(chavePix.length.toString())}${chavePix}`)}`, // Merchant account information
        '52040000', // Merchant category code
        '5303986', // Transaction currency (986 = BRL)
        `54${pad(valorStr.length.toString())}${valorStr}`, // Transaction amount
        '5802BR', // Country code
        `59${pad(nomeRecebedor.length.toString())}${nomeRecebedor}`, // Merchant name
        `60${pad(cidadeRecebedor.length.toString())}${cidadeRecebedor}`, // Merchant city
        '62070503***', // Additional data field template
        '6304', // CRC-16 checksum placeholder
    ];

    const payloadString = payload.join('');
    const crc = crc16(payloadString); // Calcula o CRC-16
    return payloadString + crc;
}
