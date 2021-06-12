/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/. 
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.1.6-SNAPSHOT
 *
 */
import { FluenceClient, PeerIdB58 } from '@fluencelabs/fluence';
import { RequestFlowBuilder } from '@fluencelabs/fluence/dist/api.unstable';
import { RequestFlow } from '@fluencelabs/fluence/dist/internal/RequestFlow';



export async function topologyTest(client: FluenceClient, me: string, myRelay: string, friend: string, friendRelay: string, ttlMsGeneratedArgument?: number): Promise<string> {
    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        request = new RequestFlowBuilder()
            .disableInjections()
            .withTTL(ttlMsGeneratedArgument || 5000)
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
           (seq
            (seq
             (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
             (call %init_peer_id% ("getDataSrv" "me") [] me)
            )
            (call %init_peer_id% ("getDataSrv" "myRelay") [] myRelay)
           )
           (call %init_peer_id% ("getDataSrv" "friend") [] friend)
          )
          (call %init_peer_id% ("getDataSrv" "friendRelay") [] friendRelay)
         )
         (call -relay- ("op" "identity") [])
        )
        (call friendRelay ("op" "identity") [])
       )
       (xor
        (call friend ("testo" "getString") ["friends string via"] str2)
        (seq
         (seq
          (call friendRelay ("op" "identity") [])
          (call -relay- ("op" "identity") [])
         )
         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
        )
       )
      )
      (call friendRelay ("op" "identity") [])
     )
     (call -relay- ("op" "identity") [])
    )
    (call %init_peer_id% ("lp" "print") ["my string in par"])
   )
   (call %init_peer_id% ("lp" "print") [str2])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") ["finish"])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
  )
 )
 (seq
  (call -relay- ("op" "identity") [])
  (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
 )
)

            `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return client.relayPeerId!;
                });
                h.on('getDataSrv', 'me', () => {return me;});
h.on('getDataSrv', 'myRelay', () => {return myRelay;});
h.on('getDataSrv', 'friend', () => {return friend;});
h.on('getDataSrv', 'friendRelay', () => {return friendRelay;});
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
                reject('Request timed out for topologyTest');
            })
            .build();
    });
    await client.initiateFlow(request!);
    return promise;
}
      