type CaptureSameReqFn = (payload: {
    req_id: string;
}) => boolean;
/**
 * Returns a function which can be used in `request` function `capture` property to capture
 * the event with the same request identifier.
 * @param reqId - request identifier.
 */
export declare function captureSameReq(reqId: string): CaptureSameReqFn;
export {};
