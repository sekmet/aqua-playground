import {FluenceClient} from "@fluencelabs/fluence";
import {doStuff} from "./compiled/complex";

export async function complexCall(client: FluenceClient) {
    return await doStuff(client, client.relayPeerId!)
}