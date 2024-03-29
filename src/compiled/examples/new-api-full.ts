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

export interface ServiceWithDefaultIdDef {
    hello: (s: string, callParams: CallParams<'s'>) => void;
}

export function registerServiceWithDefaultId(service: ServiceWithDefaultIdDef): void;
export function registerServiceWithDefaultId(serviceId: string, service: ServiceWithDefaultIdDef): void;
export function registerServiceWithDefaultId(peer: FluencePeer, service: ServiceWithDefaultIdDef): void;
export function registerServiceWithDefaultId(
    peer: FluencePeer,
    serviceId: string,
    service: ServiceWithDefaultIdDef,
): void;
export function registerServiceWithDefaultId(...args: any) {
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
        serviceId = 'defaultId';
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

        if (req.fnName === 'hello') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            service.hello(req.args[0], callParams);
            resp.result = {};
        }

        next();
    });
}

export interface ServiceWithOUTDefaultIdDef {
    hello: (s: string, callParams: CallParams<'s'>) => void;
}

export function registerServiceWithOUTDefaultId(serviceId: string, service: ServiceWithOUTDefaultIdDef): void;
export function registerServiceWithOUTDefaultId(
    peer: FluencePeer,
    serviceId: string,
    service: ServiceWithOUTDefaultIdDef,
): void;
export function registerServiceWithOUTDefaultId(...args: any) {
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

        if (req.fnName === 'hello') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            service.hello(req.args[0], callParams);
            resp.result = {};
        }

        next();
    });
}

export interface MoreMembersDef {
    member1: (callParams: CallParams<null>) => void;
    member2: (s1: string, callParams: CallParams<'s1'>) => void;
    member3: (s1: string, s2: string, callParams: CallParams<'s1' | 's2'>) => void;
    member4: (s1: string, s2: string, i: number, callParams: CallParams<'s1' | 's2' | 'i'>) => number;
    member5: (s1: string, s2: string, i: number, callParams: CallParams<'s1' | 's2' | 'i'>) => number;
}

export function registerMoreMembers(serviceId: string, service: MoreMembersDef): void;
export function registerMoreMembers(peer: FluencePeer, serviceId: string, service: MoreMembersDef): void;
export function registerMoreMembers(...args: any) {
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

        if (req.fnName === 'member1') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {},
            };
            resp.retCode = ResultCodes.success;
            service.member1(callParams);
            resp.result = {};
        }

        if (req.fnName === 'member2') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s1: req.tetraplets[0],
                },
            };
            resp.retCode = ResultCodes.success;
            service.member2(req.args[0], callParams);
            resp.result = {};
        }

        if (req.fnName === 'member3') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s1: req.tetraplets[0],
                    s2: req.tetraplets[1],
                },
            };
            resp.retCode = ResultCodes.success;
            service.member3(req.args[0], req.args[1], callParams);
            resp.result = {};
        }

        if (req.fnName === 'member4') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s1: req.tetraplets[0],
                    s2: req.tetraplets[1],
                    i: req.tetraplets[2],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.member4(req.args[0], req.args[1], req.args[2], callParams);
        }

        if (req.fnName === 'member5') {
            const callParams = {
                ...req.particleContext,
                tetraplets: {
                    s1: req.tetraplets[0],
                    s2: req.tetraplets[1],
                    i: req.tetraplets[2],
                },
            };
            resp.retCode = ResultCodes.success;
            resp.result = service.member5(req.args[0], req.args[1], req.args[2], callParams);
        }

        next();
    });
}

// Functions

export function f1(
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => void,
    config?: { ttl?: number },
): Promise<void>;
export function f1(
    peer: FluencePeer,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => void,
    config?: { ttl?: number },
): Promise<void>;
export function f1(...args: any) {
    let peer: FluencePeer;
    let callback: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        callback = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        callback = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
  (xor
   (call %init_peer_id% ("callbackSrv" "callback") ["hello, world" 42])
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

                h.use((req, resp, next) => {
                    if (req.serviceId === 'callbackSrv' && req.fnName === 'callback') {
                        const callParams = {
                            ...req.particleContext,
                            tetraplets: {
                                arg0: req.tetraplets[0],
                                arg1: req.tetraplets[1],
                            },
                        };
                        resp.retCode = ResultCodes.success;
                        callback(req.args[0], req.args[1], callParams);
                        resp.result = {};
                    }
                    next();
                });

                h.onEvent('callbackSrv', 'response', (args) => {});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for f1');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}

export function f2(
    num: number,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => void,
    config?: { ttl?: number },
): Promise<void>;
export function f2(
    peer: FluencePeer,
    num: number,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => void,
    config?: { ttl?: number },
): Promise<void>;
export function f2(...args: any) {
    let peer: FluencePeer;
    let num: any;
    let callback: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        num = args[1];
        callback = args[2];
        config = args[3];
    } else {
        peer = Fluence.getPeer();
        num = args[0];
        callback = args[1];
        config = args[2];
    }

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
   (call %init_peer_id% ("getDataSrv" "num") [] num)
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "callback") ["hello, world" 42])
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
                h.on('getDataSrv', 'num', () => {
                    return num;
                });

                h.use((req, resp, next) => {
                    if (req.serviceId === 'callbackSrv' && req.fnName === 'callback') {
                        const callParams = {
                            ...req.particleContext,
                            tetraplets: {
                                arg0: req.tetraplets[0],
                                arg1: req.tetraplets[1],
                            },
                        };
                        resp.retCode = ResultCodes.success;
                        callback(req.args[0], req.args[1], callParams);
                        resp.result = {};
                    }
                    next();
                });

                h.onEvent('callbackSrv', 'response', (args) => {});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for f2');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}

