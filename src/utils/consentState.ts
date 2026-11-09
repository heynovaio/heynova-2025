/** localStorage key holding the visitor's cookie choice ("granted"/"denied"). */
export const CONSENT_STORAGE_KEY = "heynova-consent-v1";

/**
 * Runs inline in <head>, before first paint: marks <html> with
 * `consent-decided` when the visitor has already chosen (or on the Slice
 * Machine simulator), so CSS hides the server-rendered cookie banner without
 * a flash. Plain module (not "use client") so the server layout can use it.
 */
export const CONSENT_STATE_SCRIPT = `try{var c=localStorage.getItem("${CONSENT_STORAGE_KEY}");if(c==="granted"||c==="denied"||location.pathname.indexOf("/slice-simulator")===0){document.documentElement.classList.add("consent-decided")}}catch(e){}`;
