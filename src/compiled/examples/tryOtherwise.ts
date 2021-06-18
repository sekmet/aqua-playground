/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.6-148
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function tryOtherwiseTest(client: FluenceClient, node_id: string, config?: {ttl?: number}): Promise<string> {
    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withTTL(config?.ttl || 5000)
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
      (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
     )
     (call -relay- ("op" "identity") [])
    )
    (xor
     (xor
      (call node_id ("unex" "getStr") [] $f)
      (seq
       (call node_id ("op" "identity") ["error"] $f)
       (call -relay- ("op" "identity") [])
      )
     )
     (seq
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
      )
      (call -relay- ("op" "identity") [])
     )
    )
   )
   (call -relay- ("op" "identity") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$f.$.[0]!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
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
                h.on('getDataSrv', 'node_id', () => {return node_id;});
                h.onEvent('callbackSrv', 'response', (args) => {
  const [res] = args;
  resolve(res);
});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for tryOtherwiseTest');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      