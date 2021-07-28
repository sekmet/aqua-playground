/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.10-SNAPSHOT
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function parFunc(client: FluenceClient, node: string, c: (arg0: {external_addresses:string[]}) => void, config?: {ttl?: number}): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("getDataSrv" "node") [] node)
  )
  (par
   (par
    (call %init_peer_id% ("parservice-id" "call") [] y)
    (seq
     (call -relay- ("op" "noop") [])
     (xor
      (seq
       (seq
        (call node ("peer" "identify") [] t)
        (call -relay- ("op" "noop") [])
       )
       (xor
        (call %init_peer_id% ("callbackSrv" "c") [t])
        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
       )
      )
      (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
     )
    )
   )
   (call %init_peer_id% ("parservice-id" "call") [] x)
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'node', () => {return node;});
h.on('callbackSrv', 'c', (args) => {c(args[0]); return {};});
                
                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for parFunc');
            })
        if(config && config.ttl) {
            r.withTTL(config.ttl)
        }
        request = r.build();
    });
    await client.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      