export function f3(
    num: number,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => void,
    config?: { ttl?: number },
): Promise<string>;
export function f3(
    peer: FluencePeer,
    num: number,
    callback: (arg0: string, arg1: number, callParams: CallParams<'arg0' | 'arg1'>) => void,
    config?: { ttl?: number },
): Promise<string>;
export function f3(...args: any) {
    let peer: FluencePeer;
    let num: any;
    let callback: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        num = args[1];
        callback = args[2];
        config = args[3];
    } else {
        peer = Fluence.getPeer();
        num = args[0];
        callback = args[1];
        config = args[2];
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
    (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
    (call %init_peer_id% ("getDataSrv" "num") [] num)
   )
   (xor
    (call %init_peer_id% ("callbackSrv" "callback") ["hello, world" 42])
    (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
   )
  )
  (xor
   (call %init_peer_id% ("callbackSrv" "response") ["hello world"])
   (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
  )
 )
 (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
)

                 `,
            )
            .configHandler((h) => {
                h.on('getDataSrv', '-relay-', () => {
                    return peer.getStatus().relayPeerId;
                });
                h.on('getDataSrv', 'num', () => {
                    return num;
                });

                h.use((req, resp, next) => {
                    if (req.serviceId === 'callbackSrv' && req.fnName === 'callback') {
                        const callParams = {
                            ...req.particleContext,
                            tetraplets: {
                                arg0: req.tetraplets[0],
                                arg1: req.tetraplets[1],
                            },
                        };
                        resp.retCode = ResultCodes.success;
                        callback(req.args[0], req.args[1], callParams);
                        resp.result = {};
                    }
                    next();
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
                reject('Request timed out for f3');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return promise;
}

export function callBackZeroArgs(
    callback: (callParams: CallParams<null>) => void,
    config?: { ttl?: number },
): Promise<void>;
export function callBackZeroArgs(
    peer: FluencePeer,
    callback: (callParams: CallParams<null>) => void,
    config?: { ttl?: number },
): Promise<void>;
export function callBackZeroArgs(...args: any) {
    let peer: FluencePeer;
    let callback: any;
    let config: any;
    if (FluencePeer.isInstance(args[0])) {
        peer = args[0];
        callback = args[1];
        config = args[2];
    } else {
        peer = Fluence.getPeer();
        callback = args[0];
        config = args[1];
    }

    let request: RequestFlow;
    const promise = new Promise<void>((resolve, reject) => {
        const r = new RequestFlowBuilder()
            .disableInjections()
            .withRawScript(
                `
     (xor
 (seq
  (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
  (xor
   (call %init_peer_id% ("callbackSrv" "callback") [])
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

                h.use((req, resp, next) => {
                    if (req.serviceId === 'callbackSrv' && req.fnName === 'callback') {
                        const callParams = {
                            ...req.particleContext,
                            tetraplets: {},
                        };
                        resp.retCode = ResultCodes.success;
                        callback(callParams);
                        resp.result = {};
                    }
                    next();
                });

                h.onEvent('callbackSrv', 'response', (args) => {});

                h.onEvent('errorHandlingSrv', 'error', (args) => {
                    const [err] = args;
                    reject(err);
                });
            })
            .handleScriptError(reject)
            .handleTimeout(() => {
                reject('Request timed out for callBackZeroArgs');
            });
        if (config && config.ttl) {
            r.withTTL(config.ttl);
        }
        request = r.build();
    });
    peer.internals.initiateFlow(request!);
    return Promise.race([promise, Promise.resolve()]);
}
