import { NodeManager } from "@mutinywallet/mutiny-wasm";

export function satsToUsd(amount: number | undefined, price: number, formatted: boolean): string {
    if (typeof amount !== "number" || isNaN(amount)) {
        return ""
    }
    try {
        const btc = NodeManager.convert_sats_to_btc(BigInt(Math.floor(amount)));
        const usd = btc * price;

        if (formatted) {
            return usd.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        } else {
            return usd.toFixed(2);
        }

    } catch (e) {
        console.error(e);
        return ""
    }
}

export function usdToSats(amount: number | undefined, price: number, formatted: boolean): string {
    if (typeof amount !== "number" || isNaN(amount)) {
        return ""
    }
    try {
        const btc = price / amount;
        const sats = NodeManager.convert_btc_to_sats(btc);
        if (formatted) {
            return parseInt(sats.toString()).toLocaleString();
        } else {
            return sats.toString();
        }
    } catch (e) {
        console.error(e);
        return ""
    }
}
