import ipRegex from "ip-regex";

export class CancelError extends Error {
  constructor() {
    super("Request was cancelled");
    this.name = "CancelError";
  }
  get isCanceled() {
    return true;
  }
}
export class IpNotFoundError extends Error {
  constructor(options) {
    super("Could not get the public IP address", options);
    this.name = "IpNotFoundError";
  }
}

const defaults = {
  timeout: 5000,
};

const urls = {
  v4: ["https://ipv4.icanhazip.com/", "https://api.ipify.org/"],
  v6: ["https://ipv6.icanhazip.com/", "https://api6.ipify.org/"],
};

const sendXhr = (url, options, version) => {
  function isIP(string, version = "v4") {
    if (version === "v4") {
      return ipRegex.v4({ exact: true }).test(string);
    }
    if (version === "v6") {
      return ipRegex.v6({ exact: true }).test(string);
    }
    return ipRegex({ exact: true }).test(string);
  }

  const xhr = new XMLHttpRequest();
  let _reject;
  const promise = new Promise((resolve, reject) => {
    _reject = reject;
    xhr.addEventListener("error", reject, { once: true });
    xhr.addEventListener("timeout", reject, { once: true });
    xhr.addEventListener(
      "load",
      () => {
        const ip = xhr.responseText.trim();
        if (!ip || !isIP(ip, version)) {
          reject();
          return;
        }
        resolve(ip);
      },
      { once: true }
    );
    xhr.open("GET", url);
    xhr.timeout = options.timeout;
    xhr.send();
  });
  promise.cancel = () => {
    xhr.abort();
    _reject(new CancelError());
  };
  return promise;
};
const queryHttps = (version, options) => {
  let request;
  const promise = (async function () {
    const urls_ = [...urls[version], ...(options.fallbackUrls ?? [])];
    let lastError;
    for (const url of urls_) {
      try {
        request = sendXhr(url, options, version);
        // eslint-disable-next-line no-await-in-loop
        const ip = await request;
        return ip;
      } catch (error) {
        lastError = error;
        if (error instanceof CancelError) {
          throw error;
        }
      }
    }
    throw new IpNotFoundError({ cause: lastError });
  })();
  promise.cancel = () => {
    request.cancel();
  };
  return promise;
};

const publicIp = {};
publicIp.v4 = (options) => queryHttps("v4", { ...defaults, ...options });
publicIp.v6 = (options) => queryHttps("v6", { ...defaults, ...options });
export default publicIp;
