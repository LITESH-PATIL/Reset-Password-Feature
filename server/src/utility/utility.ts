import { Cache } from "../cache/cache";


export class Utility{
    private readonly cache : Cache

    constructor(cache: Cache){
        this.cache = cache
    }

    public async generateToken(userId: string){
        let count = this.cache.freq.get(userId) ?? 0;
        this.cache.freq.set(userId, (count += 1));

        if(++count <= 3){
            const timestamp = Date.now()
            const data = new TextEncoder().encode(userId+timestamp+count);
            const hashBuffer = await crypto.subtle.digest("SHA-256", data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hash = hashArray
                .map((byte) => byte.toString(16).padStart(2, "0"))
                .join("");

            console.log(hash);
            return (1000 + (parseInt(hash.slice(0, 8), 16) % 9000)).toString();
        }
        return null;
    }
}