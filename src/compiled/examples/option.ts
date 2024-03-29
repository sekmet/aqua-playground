/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.3.0-SNAPSHOT
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    ResultCodes,
    RequestFlow,
    RequestFlowBuilder,
    CallParams,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v1';

// Services

export interface SomeSDef {
    getStr: (arg0: string | null, callParams: CallParams<'arg0'>) => string | null;
    getStr1: (callParams: CallParams<null>) => string | null;
    getStr2: (arg0: string, callParams: CallParams<'arg0'>) => string;
}

export function registerSomeS(service: SomeSDef): void;
export function registerSomeS(serviceId: string, service: SomeSDef): void;
export function registerSomeS(peer: FluencePeer, service: SomeSDef): void;
export function registerSomeS(peer: FluencePeer, serviceId: string, service: SomeSDef): void;
export function registerSomeS(...args: any) {
    let peer: FluencePeer;
    let serviceId: any;
    let service: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
    } else {
        peer = Fluence.getPeer();
    }

    if (typeof args[0] === 'string') {
        serviceId = args[0];
    } else if (typeof args[1] === 'string') {
        serviceId = args[1];
    } else {
        serviceId = 'test2';
    }

    // Figuring out which overload is the service.
    // If the first argument is not Fluence Peer and it is an object, then it can only be the service def
    // If the first argument is peer, we are checking further. The second argument might either be
    // an object, that it must be the service object
    // or a string, which is the service id. In that case the service is the third argument
    if (!FluencePeer.isInstance(args[0]) && typeof args[0] === 'object') {
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

        if (req.fnName === 'getStr') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;

            var respResult = service.getStr(req.args[0].length === 0 ? null : req.args[0][0], callParams);
            resp.result = respResult === null ? [] : [respResult];
        }

        if (req.fnName === 'getStr1') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;

            var respResult = service.getStr1(callParams);
            resp.result = respResult === null ? [] : [respResult];
        }

        if (req.fnName === 'getStr2') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    arg0: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.getStr2(req.args[0], callParams);
        }

        next();
    });
}

// Functions

export function useOptional(opt: string | null, config?: { ttl?: number }): Promise<string>;
export function useOptional(peer: FluencePeer, opt: string | null, config?: { ttl?: number }): Promise<string>;
export function useOptional(...args: any) {
    let peer: FluencePeer;
    let opt: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        opt = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        opt = args[0];
        config = args[1];
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
     (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
     (call %init_peer_id% ("getDataSrv" "opt") [] opt)
    )
    (call %init_peer_id% ("test2" "getStr") [opt] res)
   )
   (fold opt i
    (seq
     (call %init_peer_id% ("test2" "getStr2") [i])
     (next i)
    )
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res.$.[0]!])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'opt', () => {
                    return opt === null ? [] : [opt];
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
                reject('Request timed out for useOptional');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function returnOptional(config?: { ttl?: number }): Promise<string | null>;
export function returnOptional(peer: FluencePeer, config?: { ttl?: number }): Promise<string | null>;
export function returnOptional(...args: any) {
    let peer: FluencePeer;

    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        config = args[1];
    } else {
        peer = Fluence.getPeer();
        config = args[0];
    }

    let request: RequestFlow;
    const promise = new Promise<string | null>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("test2" "getStr1") [] res)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [res])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });

                h.onEvent('callbackSrv', 'response', (args) => {
                    let [opt] = args;
                    if (Array.isArray(opt)) {
                        if (opt.length === 0) {
                            resolve(null);
                        }
                        opt = opt[0];
                    }
                    return resolve(opt);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for returnOptional');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function returnNone(config?: { ttl?: number }): Promise<string | null>;
export function returnNone(peer: FluencePeer, config?: { ttl?: number }): Promise<string | null>;
export function returnNone(...args: any) {
    let peer: FluencePeer;

    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        config = args[1];
    } else {
        peer = Fluence.getPeer();
        config = args[0];
    }

    let request: RequestFlow;
    const promise = new Promise<string | null>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (seq
   (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
   (call %init_peer_id% ("op" "noop") [])
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") [$result])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });

                h.onEvent('callbackSrv', 'response', (args) => {
                    let [opt] = args;
                    if (Array.isArray(opt)) {
                        if (opt.length === 0) {
                            resolve(null);
                        }
                        opt = opt[0];
                    }
                    return resolve(opt);
                });

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for returnNone');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}
