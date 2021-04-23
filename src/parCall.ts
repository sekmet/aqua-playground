import {FluenceClient, registerServiceFunction} from "@fluencelabs/fluence";
import {parFunc} from "./compiled/par";

export async function parCall(client: FluenceClient) {
    registerServiceFunction(client, "parservice-id", "call", (args: any[], _) => {
        console.log("hello from parservice-id")
        return `hello`
    })

    await parFunc(client, client.relayPeerId!, (c) => {
        console.log("parFunc. external addresses par: " + c.external_addresses)
    })
}
