/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.4-136
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function print(client: FluenceClient, str: string): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("getDataSrv" "str") [] str)
  )
  (call %init_peer_id% ("println-service-id" "print") [str])
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'str', () => {return str;});
                
                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for print');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      


export async function iterateAndPrint(client: FluenceClient, strings: string[]): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("getDataSrv" "strings") [] strings)
  )
  (fold strings s
   (seq
    (call %init_peer_id% ("println-service-id" "print") [s])
    (next s)
   )
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'strings', () => {return strings;});
                
                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for iterateAndPrint');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      


export async function iterateAndPrintParallel(client: FluenceClient, nodes: string[], c: (arg0: {external_addresses:string[]}) => void): Promise<void> {
    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
(xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("getDataSrv" "nodes") [] nodes)
  )
  (fold nodes s
   (par
    (seq
     (seq
      (seq
       (call -relay- ("op" "identity") [])
       (xor
        (seq
         (seq
          (call s ("peer" "identify") [] ads)
          (call -relay- ("op" "identity") [])
         )
         (xor
          (call %init_peer_id% ("callbackSrv" "c") [ads])
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
     (call %init_peer_id% ("op" "identity") [])
    )
    (next s)
   )
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
                h.on('getDataSrv', 'nodes', () => {return nodes;});
h.on('callbackSrv', 'c', (args) => {c(args[0]); return {};});
                
                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    // assuming error is the single argument
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for iterateAndPrintParallel');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
      