/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.2-112
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function setKey(client: FluenceClient, node_id: string, key: string, value: string, relay_id: string, ack: (arg0: string, arg1: string) => void): Promise<string[]> {
    let request: RequestFlow;
    const promise = new Promise<string[]>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
          (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
         )
         (call %init_peer_id% ("getDataSrv" "key") [] key)
        )
        (call %init_peer_id% ("getDataSrv" "value") [] value)
       )
       (call %init_peer_id% ("getDataSrv" "relay_id") [] relay_id)
      )
      (call -relay- ("op" "identity") [])
     )
     (xor
      (seq
       (seq
        (seq
         (seq
          (seq
           (call node_id ("op" "string_to_b58") [key] k)
           (call node_id ("kad" "neighborhood") [k false] nodes)
          )
          (call node_id ("peer" "timestamp_sec") [] tt)
         )
         (call node_id ("aqua-dht" "register_key") [key tt])
        )
        (call -relay- ("op" "identity") [])
       )
       (xor
        (call %init_peer_id% ("callbackSrv" "ack") ["node end" node_id])
        (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
       )
      )
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
      )
     )
    )
    (call -relay- ("op" "identity") [])
   )
   (fold nodes n
    (par
     (seq
      (seq
       (seq
        (call -relay- ("op" "identity") [])
        (xor
         (seq
          (seq
           (seq
            (seq
             (seq
              (seq
               (seq
                (call -relay- ("op" "identity") [])
                (xor
                 (call %init_peer_id% ("callbackSrv" "ack") ["begin" n])
                 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                )
               )
               (call -relay- ("op" "identity") [])
              )
              (call n ("peer" "timestamp_sec") [] t)
             )
             (call n ("aqua-dht" "register_key") [key t])
            )
            (call n ("aqua-dht" "put_value_relay") [key value t relay_id])
           )
           (call -relay- ("op" "identity") [])
          )
          (xor
           (call %init_peer_id% ("callbackSrv" "ack") ["end" n])
           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
          )
         )
         (null)
        )
       )
       (call -relay- ("op" "identity") [])
      )
      (call %init_peer_id% ("op" "identity") [])
     )
     (next n)
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [nodes])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
  )
 )
 (seq
  (call -relay- ("op" "identity") [])
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 6])
 )
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'key', () => {return key;});
h.on('getDataSrv', 'value', () => {return value;});
h.on('getDataSrv', 'relay_id', () => {return relay_id;});
h.on('callbackSrv', 'ack', (args) => {ack(args[0], args[1]); return {};});
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
                reject('Request timed out for setKey');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      


export async function getValues(client: FluenceClient, node_id: string, key: string, ack: (arg0: string, arg1: {error:string;result:{peer_id:string;relay_id:string[];service_id:string[];timestamp_created:number;value:string}[];success:boolean}[]) => void): Promise<{peer_id:string;relay_id:string[];service_id:string[];timestamp_created:number;value:string}[]> {
    let request: RequestFlow;
    const promise = new Promise<{peer_id:string;relay_id:string[];service_id:string[];timestamp_created:number;value:string}[]>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (seq
    (seq
     (seq
      (seq
       (seq
        (seq
         (seq
          (seq
           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
           (call %init_peer_id% ("getDataSrv" "node_id") [] node_id)
          )
          (call %init_peer_id% ("getDataSrv" "key") [] key)
         )
         (call -relay- ("op" "identity") [])
        )
        (xor
         (seq
          (call node_id ("op" "string_to_b58") [key] k)
          (call node_id ("kad" "neighborhood") [k false] nodes)
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
      (fold nodes n
       (seq
        (seq
         (seq
          (call -relay- ("op" "identity") [])
          (xor
           (seq
            (call n ("peer" "timestamp_sec") [] t)
            (call n ("aqua-dht" "get_values") [key t] $res)
           )
           (null)
          )
         )
         (call -relay- ("op" "identity") [])
        )
        (next n)
       )
      )
     )
     (call -relay- ("op" "identity") [])
    )
    (xor
     (seq
      (seq
       (seq
        (call -relay- ("op" "identity") [])
        (xor
         (call %init_peer_id% ("callbackSrv" "ack") ["values" $res])
         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
        )
       )
       (call -relay- ("op" "identity") [])
      )
      (call node_id ("aqua-dht" "merge_hack_get_values") [$res] v)
     )
     (seq
      (seq
       (call -relay- ("op" "identity") [])
       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
      )
      (call -relay- ("op" "identity") [])
     )
    )
   )
   (call -relay- ("op" "identity") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [v.$.result!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 4])
  )
 )
 (seq
  (call -relay- ("op" "identity") [])
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 5])
 )
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'node_id', () => {return node_id;});
h.on('getDataSrv', 'key', () => {return key;});
h.on('callbackSrv', 'ack', (args) => {ack(args[0], args[1]); return {};});
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
                reject('Request timed out for getValues');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      