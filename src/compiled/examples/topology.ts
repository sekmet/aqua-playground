/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-SNAPSHOT
 *
 */
import { FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';

// Services

export interface TestoDef {
    getString: (arg0: string, callParams: CallParams<'arg0'>) => string;
}

export function registerTesto(service: TestoDef): void;
export function registerTesto(serviceId: string, service: TestoDef): void;
export function registerTesto(peer: FluencePeer, service: TestoDef): void;
export function registerTesto(peer: FluencePeer, serviceId: string, service: TestoDef): void;
export function registerTesto(...args: any) {
    let peer: FluencePeer;
    let serviceId: any;
    let service: any;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
    } else {
        peer = FluencePeer.default;
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    } else {
        serviceId = 'testo';
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'getString') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.getString(req.args[0], callParams);
        }

        next();
    });
}

export interface LocalPrintDef {
    print: (arg0: string, callParams: CallParams<'arg0'>) => void;
}

export function registerLocalPrint(service: LocalPrintDef): void;
export function registerLocalPrint(serviceId: string, service: LocalPrintDef): void;
export function registerLocalPrint(peer: FluencePeer, service: LocalPrintDef): void;
export function registerLocalPrint(peer: FluencePeer, serviceId: string, service: LocalPrintDef): void;
export function registerLocalPrint(...args: any) {
    let peer: FluencePeer;
    let serviceId: any;
    let service: any;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
    } else {
        peer = FluencePeer.default;
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    } else {
        serviceId = 'lp';
    }

    if (!(args[0] instanceof FluencePeer) && typeof args[0] === 'object') {
        service = args[0];
    } else if (typeof args[1] === 'object') {
        service = args[1];
    } else {
        service = args[2];
    }

    peer.internals.callServiceHandler.use((req, resp, next) => {
        if (req.serviceId !== serviceId) {
            next();
            return;
        }

        if (req.fnName === 'print') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            service.print(req.args[0], callParams);
            resp.result = {};
        }

        next();
    });
}

// Functions

export function topologyTest(
    me: string,
    myRelay: string,
    friend: string,
    friendRelay: string,
    config?: { ttl?: number },
): Promise<string>;
export function topologyTest(
    peer: FluencePeer,
    me: string,
    myRelay: string,
    friend: string,
    friendRelay: string,
    config?: { ttl?: number },
): Promise<string>;
export function topologyTest(...args: any) {
    let peer: FluencePeer;
    let me: any;
    let myRelay: any;
    let friend: any;
    let friendRelay: any;
    let config: any;
    if (args[0] instanceof FluencePeer) {
        peer = args[0];
        me = args[1];
        myRelay = args[2];
        friend = args[3];
        friendRelay = args[4];
        config = args[5];
    } else {
        peer = FluencePeer.default;
        me = args[0];
        myRelay = args[1];
        friend = args[2];
        friendRelay = args[3];
        config = args[4];
    }

    let request: RequestFlow;
    const promise = new Promise<string>((resolve, reject) => {
        const r = new RequestFlowBuilder()
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
        (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
        (call %init_peer_id% ("getDataSrv" "me") [] me)
       )
       (call %init_peer_id% ("getDataSrv" "myRelay") [] myRelay)
      )
      (call %init_peer_id% ("getDataSrv" "friend") [] friend)
     )
     (call %init_peer_id% ("getDataSrv" "friendRelay") [] friendRelay)
    )
    (par
     (seq
      (seq
       (seq
        (seq
         (seq
          (call -relay- ("op" "noop") [])
          (call friendRelay ("op" "noop") [])
         )
         (xor
          (call friend ("testo" "getString") ["friends string via"] str2)
          (seq
           (seq
            (call friendRelay ("op" "noop") [])
            (call -relay- ("op" "noop") [])
           )
           (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
          )
         )
        )
        (call friendRelay ("op" "noop") [])
       )
       (call -relay- ("op" "noop") [])
      )
      (call %init_peer_id% ("op" "noop") [])
     )
     (call %init_peer_id% ("lp" "print") ["my string in par"])
    )
   )
   (call %init_peer_id% ("lp" "print") [str2])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") ["finish"])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.connectionInfo.connectedRelay;
                });
                h.on('getDataSrv', 'me', () => {
                    return me;
                });
                h.on('getDataSrv', 'myRelay', () => {
                    return myRelay;
                });
                h.on('getDataSrv', 'friend', () => {
                    return friend;
                });
                h.on('getDataSrv', 'friendRelay', () => {
                    return friendRelay;
                });
                h.onEvent('callbackSrv', 'response', (args) => {
                    const [res] = args;
                    resolve(res);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for topologyTest');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
